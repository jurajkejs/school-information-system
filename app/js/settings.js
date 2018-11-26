// TODO: Pridať overenie nastavení až sa neprepíšu pôvodné,
// už uložené nastavenia s 'undefined' alebo 'null'

const Store = require('electron-store');
const store = new Store();

var schoolName = document.getElementById("input_school_name");
var edupageServerAddress = document.getElementById("input_edupage_server");
var additionalWebPages = document.getElementById("input_additional_pages");
var applicationPassowrd1 = document.getElementById("application_password1");
var applicationPassowrd2 = document.getElementById("application_password2");
var successAlert = document.getElementById("successAlert");

function saveSettings() {
    // School name
    console.log("[Settings::Store] Saving: schoolName");
    store.set('schoolName', schoolName.value);
    // Edupage server
    console.log("[Settings::Store] Saving: edupageServerAddress");
    store.set('edupageServerAddress', edupageServerAddress.value);
    // Additional pages
    console.log("[Settings::Store] Saving: additionalWebPages");
    store.set('additionalWebPages', additionalWebPages.value);
    // Application passowrd
    console.log("[Settings::Store] Saving: applicationPassword");
    storePassword();
    // Finishing up...
    if (successAlert.style.display === "none") {
        successAlert.style.display = "block";
    } else {
        successAlert.style.display = "none";
    }
}

function storePassword() {
    if (applicationPassowrd1 === applicationPassowrd2) {
        store.set('applicationPassowrd', applicationPassowrd2.value);
    }
    else{
        console.log("[Settings::Store] ERR: Failed to save applicationPassowrd. Reverting to default ('admin')");
        store.set('applicationPassowrd', 'admin');
    }
}