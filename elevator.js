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
	pop() {
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

class Passenger {
	constructor(startFloor, elevCurFloor, elevator) {
		
	}

}


var elevator1Full = false;
var queue = new Queue();
$( document ).ready(function() {
	$(".floor1").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 

	});
	$(".floor2").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor3").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor4").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor5").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor6").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor7").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor8").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor9").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
		} 
	});
	$(".floor10").click(function() {
		queue.push(this.getAttribute("data-floor"));
		var elevCurFloor;
		var dest = $(this).val();
		var startFloor;
		var elevatorNumber;
		if (!elevator1Full && queue.length != 0) {
			startFloor = queue.pop();
			elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
			elevator1Full = true;
			elevatorNumber = "curFloor1";
			pickUp(startFloor, dest, elevCurFloor);
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
	}
}


async function moveUpPickUp(startFloor, dest, elevCurFloor) {
	let nextFloor = elevCurFloor + 1;
	//console.log(elevCurFloor);
	if (elevCurFloor < startFloor) {
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




















