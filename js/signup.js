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

    function onSubmit() {
        try {
            evt.returnValue = validateForm(this);
        }
        catch(error) {
            console.log(error);
        }
        if (!evt.returnValue && evt.preventDefault) {
            evt.preventDefault();
        }
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
        } else if (field.name == 'birthday') {
            var dateValue = new Date(value);
            valid = moment().diff(dateValue, 'years') >= 13;
        } else {
            valid = value.length > 0;
        }

        if (!valid) {
            if (field.name == 'birthdate') {
                var birthdateMessage = document.getElementById('birthdateMessage');
                birthdateMessage.innerHTML = 'You must be 13 years or older to sign up';
            }
            field.className = 'form-control invalid';
        }
        else {
            field.className = 'form-control';
        }
        return valid;
    }
}

