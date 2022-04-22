$( document ).ready(function() {
	var elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
	$(".floor1").click(function() {
		var dest = $(this).val();
		var startFloor = this.getAttribute("data-floor");
		pickUp(startFloor, dest, elevCurFloor);
	});
});
const sleep = (ms) =>
	new Promise(resolve => setTimeout(resolve, ms));

// rename to moveUp fucntion later
async function moving(startFloor, dest, elevCurFloor) {
	let nextFloor = startFloor + 1;
	//console.log(elevCurFloor);
	if (startFloor < dest) {
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f" + startFloor).removeClass("curFloor1");
		$("#e1f" + nextFloor).addClass("curFloor1");
		$("#e1f"+startFloor).css("background", "grey");
		elevCurFloor = $(".curFloor1")[0].getAttribute("data-curFloor");
		console.log(elevCurFloor);
		await sleep(1000);
		//console.log(curFloor);
		// test to see if moving elevator class works
		//console.log($("#e1f3").hasClass("curFloor1"));
		startFloor+=1;
		setTimeout(moving(Number(startFloor),Number(dest),Number(elevCurFloor)));
	}
	if (startFloor == dest){
		setTimeout(arrived(dest), 1000);
	}
}

// need if statement to differentiate moveUp and moveDown
function pickUp(startFloor, dest, elevCurFloor) {
	$("#e1f"+startFloor).css("background", "blue");
	setTimeout(function(){$("#e1f"+startFloor).css("background", "grey");
		setTimeout(moving(Number(startFloor), Number(dest), Number(elevCurFloor)))}, 1000);

}

function arrived(dest) {
	$("#e1f" + dest).css("background", "black");

}




















