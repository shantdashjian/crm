function startDragging(event) {
	event.dataTransfer.setData("Text", event.target.firstChild.textContent);
	event.target.style.color = "gray";
}
function endDragging(event) {
	event.target.style.color = "black";
}
function allowDrop(event) {
	event.preventDefault();
}

function drop(event) {
	var text = event.dataTransfer.getData("Text");
	event.target.firstChild.textContent = text;
}