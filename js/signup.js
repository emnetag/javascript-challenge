/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/


document.addEventListener('DOMContentLoaded', function() {
    var idx;
    var stateListElem = document.getElementById('state');
    var stateOption;
    var stateObject;
    var occupationOther = document.getElementById('occupationOther');
    var cancelButton = document.getElementById('cancelButton');

    for (idx = 0; idx < usStates.length; ++idx) {
        stateObject = usStates[idx];
        stateOption = document.createElement('option');
        stateOption.innerHTML = stateObject["name"];
        stateOption.value = stateObject["code"];
        stateListElem.appendChild(stateOption);
    }

    var occupationSelect = document.getElementById('occupation');
    occupationSelect.addEventListener('change', function() {
        if (occupationSelect.value == 'other') {
            occupationOther.style.display = "inline";
        } else {
            occupationOther.style.display = "none";
        }
    });

    cancelButton.addEventListener('click', function () {
        if (window.confirm("Are you sure you want to leave?")) {
            window.location.href = "http://google.com";
        }
    });
});


