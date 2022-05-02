class Passenger {
	constructor(dest, startFloor) {
		this.dest = dest;
		this.startFloor = startFloor;
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

const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));
class Elevator {
	constructor(curFloorStr) {
		this.elevatorFull = false;
		this.curFloorStr = curFloorStr;
	}
	async pickUp() {
		if (!this.elevatorFull && queue.peek() != null) {
			var p = queue.poll();
			var startFloor = p.getStartFloor();
			var dest = p.getDest();
			var elevCurFloor = $("." + this.curFloorStr)[0].getAttribute("data-curFloor")
			var elevID = $("." + this.curFloorStr)[0].getAttribute("data-id")
			this.elevatorFull = true;
			if (startFloor > elevCurFloor) {
				this.moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor), elevID);
			} else if (startFloor < elevCurFloor) { 
				this.moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);
			} else {
				if (startFloor < dest) {
					$("#" + elevID + startFloor).css("background", "blue");
					await sleep(1000)
					$("#" + elevID + startFloor).css("background", "grey");
					this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);

				} else if (startFloor > dest) {
					$("#" + elevID + startFloor).css("background", "blue");
					await sleep(1000);
					$("#" + elevID + startFloor).css("background", "grey");
					this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID)
				}
			}
		} 
	}

	async moveUpPickUp(startFloor, dest, elevCurFloor, elevID) {
		while (elevCurFloor < startFloor) {
			console.log(queue);
			let nextFloor = elevCurFloor + 1;
			$("#" + elevID +  nextFloor).css("background", "green");
			$("#" + elevID + elevCurFloor).removeClass("curFloor1");
			$("#" + elevID + nextFloor).addClass("curFloor1");
			$("#" + elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor += 1;
		}
		if (elevCurFloor == startFloor){
			if (startFloor < dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000)
				$("#" + elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);

			} else if (startFloor > dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID)
			}
		}
	}


	async moveDownPickUp(startFloor, dest, elevCurFloor, elevID) {
		while (elevCurFloor > startFloor) {
			let nextFloor = elevCurFloor - 1;
			$("#" + elevID + nextFloor).css("background", "green");
			$("#" + elevID + elevCurFloor).removeClass("curFloor1");
			$("#" + elevID + nextFloor).addClass("curFloor1");
			$("#" + elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor -= 1;
		}
		if (elevCurFloor == startFloor){
			if (startFloor < dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000)
				$("#" + elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);

			} else if (startFloor > dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID)
			}
		}
	}

	async moveUpDropOff(startFloor, dest, elevCurFloor, elevID) {
		while (elevCurFloor < dest) {
			let nextFloor = elevCurFloor + 1;
			$("#" + elevID + nextFloor).css("background", "green");
			$("#" + elevID + elevCurFloor).removeClass("curFloor1");
			$("#" + elevID + nextFloor).addClass("curFloor1");
			$("#" + elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor+=1;
		}
		if (elevCurFloor == dest){
			this.arrived(dest, elevID);
		}
	}

	async moveDownDropOff(startFloor, dest, elevCurFloor, elevID) {
		while (elevCurFloor > dest) {
			let nextFloor = elevCurFloor - 1;
			$("#" + elevID + nextFloor).css("background", "green");
			$("#" + elevID + elevCurFloor).removeClass("curFloor1");
			$("#" + elevID + nextFloor).addClass("curFloor1");
			$("#" + elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor -= 1;
		}
		if (elevCurFloor == dest){
			this.arrived(dest, elevID)
		}
	}
	async arrived(dest, elevID) {
		if (elevID == "e1f") {
			$("#" + elevID + dest).css("background", "black");
			this.elevatorFull = false;
			if (!this.elevatorFull && queue.peek() != null) {
				await sleep(1000);
				this.pickUp();
			}
		} else if (elevID == "e2f") {
			$("#" + elevID + dest).css("background", "black");
			this.elevator = false;
			if (!this.elevatorFull && queue.peek() != null) {
				await sleep(1000);
				this.pickUp();
			}
		} else if (elevID == "e3f") {
			$("#" + elevID + dest).css("background", "black");
			this.elevator = false;
			if (!this.elevatorFull && queue.peek() != null) {
				await sleep(1000);
				this.pickUp();
			}
		}
	}
	isFull() {
		return this.elevatorFull;
	}
}

var queue = new Queue();
var elevator1 = new Elevator("curFloor1");
var elevator2 = new Elevator("curFloor2");
var elevator3 = new Elevator("curFloor3");
$( document ).ready(function() {
	$(".floor1").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor2").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor3").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor4").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor5").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor6").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor7").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor8").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor9").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor10").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		}
	});

	$(".btn").click(function() {
		if (!elevator1.isFull() && queue.peek() != null) {
			elevator1.pickUp();
		} /*else if (!elevator2.isFull() && queue.peek() != null) {
			elevator2.pickUp();
		} else if (!elevator3.isFull() && queue.peek() != null) {	
			elevator3.pickUp();
		}*/
	});

});






















