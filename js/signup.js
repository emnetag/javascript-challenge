/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
var signupForm = document.getElementById('signup');
var occupationOther = signupForm.elements['occupationOther'];
var occupationSelect = signupForm.elements['occupation'];
var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];



document.addEventListener('DOMContentLoaded', function() {
    var stateSelect = signupForm.elements['state'];

    var cancelButton = document.getElementById('cancelButton');
    var idx;
    var option;


    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        stateSelect.appendChild(option);
    }

    occupationSelect.addEventListener('change', function() {
        if (occupationSelect.value == 'other') {
            occupationOther.style.display = "inline";
        }
        else {
            occupationOther.style.display = "none";
        }
    });

    cancelButton.addEventListener('click', function () {
        if (window.confirm("Are you sure you want to leave?")) {
            window.location.href = "http://google.com";
        }
    });

    signupForm.addEventListener('submit', onSubmit);
});

function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if(!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    var idx;
    var formValid = true;

    if (occupationSelect.value == 'other') {
        requiredFields.push('occupationOther');
    }

    for (idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    return formValid;
}

function validateRequiredField(field) {
    var value = field.value.trim();
    var valid;

    if (field.name == 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        valid = zipRegExp.test(value);
    } else if (field.name == 'birthdate') {
        var currentDate = new Date();
        var dateValue = new Date(value);

       if (currentDate.getFullYear() - dateValue.getFullYear() > 13) {
           valid = true;
       } else if (currentDate.getFullYear() - dateValue.getFullYear() == 13) {
           valid = (currentDate.getMonth() >= dateValue.getMonth()) && (currentDate.getDate() >= dateValue.getDate());
       } else {
           valid = false;
       }

    } else {
        valid = value.length > 0;
    }

    if (valid) {
        field.className = 'form-control';
    }
    else {
        if (field.name = 'birthdate') {
            var birthdateMessage = document.getElementById('birthdateMessage');
            birthdateMessage.innerHTML = 'Must be 13 years or older to sign up!';
        }
        field.className = 'form-control invalid-field';
    }
    return valid;
}



