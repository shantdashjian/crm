me = {
	firstName: 'Shaun',
	lastName: 'Dashjian',
	profession: 'Software Developer',
	salary: 150000
	
}
staffPrototype = {
	increasePay: function(percentage) {
		this.salary = this.salary + ((this.salary * percentage) / 100);
	},
	getFullName: function() {
		return this.firstName + ' ' + this.lastName + ' (' + this.profession + ')';
	}
}

function extend(object) {
	function T(){};
	T.prototype = object;
	return new T();
}

Array.prototype.contains = function(value) {
	var flag = false;
	for (var i = 0; i < this.length; i++) {
		if (this[i] === value) {
			return true;
		}
	}
	return flag;
}

function Staff(firstName, lastName, salary, profession) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.salary = salary;
	this.profession = profession;
}

Staff.prototype.updateSalary = function(newSalary) {
	this.salary = newSalary;
}

function createStaff(initialSalary, firstName, lastName) {
	var salary = null;
	o = {
		setSalary: function() {
			salary = initialSalary;
		},
		getSalary: function() {
			return salary;
		},
		firstName: firstName,
		lastName: lastName
	};
	o.setSalary(initialSalary);
	return o;
}









