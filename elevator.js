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


var queue1 = new Queue();
var queue2 = new Queue();
var queue3 = new Queue();
var elevator1Full = false;
var elevator2Full = false;
var elevator3Full = false;
var elevator1Moving = false;
var elevator2Moving = false;
var elevator3Moving = false;
$( document ).ready(function() {
	var firstClick = false;
	$(".floor1").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor2").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor3").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor4").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor5").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor6").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor7").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor8").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor9").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});
	$(".floor10").unbind('click').click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue1.push(new Passenger(dest, startFloor));
		}
	});

	$(".btn").click(function() {
		if (!elevator1Full && !elevator1Moving && queue1.peek() != null) {
			pickUp("curFloor1");
		} /*else if (!elevator2Full && queue.peek() != null) {
			pickUp();
		} else if (!elevator3Full && queue.peek() != null) {	
			pickUp();
		}*/
		//	}
	});

});
const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

async function moveUpDropOff(startFloor, dest, elevCurFloor, elevID, curFloorClass) {
	while (elevCurFloor < dest) {
		let nextFloor = elevCurFloor + 1;
		$("#" + elevID + nextFloor).css("background", "green");
		$("#" + elevID + elevCurFloor).removeClass(curFloorClass);
		$("#" + elevID + nextFloor).addClass(curFloorClass);
		$("#" + elevID + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor+=1;
	}
	if (elevCurFloor == dest){
		arrived(dest, elevID);
	}
}

async function moveDownDropOff(startFloor, dest, elevCurFloor, elevID, curFloorClass) {
	while (elevCurFloor > dest) {
		let nextFloor = elevCurFloor - 1;
		$("#" + elevID + nextFloor).css("background", "green");
		$("#" + elevID + elevCurFloor).removeClass(curFloorClass);
		$("#" + elevID + nextFloor).addClass(curFloorClass);
		$("#" + elevID + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor -= 1;
	}
	if (elevCurFloor == dest){
		arrived(dest, elevID);
	}
}

async function moveUpPickUp(startFloor, dest, elevCurFloor, elevID, curFloorClass) {
	if (elevID === "e1f") {
		elevator1Moving = true;
	}
	while (elevCurFloor < startFloor) {
		let nextFloor = elevCurFloor + 1;
		$("#" + elevID +  nextFloor).css("background", "green");
		$("#" + elevID + elevCurFloor).removeClass(curFloorClass);
		$("#" + elevID + nextFloor).addClass(curFloorClass);
		$("#" + elevID + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor += 1;
	}
	if (elevCurFloor == startFloor)	{
		if (startFloor < dest) {
			$("#" + elevID + startFloor).css("background", "blue");
			await sleep(1000);
			$("#" + elevID + startFloor).css("background", "grey");
			moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);

		} else if (startFloor > dest) {
			$("#" + elevID + startFloor).css("background", "blue");
			await sleep(1000);
			$("#" + elevID + startFloor).css("background", "grey");
			moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);
		}
	}
}


async function moveDownPickUp(startFloor, dest, elevCurFloor, elevID, curFloorClass) {
	if (elevID === "e1f") {
		elevator1Moving = true;
	}
	while (elevCurFloor > startFloor) {
		let nextFloor = elevCurFloor - 1;
		$("#" + elevID + nextFloor).css("background", "green");
		$("#" + elevID + elevCurFloor).removeClass("" + curFloorClass);
		$("#" + elevID + nextFloor).addClass("" + curFloorClass);
		$("#" + elevID + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor -= 1;
	}
	if (elevCurFloor == startFloor)	{
		if (startFloor < dest) {
			$("#" + elevID + startFloor).css("background", "blue");
			await sleep(1000);
			$("#" + elevID + startFloor).css("background", "grey");
			moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);

		} else if (startFloor > dest) {
			$("#" + elevID + startFloor).css("background", "blue");
			await sleep(1000);
			$("#" + elevID + startFloor).css("background", "grey");
			moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);
		}
	}
}


async function pickUp(curFloorClass) {
	if (curFloorClass == "curFloor1") {
		var p = queue1.poll();
		var startFloor = parseInt(p.getStartFloor());
		var dest = parseInt(p.getDest());
		var elevCurFloor = parseInt($("." + curFloorClass)[0].getAttribute("data-curFloor"));
		var elevID = $("." + curFloorClass)[0].getAttribute("data-id");
		console.log("Elevator Current FLoor: " + elevCurFloor);
		console.log("Starting floor: " + startFloor);
		console.log("Type of elevCurFloor: " + typeof(elevCurFloor));
		console.log("Type of dest: " + typeof(dest));
		console.log("Type of startFloor: " + typeof(startFloor));
		if (startFloor > elevCurFloor) {
			console.log("If state: Elevator Current FLoor: " + elevCurFloor);
			console.log("If starting floor: " + startFloor);
			moveUpPickUp(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);
		} else if (startFloor < elevCurFloor) { 
			moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);
		} else {
			if (startFloor < dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);

			} else if (startFloor > dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID, curFloorClass);
			}
		}
	} /*else if (!elevator2Full && queue.peek() != null) {
		var p = queue.poll();
		var startFloor = p.getStartFloor();
		var dest = p.getDest();
		var elevCurFloor = $(".curFloor2")[0].getAttribute("data-curFloor")
		var elevID = $(".curFloor2")[0].getAttribute("data-id")
		elevator2Full = true;
		if (startFloor > elevCurFloor) {
			moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor), elevID);
		} else if (startFloor < elevCurFloor) { 
			moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);
		} else {
			if (startFloor < dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000)
				$("#" + elevID + startFloor).css("background", "grey");
				moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);

			} else if (startFloor > dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID)
			}
		}
	} else if (!elevator3Full && queue.peek() != null) {
		var p = queue.poll();
		var startFloor = p.getStartFloor();
		var dest = p.getDest();
		var elevCurFloor = $(".curFloor3")[0].getAttribute("data-curFloor")
		var elevID = $(".curFloor3")[0].getAttribute("data-id")
		elevator3Full = true;
		if (startFloor > elevCurFloor) {
			moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor), elevID);
		} else if (startFloor < elevCurFloor) { 
			moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);
		}
		else {
			if (startFloor < dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000)
				$("#" + elevID + startFloor).css("background", "grey");
				moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID);

			} else if (startFloor > dest) {
				$("#" + elevID + startFloor).css("background", "blue");
				await sleep(1000);
				$("#" + elevID + startFloor).css("background", "grey");
				moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor), elevID)
			}
		}

	}*/
}

async function arrived(dest, elevID) {
	if (elevID === "e1f") {
		$("#" + elevID + dest).css("background", "black");
		elevator1Moving = false;
		elevator1Full = false;
		if (queue1.peek() != null) {
			await sleep(1000);
			pickUp("curFloor1");
			/*else if (!elevator2Full && queue.peek() != null) {
			pickUp();
		} else if (!elevator3Full && queue.peek() != null) {	
			pickUp();
		}*/

		}
	}/* else if (elevID === "e2f") {
		$("#" + elevID + dest).css("background", "black");
		elevator2Full = false;
		await sleep(1000);
		if (!elevator2Full && queue.peek() != null) {
			pickUp();
		}
	} else if (elevID === "e3f") {
		$("#" + elevID + dest).css("background", "black");
		elevator3Full = false;
		await sleep(1000);
		if (!elevator3Full && queue.peek() != null) {
			pickUp();
		}

	}*/

}




















