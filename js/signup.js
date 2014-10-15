/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signup');
    var stateSelect = signupForm['state'];
    var occupationSelect = signupForm['occupation'];

    var occupationOther = document.getElementById('occupationOther');
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
});


