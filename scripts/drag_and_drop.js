function startDragging(event) {
	event.dataTransfer.setData("Color", event.target.style.background);
	//var source = JSON.stringify(event.target);
	//event.dataTransfer.setData("Source", source);
	event.target.style.opacity = 0.3;
}

function setBorderWidth(event, width) {
	event.target.style.border = width + " solid black";
}

function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	var color = event.dataTransfer.getData("Color");
	event.target.style.background = color;
	setBorderWidth(event, '2px');
	//var source = JSON.parse(event.dataTransfer.getData("Source"));
	//source.style.opacity = 1.0;
}

function endDragging(event) {
	event.target.style.opacity = 1.0;
}