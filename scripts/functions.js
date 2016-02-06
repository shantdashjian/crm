function isItPositive(number) {
	if (number > 0) {
		return true;
	} else {
		return false;
	}
}

function isItNegative(number) {
	if (number < 0) {
		return true;
	} else {
		return false;
	}
}

function countPositives(array, condition) {
	var result = 0;
	for (var i = 0; i < array.length; i++) {
		var element = array[i];
		if (condition(element)) {
			result++;
		}
	}
	return result;
}

function testHoisting() {
	var num = num1 + num2;
	var num1 = 10;
	var num2 = 10;
	return num;
}

function add() {
	var sum = 0;
	for (var i = 0; i < arguments.length; i++) {
		sum = sum + arguments[i];
	}
	return sum;
}

function map(array, fun){
	var newArray=[];
	for (var i = 0; i < array.length; i++) {
		newArray.push(fun(array[i]));
	}
	return newArray;
}

function evenIt() {
	var number = arguments[0];
	if (number%2 === 0) {
		return number;
	} else {
		return number+1;
	}
}

function sum(sum, number) {
	console.log(sum + number);
	return sum + number;
}