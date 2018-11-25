const Store = require('electron-store');
const store = new Store();

var schoolName = document.getElementById("input_school_name");
var edupageServerAddress = document.getElementById("input_edupage_server");
var additionalWebPages = document.getElementById("input_additional_pages");
var applicationPassowrd1 = document.getElementById("application_password1");
var applicationPassowrd2 = document.getElementById("application_password2");

function saveSettings() {
    console.log("[DEBUG] Retrieving value from input:",schoolName.value);
    console.log("[DEBUG] Storing '"+schoolName.value+"' using 'electron-store'");
    store.set('schoolName', schoolName.value);
    console.log("[DEBUG] Expecting '"+schoolName.value+"' to be returned from 'electron-store.get'");
    console.log("[DEBUG] electron-store returned: "+store.get('schoolName'));
}