const Store = require('electron-store');
const store = new Store();

var $ = jQuery = require('jquery');
var overviewCard_schoolName = document.getElementById('overviewCard_schoolName');
var overviewCard_edupageServer = document.getElementById('overviewCard_edupageServer');
var overviewCard_additionalPages = document.getElementById('overviewCard_additionalPages');
var overviewCard_autoTheming = document.getElementById('overviewCard_autoTheming');
var overviewCard_passwordState = document.getElementById('overviewCard_passwordState');
var schoolName = document.getElementById('input_school_name');
var edupageServerAddress = document.getElementById('input_edupage_server');
var additionalWebPages = document.getElementById('input_additional_pages');
var applicationPassowrd1 = document.getElementById('application_password1');
var applicationPassowrd2 = document.getElementById('application_password2');
var successAlert = document.getElementById('successAlert');
var loadSpinner_card_schoolName = document.getElementById('loadSpinner_card_schoolName');
var loadSpinner_card_edupageServerAddress = document.getElementById('loadSpinner_card_edupageServerAddress');
var loadSpinner_card_additionalPages = document.getElementById('loadSpinner_card_additionalPages');
var loadSpinner_card_autoTheming = document.getElementById('loadSpinner_card_autoTheming');
var loadSpinner_card_password = document.getElementById('loadSpinner_card_password');
var storedValue_schoolName = store.get('schoolName');
var storedValue_edupageServer = store.get('edupageServerAddress');
var storedValue_additionalWebPages = store.get('additionalWebPages');
var storedValue_toggleAutoTheming = store.get('toggleAutoTheming');
var storedValue_applicationPassword = store.get('applicationPassowrd');
var settingsForms = [schoolName, edupageServerAddress, additionalWebPages]

if (settingsForms.indexOf(settingsForms.length) == 'undefined') {
    $(schoolName).attr('placeholder', store.get('schoolName'));
    $(edupageServerAddress).attr('placeholder', store.get('edupageServerAddress'));
    $(additionalWebPages).attr('placeholder', store.get('additionalWebPages'));

} else {
    $(schoolName).attr('placeholder', 'Nazov školy');
    $(edupageServerAddress).attr('placeholder', 'https://www.skola.edupage.org');
    $(additionalWebPages).attr('placeholder', 'https://www.4chan.org, https://www.ayy-lmao.com');
}

if (storedValue_schoolName == '*' || storedValue_schoolName == ' ') {
    overviewCard_schoolName.innerHTML = 'Názov školy nie je nastavený'
    $(loadSpinner_card_schoolName).remove();
} else {
    overviewCard_schoolName.innerHTML = storedValue_schoolName;
    $(loadSpinner_card_schoolName).remove();
}
if (storedValue_edupageServer == '*' || storedValue_edupageServer == ' ') {
    overviewCard_edupageServer.innerHTML = 'Edupage server nie je nastavený'
    $(loadSpinner_card_edupageServerAddress).remove();
} else {
    overviewCard_edupageServer.innerHTML = storedValue_edupageServer;
    $(loadSpinner_card_edupageServerAddress).remove();
}
if (storedValue_additionalWebPages == '*' || storedValue_additionalWebPages ==' ') {
    overviewCard_additionalPages.innerHTML = 'Dodatočné stránky nie sú nastavené';
    $(loadSpinner_card_additionalPages).remove();
} else {
    overviewCard_additionalPages.innerHTML = 'Dodatočné stránky sú nastavené'
    $(loadSpinner_card_additionalPages).remove();
}
if (storedValue_toggleAutoTheming == 'enabled' || storedValue_toggleAutoTheming !==' ') {
    overviewCard_autoTheming.innerHTML = 'Automatická zmena témy je povolená';
    $(loadSpinner_card_autoTheming).remove();
} else {
    overviewCard_autoTheming.innerHTML = 'Automatická zmena témy je zakázaná';
    $(loadSpinner_card_autoTheming).remove();
}
if (storedValue_applicationPassword == '*' || storedValue_applicationPassword ==' ') {
    overviewCard_passwordState.innerHTML = 'Heslo je nastavené';
    $(loadSpinner_card_password).remove();
} else {
    overviewCard_passwordState.innerHTML = 'Heslo nie je nastavené'
    $(loadSpinner_card_password).remove();
}


function saveSettings() {
    if (schoolName.value == '' || storedValue_schoolName == '*') {
        console.log('saveSettings() => Skipping: schoolName')
    } else {
        console.log('saveSettings() => Saving: schoolName')
        store.set('schoolName', schoolName.value);
    }
    if (edupageServerAddress.value == '' || storedValue_edupageServer == '*') {
        console.log('saveSettings() => Skipping: edupageServerAddress')
    } else {
        console.log('saveSettings() => Saving: edupageServerAddress')
        store.set('edupageServerAddress', edupageServerAddress.value);
    }
    if (additionalWebPages.value == '' || storedValue_additionalWebPages == '*') {
        console.log('saveSettings() => Skipping: additionalWebPages')
    } else {
        console.log('saveSettings() => Saving: schoolName')
        store.set('additionalWebPages', additionalWebPages.value);
    }
    if (applicationPassowrd1.value === applicationPassowrd2.value) {
        if (applicationPassowrd2.value == '' || (storedValue_applicationPassword == '*')) {
            console.log('saveSettings() => Skipping: applicationPassowrd')
        } else {
            console.log('saveSettings() => Saving: applicationPassowrd')
            store.set('applicationPassowrd', applicationPassowrd2.value);
        }
    } else {
        console.log('saveSettings() => Skipping due to mismatch: applicationPassowrd')
    }
    if (successAlert.style.display === 'none') {
        successAlert.style.display = 'block';
    } else {
        successAlert.style.display = 'none';
    }
    console.log(` __________________________________________
< We are done here. Restart the app human. >
 ------------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace")
}

function enableMotdInTitle() {
    var mlpURL = 'https://mylittlepony.hasbro.com/worldwide' // Come get some!
    if (store.get('motdInTitle') == 'yep') {
        console.log('enableMotdInTitle() => Disabling motdInTitle');
        store.set('motdInTitle', 'nope');
    } else {
        console.log('enableMotdInTitle() => Enabling motdInTitle');
        store.set('motdInTitle', 'yep');
    }
    require('electron').shell.openExternal(mlpURL)
}

function resetSettings() {
    console.log('resetSettings() => Restoring to default value: schoolName');
    store.set('schoolName', '');
    console.log('resetSettings() => Restoring to default value: edupageServerAddress');
    store.set('edupageServerAddress', '');
    console.log('resetSettings() => Restoring to default value: additionalWebPages');
    store.set('additionalWebPages', '');
    console.log('resetSettings() => Restoring to default value: applicationPassowrd');
    store.set('applicationPassowrd', '');
    console.log('resetSettings() => Restoring to default value: motdInTitle');
    store.set('motdInTitle', 'nope');
    console.log('resetSettings() => Restoring to default value: autoTheming');
    store.set('toggleAutoTheming', 'disabled')
}

function toggleAutoTheming() {
    if (storedValue_toggleAutoTheming == 'enabled') {
        console.log('toggleAutoTheming() => Disabling autoTheming');
        store.set('toggleAutoTheming', 'disabled');
    } else {
        console.log('toggleAutoTheming() => Enabling autoTheming');
        store.set('toggleAutoTheming', 'enabled');
    }
}