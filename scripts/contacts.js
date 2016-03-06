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
			
			$(appScreen).on("click", "[data-delete-button]",
				function(event) {
					event.preventDefault();
					this.delete(event);	
				}.bind(this)
			);
			
			$(appScreen).find('tbody').on("mouseenter mouseleave", "td > time",
				function(event) {
					if (event.type === "mouseenter") {
						$(event.target).siblings('.overlay').slideDown(10);
					} else if (event.type === "mouseleave") {
						$(event.target).siblings('.overlay').slideUp(10);					
					}
				}
			);
			
			$(':input[required]').siblings('label').
				append($('<span>').text('*').addClass('requiredMarker'));
			
			$(appScreen).find('form input[type="submit"]').click(
				function(event) {
					event.preventDefault();
					this.save(event);
					//  if ($(event.target).parents('form')[0].checkValidity()) {
//  						var contact = this.serializeForm();
//  						var html = '<tr><td>'+contact.contactName+'</td>'+
//  													'<td>'+contact.phoneNumber+'</td>'+
//  													'<td>'+contact.emailAddress+'</td>'+
//  													'<td>'+contact.company+'</td>'+
//  													'<td><time datetime="'+contact.lastContacted+'">'+
//  														contact.lastContacted+'</time>'+
//  														'<div class="overlay">'+contact.notes+'</div></td></tr>';
//  						$(appScreen).find('table tbody').append(html);
//  						//Clean up the form
//  						$(appScreen).find('form :input[name!="submit"]').val('');
//  						//Hide the input section
//  						$(appScreen).find('#contactDetails').hide();
//  						//Call init
//  						// initialized = false;
//  						// this.init();
//  					}
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
			
			this.updateTableCount();
		},	
		
		save: function(event) {
			if ($(event.target).parents('form')[0].checkValidity()) {
				var fragment = $(appScreen).find('#contactRow')[0].content.cloneNode(true);
				var row = $('<tr>').append(fragment);
				var contact = this.serializeForm();
				row = bind(row, contact);
				$(appScreen).find('table tbody').append(row);
				$(appScreen).find('form :input[name!="submit"]').val('');
				$(appScreen).find('#contactDetails').hide();				
			};
			this.updateTableCount(event);
		},
		
		delete: function(event) {
			$(event.target).parents('tr').remove();
			this.updateTableCount(event);
		},
		
		updateTableCount: function(event) {
			var count = $(appScreen).find('table tbody tr').length;	
			$(appScreen).find('tfoot td').text(count + ' contacts displayed');
		},
		
		serializeForm: function() {
			var inputFields = $(appScreen).find('form :input');
			var result = {};
			$.each(inputFields, function(index, value) {
				if ($(value).attr('name')) {
					result[$(value).attr('name')] = $(value).val();
				}
			});
			result['companyName'] = $(':input[name="companyName"] option[value="'+
				$(':input[name="companyName"]').val()+'"]').text();
			
			return result;
		}
	};
	return o;
};

$.expr[':'].email = function(element) {
	return $(element).is("input") && $(element).attr("type") === "email";
};

function bind(template, object) {
	// iterate through every element that has a data-property-name attribute
	// and provide a callback function to each, where value = the element itself
	// then assign the text of that element a value (the value of the field) 
	//		you get from the object
	$.each(template.find('[data-property-name]'), function(index, value) {
		var field = $(value).data().propertyName;
		if (object[field]) {
			$(value).text(object[field]);
			if ($(value).is('time')) {
				$(value).attr('datetime', object[field]);
			}
		}
	});
	return template;
};
/*Iterating through all input fields with pattern attribute and appending a 
sibling (using after) that is the pattern text itself */
/*
var inputs = $(':input[pattern]');
$.each(inputs, function(index, value) {
$(value).after($('<span>').text($(value).attr('pattern')));
});
*/