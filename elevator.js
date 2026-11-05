// elevator sim: look/scan scheduler with three animated cars
// click a floor to set an origin, then click another to send a rider

// config
const FLOORS = 10;
const CARS = 3;
const CAPACITY = 8;          // riders per car
const MOVE_MS = 600;         // one floor per step
const DOOR_MS = 1000;        // doors open at every stop

// helpers
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sameDir = (passenger, dir) => Math.sign(passenger.dest - passenger.origin) === dir;

class Passenger {
    constructor(origin, dest) {
        this.origin = origin;
        this.dest = dest;
        this.state = "waiting";  // waiting, aboard, done
    }
}

class Elevator {
    constructor(id, render) {
        this.id = id;
        this.render = render;
        this.floor = 1;
        this.dir = 0;            // -1 down, 0 idle, 1 up
        this.state = "idle";     // idle, moving, boarding
        this.riders = [];
        this.pickups = [];       // assigned riders still waiting at their origin
        this.stops = new Set();
        this.loop = null;
    }

    // hand a waiting passenger to this car
    assign(passenger) {
        this.pickups.push(passenger);
        this.syncStops();
        if (!this.loop) this.loop = this.run();
        this.render();
    }

    // stops are always derivable from pickups and rider destinations
    syncStops() {
        this.stops = new Set([
            ...this.pickups.map((p) => p.origin),
            ...this.riders.map((p) => p.dest),
        ]);
    }

    hasAhead() {
        return [...this.stops].some((f) => (this.dir > 0 ? f > this.floor : f < this.floor));
    }

    hasBehind() {
        return [...this.stops].some((f) => (this.dir > 0 ? f < this.floor : f > this.floor));
    }

    // nearest pending floor sets the initial direction
    chooseDir() {
        const pending = [...this.stops].filter((f) => f !== this.floor);
        if (!pending.length) return 0;
        const nearest = pending.reduce((a, b) =>
            Math.abs(b - this.floor) < Math.abs(a - this.floor) ? b : a);
        return nearest > this.floor ? 1 : -1;
    }

    board(dir) {
        const left = [];
        for (const p of this.pickups) {
            const here = p.origin === this.floor;
            const fits = this.riders.length < CAPACITY;
            if (here && fits && (dir === 0 || sameDir(p, dir))) {
                p.state = "aboard";
                this.riders.push(p);
            } else {
                left.push(p);
            }
        }
        this.pickups = left;
    }

    // drop off, then board the current direction, flipping once at a turn
    async service() {
        this.state = "boarding";
        this.render();

        this.riders = this.riders.filter((p) => {
            if (p.dest !== this.floor) return true;
            p.state = "done";
            flashFloor(this.floor);
            return false;
        });

        if (this.dir === 0) this.dir = this.chooseDir();
        this.syncStops();
        this.board(this.dir);
        this.syncStops();

        if (!this.hasAhead()) {
            this.dir = -this.dir;  // turn around at the end of the run
            this.board(this.dir);
            this.syncStops();
        }

        this.render();
        await sleep(DOOR_MS);
    }

    async moveOne() {
        this.state = "moving";
        this.floor += this.dir;
        this.render();
        await sleep(MOVE_MS);
    }

    // look/scan: service every stop in one direction, then reverse
    async run() {
        while (true) {
            if (this.stops.has(this.floor)) {
                await this.service();
            }
            if (!this.stops.size) break;
            if (this.dir === 0) this.dir = this.chooseDir();
            if (!this.hasAhead()) {
                if (!this.hasBehind()) break;
                this.dir = -this.dir;
            }
            await this.moveOne();
        }
        this.dir = 0;
        this.state = "idle";
        this.render();
        this.loop = null;
    }
}

// simulation
function dispatch(passenger) {
    if (passenger.origin === passenger.dest) {
        passenger.state = "done";
        flashFloor(passenger.origin);
        return;
    }

    let best = null;
    let bestCost = Infinity;
    for (const car of elevators) {
        const cost = Math.abs(car.floor - passenger.origin) + car.stops.size;
        if (cost < bestCost) {
            bestCost = cost;
            best = car;
        }
    }
    best.assign(passenger);
}

// ui
const building = document.getElementById("building");
const hint = document.getElementById("hint");
const floorViews = new Map();
const carViews = [];
let selectedOrigin = null;

function make(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
}

function buildUI() {
    const floors = make("section", "floors");
    for (let f = FLOORS; f >= 1; f--) {
        const strip = make("button", "floor-strip");
        strip.type = "button";
        strip.dataset.floor = String(f);
        const wait = make("span", "floor-wait");
        strip.append(make("span", "floor-num", String(f)), wait);
        strip.addEventListener("click", () => onFloorClick(f));
        floors.append(strip);
        floorViews.set(f, { strip, wait });
    }
    building.append(floors);

    for (let i = 0; i < CARS; i++) {
        const shaft = make("section", "shaft");
        const car = make("div", "car idle");
        const dir = make("span", "car-dir", "");
        const head = make("span", "car-head");
        head.append(make("span", "car-id", `e${i + 1}`), dir);
        const floor = make("span", "car-floor", "1");
        const load = make("span", "car-load", `0/${CAPACITY}`);
        car.append(head, floor, load);
        shaft.append(car);
        building.append(shaft);
        carViews.push({ car, dir, floor, load });
    }
}

function render() {
    elevators.forEach((car, i) => {
        const view = carViews[i];
        view.car.className = `car ${car.state}`;
        view.car.style.transform = `translateY(${(FLOORS - car.floor) * 100}%)`;
        view.dir.textContent = car.dir > 0 ? "▲" : car.dir < 0 ? "▼" : "";
        view.floor.textContent = String(car.floor);
        view.load.textContent = `${car.riders.length}/${CAPACITY}`;
    });

    const waiting = new Map();
    for (const car of elevators) {
        for (const p of car.pickups) {
            if (p.state !== "waiting") continue;
            if (!waiting.has(p.origin)) waiting.set(p.origin, []);
            waiting.get(p.origin).push(p);
        }
    }

    for (const [f, view] of floorViews) {
        const chips = (waiting.get(f) || []).map((p) => make("span", "chip", `→${p.dest}`));
        view.wait.replaceChildren(...chips);
        view.strip.classList.toggle("selected", f === selectedOrigin);
    }
}

function flashFloor(floor) {
    const view = floorViews.get(floor);
    if (!view) return;
    view.strip.classList.remove("flash");
    void view.strip.offsetWidth;  // restart the css animation
    view.strip.classList.add("flash");
    view.strip.addEventListener("animationend", () => view.strip.classList.remove("flash"), { once: true });
}

function onFloorClick(floor) {
    if (selectedOrigin === null) {
        selectedOrigin = floor;
        hint.textContent = `from floor ${floor}: pick a destination`;
    } else if (selectedOrigin === floor) {
        selectedOrigin = null;
        hint.textContent = "click a floor to set an origin";
    } else {
        dispatch(new Passenger(selectedOrigin, floor));
        selectedOrigin = null;
        hint.textContent = "click a floor to set an origin";
    }
    render();
}

function reset() {
    for (const car of elevators) {
        car.riders = [];
        car.pickups = [];
        car.stops = new Set();
        car.dir = 0;
        car.floor = 1;
        car.state = "idle";
    }
    selectedOrigin = null;
    hint.textContent = "click a floor to set an origin";
    render();
}

// main
const elevators = [
    new Elevator("e1", render),
    new Elevator("e2", render),
    new Elevator("e3", render),
];

document.documentElement.style.setProperty("--move-ms", `${MOVE_MS}ms`);
buildUI();
render();
document.getElementById("reset").addEventListener("click", reset);
