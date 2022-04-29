class Passenger {
	constructor(elevCurFloor, dest, startFloor) {
		this.elevCurFloor = elevCurFloor;
		this.dest = dest;
		this.startFloor = startFloor;
	}

	getElevCurFloor() {
		return this.elevCurFloor;
	}
	
	getDest(){
		return this.dest;
	}

	getStartFloor() {
		return this.startFloor;
	}
	
}

class Queue {
	constructor() {
		this.elements = {};
		this.head = 0;
		this.tail = 0;
	}
	push(element) {
		this.elements[this.tail] = element;
		this.tail++;
	}
	poll() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		return item;
	}
	peek() {
		return this.elements[this.head];
	}
	length() {
		return this.tail - this.head;
	}
	isEmpty() {
		return this.length === 0;
	}
}


var queue = new Queue();
var elevator1Full = false;
var firstTime = true;
$( document ).ready(function() {
	$(".floor1").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor2").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor3").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor4").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor5").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor6").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor7").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor8").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor9").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});
	$(".floor10").click(function() {
		var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		queue.push(new Passenger(elevCurFloor, dest, startFloor));
		//pickUp(startFloor, dest, elevCurFloor);
	});

	$(".btn").click(function() {
		if (!elevator1Full && queue.peek() != null && firstTime) {
			elevator1Full = true;
			let p = queue.poll();
			pickUp(p.getStartFloor(), p.getDest(), p.getElevCurFloor());
		}
	});

});
const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

// rename to moveUp fucntion later
async function moveUpDropOff(startFloor, dest, elevCurFloor) {
	let nextFloor = elevCurFloor + 1;
	//console.log(elevCurFloor);
	if (elevCurFloor < dest) {
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		//console.log(elevCurFloor);
		await sleep(1000);
		//console.log(curFloor);
		// test to see if moving elevator class works
		//console.log($("#e1f3").hasClass("curFloor1"));
		elevCurFloor+=1;
		setTimeout(moveUpDropOff(Number(startFloor),Number(dest),Number(elevCurFloor)));
	}
	if (elevCurFloor == dest){
		setTimeout(arrived(dest), 1000);
		elevator1Full = false;
		if (!elevator1Full && queue.peek() != null) {
			elevator1Full = true;
			let p = queue.poll();
			pickUp(p.getStartFloor(), p.getDest(), p.getElevCurFloor());
		}
	}
}

async function moveDownDropOff(startFloor, dest, elevCurFloor) {
	let nextFloor = elevCurFloor - 1;
	//console.log(elevCurFloor);
	if (elevCurFloor > dest) {
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		//console.log(elevCurFloor);
		await sleep(1000);
		//console.log(curFloor);
		// test to see if moving elevator class works
		//console.log($("#e1f3").hasClass("curFloor1"));
		elevCurFloor -= 1;
		setTimeout(moveDownDropOff(Number(startFloor),Number(dest),Number(elevCurFloor)));
	}
	if (elevCurFloor == dest){
		setTimeout(arrived(dest), 1000);
		elevator1Full = false;
		if (!elevator1Full && queue.peek() != null) {
			elevator1Full = true;
			let p = queue.poll();
			pickUp(p.getStartFloor(), p.getDest(), p.getElevCurFloor());
		}
	}
}


async function moveUpPickUp(startFloor, dest, elevCurFloor) {
	let nextFloor = elevCurFloor + 1;
	//console.log(elevCurFloor);
	if (elevCurFloor < startFloor) {
		console.log(queue);
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		//console.log(elevCurFloor);
		await sleep(1000);
		//console.log(curFloor);
		// test to see if moving elevator class works
		//console.log($("#e1f3").hasClass("curFloor1"));
		//startFloor+=1;
		elevCurFloor += 1;
		setTimeout(moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor)));
	}
	if (elevCurFloor == startFloor){
		setTimeout(arrived(startFloor), 1000);
		pickUp(startFloor, dest, elevCurFloor);
	}
}

async function moveDownPickUp(startFloor, dest, elevCurFloor) {
	let nextFloor = elevCurFloor - 1;
	//console.log(elevCurFloor);
	if (elevCurFloor > startFloor) {
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		//console.log(elevCurFloor);
		await sleep(1000);
		//console.log(curFloor);
		// test to see if moving elevator class works
		//console.log($("#e1f3").hasClass("curFloor1"));
		//startFloor+=1;
		elevCurFloor -= 1;
		setTimeout(moveDownPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor)));
	}
	if (elevCurFloor == startFloor){
		setTimeout(arrived(startFloor), 1000);
		pickUp(startFloor, dest, elevCurFloor);
	}
}


// need if statement to differentiate moveUp and moveDown
function pickUp(startFloor, dest, elevCurFloor) {
	// move up
	//console.log("startFloor: " + startFloor + " elevCurFloor: " + elevCurFloor);
	if (startFloor > elevCurFloor) {
		moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor));
	} else if (startFloor < elevCurFloor) { // move down 
		moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor));
	} else {
		// pick up
		if (startFloor < dest) {
			$("#e1f"+startFloor).css("background", "blue");
			setTimeout(function(){$("#e1f"+startFloor).css("background", "grey");
				setTimeout(moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor)))}, 1000);

		} else if (startFloor > dest) {
			$("#e1f"+startFloor).css("background", "blue");
			setTimeout(function(){$("#e1f"+startFloor).css("background", "grey");
				setTimeout(moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor)))}, 1000);
		}
	}
}

function arrived(dest) {
	$("#e1f" + dest).css("background", "black");
}




















