const Store = require('electron-store');
const store = new Store();
const app = require('electron');

var $ = jQuery = require('jquery');

var schoolName = document.getElementById('input_school_name');
var edupageServerAddress = document.getElementById('input_edupage_server');
var additionalWebPages = document.getElementById('input_additional_pages');
var applicationPassowrd1 = document.getElementById('application_password1');
var applicationPassowrd2 = document.getElementById('application_password2');
var successAlert = document.getElementById('successAlert');

var settingsForms = [schoolName, edupageServerAddress, additionalWebPages]

if (settingsForms.indexOf(settingsForms.length) !== 'undefined') {
    $(schoolName).attr('placeholder', store.get('schoolName'));
    $(edupageServerAddress).attr('placeholder', store.get('edupageServerAddress'));
    $(additionalWebPages).attr('placeholder', store.get('additionalWebPages'));
}

function saveSettings() {
    if (schoolName.value === '' || (store.get('schoolName') === '*')) {
        console.log('[Settings::Renderer] storeSettings: Skipping: schoolName');
    } else {
        console.log('[Settings::Renderer] storeSettings: Saving: "schoolName" with value: ' + schoolName.value);
        store.set('schoolName', schoolName.value);
    }
    if (edupageServerAddress.value === '' || (store.get('edupageServerAddress') === '*')) {
        console.log('[Settings::Renderer] storeSettings: Skipping: edupageServerAddress');
    } else {
        console.log('[Settings::Renderer] storeSettings: Saving: "edupageServerAddress" with value: ' + edupageServerAddress.value);
        store.set('edupageServerAddress', edupageServerAddress.value);
    }
    if (additionalWebPages.value === '' || (store.get('additionalWebPages') === '*')) {
        console.log('[Settings::Renderer] storeSettings: Skipping: additionalWebPages');
    } else {
        console.log('[Settings::Renderer] storeSettings: Saving: "additionalWebPages" with value: ' + additionalWebPages.value);
        store.set('additionalWebPages', additionalWebPages.value);
    }
    if (applicationPassowrd1.value === applicationPassowrd2.value) {
        if (applicationPassowrd2.value === '' || (store.get('applicationPassowrd') === '*')) {
            console.log('[Settings::Renderer] storeSettings: Skipping: applicationPassowrd');
        } else {
            console.log('[Settings::Renderer] storeSettings: Saving: "applicationPassowrd"');
            store.set('applicationPassowrd', applicationPassowrd2.value);
        }
    } else {
        console.log('[Settings::Renderer] storeSettings: Skipping/PwdMismatch: applicationPassowrd');
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
    var mlpURL = 'https://mylittlepony.hasbro.com/worldwide' // Come get some!
    if (store.get('motdInTitle') === 'yep') {
        store.set('motdInTitle', 'nope');
        console.log('[Settings::Store/EasterEggs] Disabling motd in title');
    } else {
        store.set('motdInTitle', 'yep');
        console.log('[Settings::Store/EasterEggs] Enabling motd in title');
    }
    require('electron').shell.openExternal(mlpURL)
}

function resetSettings() {
    console.log('[Settings::Renderer] appReset: Requested app reset!');
    console.log('[Settings::Renderer] appReset: Resetting: schoolName');
    store.set('schoolName', '');
    console.log('[Settings::Renderer] appReset: Resetting: edupageServerAddress');
    store.set('edupageServerAddress', '');
    console.log('[Settings::Renderer] appReset: Resetting: additionalWebPages');
    store.set('additionalWebPages', '');
    console.log('[Settings::Renderer] appReset: Resetting: applicationPassword');
    store.set('applicationPassowrd', '');
    console.log('[Settings::Renderer] appReset: Resetting: App::EasterEggs/motdInTitle');
    store.set('motdInTitle', 'nope');
    console.log('[Settings::Renderer] appReset: Resetting: ftrState');
    store.set('ftrState', 'true')
    console.log('[Settings::Renderer] appReset: Done!');
}

function toggleAutoTheming() {
    if (store.get('toggleAutoTheming') === 'enabled') {
        store.set('toggleAutoTheming', 'disabled');
        console.log('[Settings::Store/AutoTheming] Disabling AutoTheming');
    } else {
        store.set('toggleAutoTheming', 'enabled');
        console.log('[Settings::Store/AutoTheming] Enabling AutoTheming');
    }
}