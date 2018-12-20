const Store = require('electron-store');
const store = new Store();

var $ = jQuery = require('jquery');
var Mousetrap = require('mousetrap');
var form__schoolName = document.getElementById('form__school-name');
var form__schoolLogoFileName = document.getElementById('form__school-logo-filename');
var form__edupageServer = document.getElementById('form__edupage-server');
var stored__schoolName = store.get('schoolName');
var stored__schoolLogoFileName = store.get('schoolLogoFileName');
var stored__edupageServerAddress = store.get('edupageServerAddress');
var stored__toggleAutoTheming = store.get('toggleAutoTheming');

// Bind CTRL+E (or command+e) for easter egg
Mousetrap.bind(['command+e', 'ctrl+e'], function () {
    var mlpURL = 'https://mylittlepony.hasbro.com/worldwide' // Come get some!
    if (store.get('motdInTitle') == 'yep') {
        console.log('enableMotdInTitle() => Disabling motdInTitle');
        store.set('motdInTitle', 'nope');
    } else {
        console.log('enableMotdInTitle() => Enabling motdInTitle');
        store.set('motdInTitle', 'yep');
    }
    require('electron').shell.openExternal(mlpURL)
});

// saveSettings() => schoolName
$(form__schoolName).on('focusout', function() {
    if (stored__schoolName == '*') {
        console.log('saveSettings() => Skipping: schoolName')
    } else {
        console.log('saveSettings() => Saving: schoolName')
        store.set('schoolName', form__schoolName.value);
    }
});

// saveSettings() => schoolLogoFilename
$(form__schoolLogoFileName).change(function () {
    if (form__schoolLogoFileName.value == '' || stored__schoolLogoFileName == '*') {
        console.log('saveSettings() => Skipping schoolLogoFilename')
    } else {
        console.log('saveSettings() => Saving: schoolLogoFileName')
        store.set('schoolLogoFileName',form__schoolLogoFileName.files[0].path);
    }
});

// saveSettings() => edupageServerAddress
$(form__edupageServer).on('focusout', function() {
    if (form__edupageServer.value == '' || stored__edupageServerAddress == '*') {
        console.log('saveSettings() => Skipping: edupageServerAddress')
    } else {
        console.log('saveSettings() => Saving: edupageServerAddress')
        store.set('edupageServerAddress', form__edupageServer.value)
    }
});

// toggleAutoTheming() => toggleAutoTheming
// Dec: christmas shit
// Apr: UNICRORNS!
function toggleAutoTheming() {
    if (stored__toggleAutoTheming == 'enabled') {
        console.log('toggleAutoTheming() => Disabling autoTheming');
        store.set('toggleAutoTheming', 'disabled');
    } else {
        console.log('toggleAutoTheming() => Enabling autoTheming');
        store.set('toggleAutoTheming', 'enabled');
    }
}

function resetSettings() {
    console.log('resetSettings() => Restoring to default value: schoolName');
    store.set('schoolName', '');
    console.log('resetSettings() => Restoring to default value: edupageServerAddress');
    store.set('edupageServerAddress', '');
    console.log('resetSettings() => Restoring to default value: additionalWebPages');
    store.set('additional_webpages_1', '');
    store.set('additional_webpages_2', '');
    store.set('additional_webpages_3', '');
    console.log('resetSettings() => Restoring to default value: motdInTitle');
    store.set('motdInTitle', 'nope');
    console.log('resetSettings() => Restoring to default value: autoTheming');
    store.set('toggleAutoTheming', 'disabled')
}