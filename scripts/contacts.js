function contactsScreen(mainID){
	var appScreen = mainID;
	var initialized = false;
	o = {
		init: function() {
			if (initialized === true) {
				return;
			}
			var contactName = document.getElementById('contactName');
			contactName.oninvalid = function(e) {
				e.target.setCustomValidity("");
				if (!e.target.validity.valid) {
					if (e.target.value.length == 0) {
						e.target.setCustomValidity("Contact name is required.");
					} else if (e.target.value.length < 5) {
						e.target.setCustomValidity("Contact name must be at least 5 characters.");
					}
				}
			};
			initialized = true;
		},	
	};
	return o;
}