class Passenger {
	constructor(dest, startFloor, button) {
		this.dest = dest;
		this.startFloor = startFloor;
		this.button = button;
	}

	getDest(){
		return this.dest;
	}

	getStartFloor() {
		return this.startFloor;
	}

	getButton() {
		return this.button;
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
		this.button;
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

	async moveUpPickUp(startFloor, dest, elevCurFloor, button) {
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
			$(button).css("background-color", "#212529");
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(startFloor, dest, elevCurFloor);

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(startFloor, dest, elevCurFloor);
			}
		}
	}


	async moveDownPickUp(startFloor, dest, elevCurFloor, button) {
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
			$(button).css("background-color", "#212529");
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(startFloor, dest, elevCurFloor);

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(startFloor, dest, elevCurFloor);
			}
		}
	}


	async pickUp() {
		var p = this.queue.poll();
		console.log(p);
		var startFloor = parseInt(p.getStartFloor());
		var dest = parseInt(p.getDest());
		var elevCurFloor = parseInt($("." + this.curFloorClass)[0].getAttribute("data-curFloor"));
		var button = p.getButton();
		if (startFloor > elevCurFloor) {
			this.moveUpPickUp(startFloor, dest, elevCurFloor, button);
		} else if (startFloor < elevCurFloor) { 
			this.moveDownPickUp(startFloor, dest, elevCurFloor, button);
		} else {
			await sleep(1000);
			$(button).css("background-color", "#212529");
			this.elevatorFull = true;
			if (startFloor < dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveUpDropOff(startFloor, dest, elevCurFloor);

			} else if (startFloor > dest) {
				$("#" + this.elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + this.elevID + startFloor).css("background", "grey");
				this.moveDownDropOff(startFloor, dest, elevCurFloor);
			}
		}
	}

	async arrived(dest) {
		$("#" + this.elevID + dest).css("background", "black");
		this.elevatorMoving = false;
		this.elevatorFull = false;
		if (!this.queue.isEmpty()) {
			await sleep(1000);
			this.pickUp();
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
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor2").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor3").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor4").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor5").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor6").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor7").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor8").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor9").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});
	$(".floor10").unbind('click').click(function() {
		var button = this;
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			let q1Size = elevator1.getQueue().size();
			let q2Size = elevator2.getQueue().size();
			let q3Size = elevator3.getQueue().size();
			if (elevator1.getQueue().isEmpty() && !elevator1.isFull() && !elevator1.isMoving()) {
				elevator1.getQueue().push(new Passenger(dest, startFloor, button));
			} else if (elevator2.getQueue().isEmpty() && !elevator2.isFull()  && !elevator2.isMoving()) {
				elevator2.getQueue().push(new Passenger(dest, startFloor, button));
			} 
			else if (elevator3.getQueue().isEmpty() && !elevator3.isFull()  && !elevator3.isMoving()) {
				elevator3.getQueue().push(new Passenger(dest, startFloor, button));
			} else {
				let min = Math.min(q1Size, Math.min(q2Size, q3Size));
				if (min == q1Size) {
					elevator1.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q2Size) {
					elevator2.getQueue().push(new Passenger(dest, startFloor, button));
				} else if (min == q3Size) {
					elevator3.getQueue().push(new Passenger(dest, startFloor, button));
				}
			}
		}
	});

	$(".btn").click(function() {
		var button = this;
		$(button).css("background-color", "grey");
		if (!elevator1.isFull() && !elevator1.isMoving() && elevator1.getQueue().peek() != null) {
			elevator1.pickUp();
		} else if (!elevator2.isFull() && !elevator2.isMoving() && elevator2.getQueue().peek() != null) {
			elevator2.pickUp();
		} else if (!elevator3.isFull() && !elevator3.isMoving() && elevator3.getQueue().peek() != null) {
			elevator3.pickUp();
		}
	});

});



















