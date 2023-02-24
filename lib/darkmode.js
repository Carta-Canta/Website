'use strict';

var body = document.querySelector('body');
var toggle = document.getElementById('toggle');

toggle.addEventListener("click", function () {
    var bodyCheck = body.classList.contains('dark');
    if (bodyCheck) {
        body.className = '';
    } else {
        body.className = "dark";
    }
});