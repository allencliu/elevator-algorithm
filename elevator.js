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


var queue = new Queue();
var elevator1Full = false;
//var firstTime = true;
$( document ).ready(function() {
	$(".floor1").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");	
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor2").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor3").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor4").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor5").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor6").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor7").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor8").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor9").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});
	$(".floor10").unbind('click').click(function() {
		//var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		if (dest != '' && startFloor != null) {
			queue.push(new Passenger(dest, startFloor));
		//	pickUp(startFloor, dest);
		}
	});

	$(".btn").click(function() {
		if (!elevator1Full && queue.peek() != null) {
			let p = queue.poll();
			pickUp(p.getStartFloor(), p.getDest());
		}
	});

});
const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

async function moveUpDropOff(startFloor, dest, elevCurFloor) {
	while (elevCurFloor < dest) {
		let nextFloor = elevCurFloor + 1;
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor+=1;
		//setTimeout(moveUpDropOff(Number(startFloor),Number(dest),Number(elevCurFloor)));
	}
	if (elevCurFloor == dest){
		arrived(dest);
	}
}

async function moveDownDropOff(startFloor, dest, elevCurFloor) {
	while (elevCurFloor > dest) {
		let nextFloor = elevCurFloor - 1;
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor -= 1;
	}
	if (elevCurFloor == dest){
		arrived(dest)
	}
}

async function moveUpPickUp(startFloor, dest, elevCurFloor) {
	while (elevCurFloor < startFloor) {
		console.log(queue);
		let nextFloor = elevCurFloor + 1;
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor += 1;
	}
	if (elevCurFloor == startFloor){
		if (startFloor < dest) {
			$("#e1f"+startFloor).css("background", "blue");
			await sleep(1000)
			$("#e1f"+startFloor).css("background", "grey");
			moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

		} else if (startFloor > dest) {
			$("#e1f"+startFloor).css("background", "blue");
			await sleep(1000);
			$("#e1f"+startFloor).css("background", "grey");
			moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor))
		}
	}
}


async function moveDownPickUp(startFloor, dest, elevCurFloor) {
	while (elevCurFloor > startFloor) {
		let nextFloor = elevCurFloor - 1;
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + elevCurFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f" + elevCurFloor).css("background", "grey");
		await sleep(1000);
		elevCurFloor -= 1;
	}
	if (elevCurFloor == startFloor){
		if (startFloor < dest) {
			$("#e1f"+startFloor).css("background", "blue");
			await sleep(1000)
			$("#e1f"+startFloor).css("background", "grey");
			moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

		} else if (startFloor > dest) {
			$("#e1f"+startFloor).css("background", "blue");
			await sleep(1000);
			$("#e1f"+startFloor).css("background", "grey");
			moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor))
		}
	}
}


// need if statement to differentiate moveUp and moveDown
async function pickUp(startFloor, dest) {
	// move up
	var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor")
	if (!elevator1Full) {
		elevator1Full = true;
		if (startFloor > elevCurFloor) {
			moveUpPickUp(Number(startFloor), Number(dest),  Number(elevCurFloor));
		} else if (startFloor < elevCurFloor) { // move down 
			moveDownPickUp(Number(startFloor), Number(dest), Number(elevCurFloor));
		}
		else {
			if (startFloor < dest) {
				$("#e1f"+startFloor).css("background", "blue");
				await sleep(1000)
				$("#e1f"+startFloor).css("background", "grey");
				moveUpDropOff(Number(startFloor), Number(dest), Number(elevCurFloor));

			} else if (startFloor > dest) {
				$("#e1f"+startFloor).css("background", "blue");
				await sleep(1000);
				$("#e1f"+startFloor).css("background", "grey");
				moveDownDropOff(Number(startFloor), Number(dest), Number(elevCurFloor))
			}

		}
	}
}

async function arrived(dest) {
	$("#e1f" + dest).css("background", "black");
	elevator1Full = false;
	await sleep(1000);
	if (!elevator1Full && queue.peek() != null) {
		let p = queue.poll();
		pickUp(p.getStartFloor(), p.getDest());
	}

}




















