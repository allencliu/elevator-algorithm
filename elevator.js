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
		this.length = 0;
	}

	push(element) {
		this.elements[this.tail] = element;
		this.tail++;
		this.length++;
	}

	poll() {
		const item = this.elements[this.head];
		delete this.elements[this.head];
		this.head++;
		this.length--;
		return item;
	}

	peek() {
		return this.elements[this.head];
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return this.length == 0;
	}
}

const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));
class Elevator {
	constructor(elevID, curFloorClass) {
		this.elevatorFull = false;
		this.elevatorMoving = false;
		this.queue = new Queue();
		this.elevID = elevID;
		this.curFloorClass = curFloorClass;
	}
	async moveUpDropOff(startFloor, dest, elevCurFloor) {
		this.elevatorMoving = true;
		while (elevCurFloor < dest) {
			let nextFloor = elevCurFloor + 1;
			$("#" + this.elevID + nextFloor).css("background", "green");
			$("#" + this.elevID + elevCurFloor).removeClass(this.curFloorClass);
			$("#" + this.elevID + nextFloor).addClass(this.curFloorClass);
			$("#" + this.elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor+=1;
		}
		if (elevCurFloor == dest){
			this.arrived(dest);
		}
	}

	async moveDownDropOff(startFloor, dest, elevCurFloor) {
		this.elevatorMoving = true;
		while (elevCurFloor > dest) {
			let nextFloor = elevCurFloor - 1;
			$("#" + this.elevID + nextFloor).css("background", "green");
			$("#" + this.elevID + elevCurFloor).removeClass(this.curFloorClass);
			$("#" + this.elevID + nextFloor).addClass(this.curFloorClass);
			$("#" + this.elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor -= 1;
		}
		if (elevCurFloor == dest){
			this.arrived(dest);
		}
	}

	async moveUpPickUp(startFloor, dest, elevCurFloor) {
		this.elevatorMoving = true;
		while (elevCurFloor < startFloor) {
			let nextFloor = elevCurFloor + 1;
			$("#" + this.elevID +  nextFloor).css("background", "green");
			$("#" + this.elevID + elevCurFloor).removeClass(this.curFloorClass);
			$("#" + this.elevID + nextFloor).addClass(this.curFloorClass);
			$("#" + this.elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor += 1;
		}
		if (elevCurFloor == startFloor)	{
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));
			}
		}
	}


	async moveDownPickUp(startFloor, dest, elevCurFloor) {
		this.elevatorMoving = true;
		while (elevCurFloor > startFloor) {
			let nextFloor = elevCurFloor - 1;
			$("#" + this.elevID + nextFloor).css("background", "green");
			$("#" + this.elevID + elevCurFloor).removeClass(this.curFloorClass);
			$("#" + this.elevID + nextFloor).addClass(this.curFloorClass);
			$("#" + this.elevID + elevCurFloor).css("background", "grey");
			await sleep(1000);
			elevCurFloor -= 1;
		}
		if (elevCurFloor == startFloor)	{
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));
			}
		}
	}


	async pickUp() {
		var p = this.queue.poll();
		var startFloor = parseInt(p.getStartFloor());
		var dest = parseInt(p.getDest());
		var elevCurFloor = parseInt($("." + this.curFloorClass)[0].getAttribute("data-curFloor"));
		if (startFloor > elevCurFloor) {
			this.moveUpPickUp(Number(startFloor), Number(dest), Number(elevCurFloor));
		} else if (startFloor < elevCurFloor) { 
			this.moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor));
		} else {
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));
			}
		}
	}

	async arrived(dest) {
		$("#" + this.elevID + dest).css("background", "black");
		this.elevatorMoving = false;
		this.elevatorFull = false;
		if (this.queue.peek() != null) {
			await sleep(1000);
			this.pickUp(this.curFloorClass);
		}
	}

	isFull() {
		return this.elevatorFull;
	}

	isMoving() {
		return this.elevatorMoving;
	}

	getQueue() {
		return this.queue;
	}
}

var elevator1 = new Elevator("e1f", "curFloor1");
var elevator2 = new Elevator("e2f", "curFloor2");
var elevator3 = new Elevator("e3f", "curFloor3");
$( document ).ready(function() {
	$(".floor1").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			}  else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor2").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor3").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor4").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor5").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor6").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor7").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor8").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor9").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});
	$(".floor10").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor));
			} else {
				let min = Math.min(q1Size, q2Size);
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor));
				}
			}
		}
	});

	$(".btn").click(function() {
		if (!elevator1.isFull() && !elevator1.isMoving() && elevator1.getQueue().peek() != null) {
			elevator1.pickUp("curFloor1");
		} else if (!elevator2.isFull() && !elevator2.isMoving() && elevator2.getQueue().peek() != null) {
			elevator2.pickUp("curFloor2");
		}
	});

});



















