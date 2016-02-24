function contactsScreen(mainID){
	var appScreen = mainID;
	var initialized = false;
	o = {
		init: function() {
			if (initialized === true) {
				return;
			};
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
			$(':input[required]').siblings('label').
				append($('<span>').text('*').addClass('requiredMarker'));
			$(appScreen).find('form input[type="submit"]').click(
				function(event) {
					event.preventDefault();
					if ($(event.target).parents('form')[0].checkValidity()) {
						var contact = this.serializeForm();
						var html = '<tr><td>'+contact.contactName+'</td>'+
													'<td>'+contact.phoneNumber+'</td>'+
													'<td>'+contact.emailAddress+'</td>'+
													'<td>'+contact.company+'</td>'+
													'<td><time datetime="'+contact.lastContacted+'">'+
														contact.lastContacted+'</time>'+
														'<div class="overlay">'+contact.notes+'</div></td></tr>';
						$(appScreen).find('table tbody').append(html);
					}
				}.bind(this)
			);
		},	
		serializeForm: function() {
			var inputFields = $(appScreen).find('form :input');
			var result = {};
			$.each(inputFields, function(index, value) {
				if ($(value).attr('name')) {
					result[$(value).attr('name')] = $(value).val();
				}
			});
			result['company'] = $(':input[name="company"] option[value="'+
				$(':input[name="company"]').val()+'"]').text();
			
			return result;
		}
	};
	return o;
};

$.expr[':'].email = function(element) {
	return $(element).is("input") && $(element).attr("type") === "email";
};

/*Iterating through all input fields with pattern attribute and appending a 
sibling (using after) that is the pattern text itself */
/*
var inputs = $(':input[pattern]');
$.each(inputs, function(index, value) {
$(value).after($('<span>').text($(value).attr('pattern')));
});
*/