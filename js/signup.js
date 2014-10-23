document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
    var signupForm = document.getElementById('signup');
    var occupationOther = signupForm.elements['occupationOther'];
    var occupationSelect = signupForm.elements['occupation'];
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];

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

    occupationSelect.addEventListener('change', function () {
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

    function onSubmit(eventObject) {
        try {
            eventObject.returnValue = validateForm(this);
        }
        catch(error) {
            console.error(error);
        }
        if (!eventObject.returnValue && eventObject.preventDefault) {
            eventObject.preventDefault();
        }
        return eventObject.returnValue;
    }

    function validateForm(form) {
        var idx;
        var formValid = true;

        if (occupationSelect.value == 'other') {
            requiredFields.push('occupationOther');
        }

        for (idx = 0; idx < requiredFields.length; ++idx) {
            var requiredField = form.elements[requiredFields[idx]];
            formValid &= validateRequiredField(requiredField);
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
            valid = testDate(value);
        } else {
            valid = value.length > 0;
        }
        field.className = valid ? 'form-control' : 'form-control invalid-field';
        return valid;
    }

    function testDate(dob) {
        var birthdateMessage = document.getElementById('birthdateMessage');
        var valid = moment().diff(dob, 'years') >- 13;

        if (!valid) {
            birthdateMessage.innerHTML = 'You must be 13 years old to sign up';
            birthdateMessage.style.display = 'block';
        }
        else {
            birthdateMessage.style.display = 'none';
        }
        return valid;
    }
}

