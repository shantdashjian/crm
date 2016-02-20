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
					if (e.target.value.length === 0) {
						e.target.setCustomValidity("Contact name is required.");
					} else if (e.target.value.length < 5) {
						e.target.setCustomValidity("Contact name must be at least 5 characters.");
					}
				}
			};
			initialized = true;
			document.getElementById('addContact').addEventListener('click', function(event){
					event.preventDefault();
					document.getElementById('contactDetails').style.display = 'block';
				}
			);
			var allTimeElements = document.getElementsByTagName('time');
			for (var i = 0; i < allTimeElements.length; i++){
				allTimeElements[i].addEventListener('mouseenter', function(event) {
						event.target.nextElementSibling.style.display = 'block';
					}
				);
				allTimeElements[i].addEventListener('mouseleave', function(event) {
						event.target.nextElementSibling.style.display = 'none';
					}
				);
			};
		}	
	};
	return o;
}