$( document ).ready(function() {
        $(".floor1").click(function() {
        	var dest = $(this).val();
		var curFloor = this.getAttribute("data-floor");
		pickUp(curFloor, dest);
	});

});
const sleep = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

// rename to moveUp fucntion later
async function moving(curFloor, dest) {
	let nextFloor = curFloor + 1;
	if (curFloor < dest) {
		$("#e1f" + nextFloor).css("background", "green");
		$("#e1f"+curFloor).css("background", "grey");
		await sleep(1000);
		console.log(curFloor);
		curFloor+=1;
		setTimeout(moving(curFloor,dest));
	}
	if (curFloor == dest){
		setTimeout(arrived(dest), 1000);
	}
}

// need if statement to differentiate moveUp and moveDown
function pickUp(curFloor, dest) {
	$("#e1f"+curFloor).css("background", "blue");
	setTimeout(function(){$("#e1f"+curFloor).css("background", "grey");
	setTimeout(moving(Number(curFloor), Number(dest)))}, 1000);

}

function arrived(dest) {

	$("#e1f" + dest).css("background", "black");

}




















