function validateText(field, fieldName, requiredLength) {
	var value = field.value;	
	if(!validateBlank(value, fieldName)) {
		field.focus();
		return false;
	}
	if(!validateChar(value, fieldName)) {
		field.focus();
		return false;
	}
	if(!validateLength(value, fieldName, requiredLength)) {
		field.focus();
		return false;
	}
	return true;
}

function validateNumber(field, fieldName, requiredLength) {
	var value = field.value;
	if(!validateBlank(value, fieldName)) {
		field.focus();
		return false;
	}
	if(!validateNum(value, fieldName)) {
		field.focus();
		return false;
	}
	if(!validateLength(value, fieldName, requiredLength)) {
		field.focus();
		return false;
	}
	return true;
}

function validateChar (value, fieldName) {
	var isOnlyCharacters = /^([a-zA-Z]+\s)*[a-zA-Z]+$/.test(value);
	if(!isOnlyCharacters) {
		alert("Numbers and special characters like '!,@,$,%,^,&,*' are not allowed in " + fieldName);
	}
	return isOnlyCharacters;
}

function validateNum(value, fieldName) {
	var isOnlyNumbers = /^[0-9]+$/.test(value);
	if(!isOnlyNumbers) {
		alert("Characters and special characters '!,@,$,%,^,&,*' are not allowed in " + fieldName);
	}
	return isOnlyNumbers;
}

function validateBlank(value, fieldName) {
	
	if (value == null || value.trim() == "") {
		alert("Please enter " + fieldName);
		return false;
    }
	return true;
}

function validateEmail(field, fieldName, requiredLength) {	
	var value = field.value;
	if(!validateBlank(value, fieldName)) {
		field.focus();
		return false;
	}
	
	var atpos = value.indexOf("@");
	var dotpos = value.lastIndexOf(".");
	if (atpos < 1 || dotpos < atpos+2 || dotpos + 2 >= value.length) {
		alert("Not a valid e-mail address");
		field.focus();
		return false;
	}
	
	if(!validateLength(value, fieldName, requiredLength)) {
		field.focus();
		return false;
	}
	
	return true;
}

function validateLength(value, fieldName, requiredLength) {
	if(value.length > requiredLength) {
		alert(fieldName + " should not contain more than " + requiredLength + " characters");
		return false;
	}
	return true;
}