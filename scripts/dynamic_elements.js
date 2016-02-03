setInterval(updateProgressBar, 200);
setInterval(updateValue, 200);

function updateProgressBar() {
	var progressBar = document.getElementById("progressBar");
	progressBar.value = progressBar.value + 1;
}

function updateValue() {
	var range = document.getElementById("range");
	var valueLabel = document.getElementById("value");
	valueLabel.textContent = range.value;
}

// Try It: Two Utility Functions
function reverse(word) {
	if (typeof word === "string") {
		var reverse = "";
		for(var i=word.length-1; i > -1; i--) {
			reverse = reverse + word.charAt(i);
		}
		return reverse;
	} else {
		throw "Parameter must be a string";
	}
}

function sum(array) {
	var sumPositives = 0;
	var sumAbsoluteNegatives = 0;
	var i = 0;
	while(i < array.length) {
		if (array[i] >= 0) {
			sumPositives = sumPositives + array[i];
		} else {
			sumAbsoluteNegatives = sumAbsoluteNegatives + Math.abs(array[i]);
		};
		i++;
	};
	if (sumPositives > sumAbsoluteNegatives) {
		return true;
	} else {
		return false;
	};
	
}