/* Imports */
const app = require('electron');
const settingsStorage = new(require('electron-store'));
const Mousetrap = require('mousetrap');
const runningInDevMode = require('electron-is-dev');

/* Application defaults */
const application_defaults_appName = "Školský informačný systém";
const application_defaults_appIcon = "../assets/app.png";
const application_defaults_appVersionString = "Verzia aplikácie";

/* Application version */
var application_internals_version = app.getVersion();

/* Stored settings */
var application_storedSettings_schoolName = settingsStorage.get('schoolName');
var application_storedSettings_schoolLogo = settingsStorage.get('schoolLogoFileName'); // TODO: Store entire filename
var application_storedSettings_web_EdupageServer = settingsStorage.get('edupageServerAddress');
var application_storedSettings_web_aPages1 = settingsStorage.get('aPages1');
var application_storedSettings_web_aPages2 = settingsStorage.get('aPages2');
var application_storedSettings_web_aPages3 = settingsStorage.get('aPages3');
var application_storedSettings_web_allPages_interval = settingsStorage.get('allPagesInterval');
var application_storedSettings_app_applicationPwd = settingsStorage.get('appPwd');
var application_storedSettings_app_autoThemingState = settingsStorage.get('autoThemingState');

/* UI elements */
application_settingsUI_text_appVersion = document.getElementById('application__overview__text_appVersion');
application_settingsUI_input_schoolName = document.getElementById('application__content__input_schoolName');
application_settingsUI_input_schoolLogoLocal = document.getElementById('application__content__input_schoolLogoLocal');
application_settingsUI_input_schoolLogoRemote = document.getElementById('application__content__input_schoolLogoRemote');
application_settingsUI_input_edupageServer = document.getElementById('application__content__input_edupageServer');
application_settingsUI_input_additionalPages1 = document.getElementById('application__content__input_additionalPages1');
application_settingsUI_input_additionalPages2 = document.getElementById('application__content__input_additionalPages2');
application_settingsUI_input_additionalPages3 = document.getElementById('application__content__input_additionalPages3');
application_settingsUI_input_pageInterval = document.getElementById('application__content__input_webpageInterval');
application_settingsUI_switch_autoThemingState = document.getElementById('application__content_switch_autoThemingState');
application_settingsUI_input_appPwd1 = document.getElementById('application__content__input_appPwd1');
application_settingsUI_input_appPwd2 = document.getElementById('application__content__input_appPwd2');
application_settingsUI_button_resetSettings = document.getElementById('application__content__button_resetSettings');
application_settingsUI_button_saveSettings = document.getElementById('application__content__button_saveSettings');

/*
    Function: populatePlaceholdersFromSettings()
    ============================================
    Gets all stored settings from settingsStorage and sets them as placeholders
    or changes state of buttons/switches if any are stored.
*/
function populatePlaceholdersFromSettings() {
    switch (true) {
        case (application_storedSettings_schoolName !== undefined || null):
            application_settingsUI_input_schoolName.placeholder = '✔ ' + application_storedSettings_schoolName;
        case (application_storedSettings_web_EdupageServer !== undefined || null):
            application_settingsUI_input_edupageServer.placeholder = '✔ ' + application_storedSettings_web_EdupageServer;
        case (application_storedSettings_web_aPages1 !== undefined || null):
            application_settingsUI_input_additionalPages1.placeholder = '✔ ' + application_storedSettings_web_aPages1;
        case (application_storedSettings_web_aPages2 !== undefined || null):
            application_settingsUI_input_additionalPages2.placeholder = '✔ ' + application_storedSettings_web_aPages2;
        case (application_storedSettings_web_aPages3 !== undefined || null):
            application_settingsUI_input_additionalPages3.placeholder = '✔ ' + application_storedSettings_web_aPages3;
        default:
            break;
    }
}