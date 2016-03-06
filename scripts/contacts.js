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
			
			$(appScreen).find('tbody').on("mouseenter mouseleave dblclick", "td > time",
				function(event) {
					if (event.type === "mouseenter") {
						$(event.target).siblings('.overlay').slideDown(10);
					} else if (event.type === "mouseleave") {
						$(event.target).siblings('.overlay').slideUp(10);					
					} else {
						console.log("Double click");
					}
				}
			);
			
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
						//Clean up the form
						$(appScreen).find('form :input[name!="submit"]').val('');
						//Hide the input section
						$(appScreen).find('#contactDetails').hide();
						//Call init
						// initialized = false;
						// this.init();
					}
				}.bind(this)
			);
			$(appScreen).find('textarea').keydown(function(event) {
				if ($(event.target).siblings('.textCount')) {
					var characters = $(event.target).val().length;
					$(event.target).siblings('.textCount').text($(event.target).val() + ' ' + characters);//text(characters + ' characters');
				}
			});
			
			$(appScreen).find('tbody').on("mouseenter mouseleave","tr", function(event) {
				if (event.type === "mouseenter") {
					$(event.target).closest('tr').css('color','white');
					$(event.target).closest('tr').css('background','#3056A0');
				} else {
					$(event.target).closest('tr').removeAttr('style');
				}
			});
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