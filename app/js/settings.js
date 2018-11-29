const Store = require('electron-store');
const store = new Store();
const app = require('electron');

var schoolName = document.getElementById('input_school_name');
var edupageServerAddress = document.getElementById('input_edupage_server');
var additionalWebPages = document.getElementById('input_additional_pages');
var applicationPassowrd1 = document.getElementById('application_password1');
var applicationPassowrd2 = document.getElementById('application_password2');
var successAlert = document.getElementById('successAlert');

function saveSettings() {
    if (schoolName.value === '' || (store.get('schoolName') === '*')) {
        console.log('[Settings::Store] Skipping: schoolName');
    } else {
        console.log('[Settings::Store] Saving: "schoolName" with value: ' + schoolName.value);
        store.set('schoolName', schoolName.value);
    }
    if (edupageServerAddress.value === '' || (store.get('edupageServerAddress') === '*')) {
        console.log('[Settings::Store] Skipping: edupageServerAddress');
    } else {
        console.log('[Settings::Store] Saving: "edupageServerAddress" with value: ' + edupageServerAddress.value);
        store.set('edupageServerAddress', edupageServerAddress.value);
    }
    if (additionalWebPages.value === '' || (store.get('additionalWebPages') === '*')) {
        console.log('[Settings::Store] Skipping: additionalWebPages');
    } else {
        console.log('[Settings::Store] Saving: "additionalWebPages" with value: ' + additionalWebPages.value);
        store.set('additionalWebPages', additionalWebPages.value);
    }
    if (applicationPassowrd1.value === applicationPassowrd2.value) {
        if (applicationPassowrd2.value === '' || (store.get('applicationPassowrd') === '*')) {
            console.log('[Settings::Store] Skipping: applicationPassowrd');
        } else {
            console.log('[Settings::Store] Saving: "applicationPassowrd"');
            store.set('applicationPassowrd', applicationPassowrd2.value);
        }
    } else {
        console.log('[Settings::Store] Skipping/PwdMismatch: applicationPassowrd');
    }
    console.log(`%c __________________________________________
< We are done here. Restart the app human. >
 ------------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace")
    if (successAlert.style.display === 'none') {
        successAlert.style.display = 'block';
    } else {
        successAlert.style.display = 'none';
    }
}

function restartAppNow() {
    // WHY THE FUCK ISN'T THIS WORKING???!!1
    // TODO: Opraviť.
    const {
        app
    } = require('electron');
    app.relaunch();
    app.exit(0);
}

function noJustDoNotDoIt() {
    console.log('[Settings::Store/EasterEggs] Enabling motd in title');
    if (store.get('motdInTitle') === 'yep') {
        store.set('motdInTitle', 'nope');
    } else {
        store.set('motdInTitle', 'yep');
    }
}