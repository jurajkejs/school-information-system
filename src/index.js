const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const runningInDevMode = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

var $ = require('jquery');
var date = new Date();
var month = (date.getMonth() + 1);
var Mousetrap = require('mousetrap');
var navbar_application_title = document.getElementById('navbar_application_title');
var snowflakes = document.getElementById('snowflakes');
var storedValue_schoolName = store.get('schoolName');
var storedValue_appIcon = store.get('schoolLogoPath');
var appIcon = document.getElementById('app_icon');
var app_icon_template_p1 = '<img src="';
var app_icon_template_p2 = ' width="30" height="30" class="d-inline-block align-top" alt="">';

// Set school name if user already saved one
if (storedValue_schoolName == '*' || storedValue_schoolName == '') {
    navbar_application_title.innerHTML = 'Školský informačný systém';
} else {
    navbar_application_title.innerHTML = storedValue_schoolName;
}

// Do the same thing we did with title, but now with logo
if (storedValue_appIcon == '*' || storedValue_appIcon == '') {
    $(appIcon).replaceWith(app_icon_template_p1 + storedValue_appIcon + app_icon_template_p2);
}

setInterval(function () {
    startTime();
}, 5000);

// Add snowflakes, custom colors, etc... if autoTheming is enabled
if (store.get('toggleAutoTheming') === 'enabled') {
    if (month == '12') {
        snowflakes.style.display = 'block';
    }
}

// Set shortcut to CTRL+N to open settings.
Mousetrap.bind(['command+n', 'ctrl+n'], function () {
    let settingsWindow;
    settingsWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    settingsWindow.on('close', function () {
        settingsWindow = null
    });
    settingsWindow.setMenuBarVisibility(false);
    settingsWindow.loadURL('file://' + __dirname + '/src/html/settings.html');
    settingsWindow.show();
    if (runningInDevMode) {
        settingsWindow.webContents.openDevTools();
    }
});

// Show wiki page after pressing '?'
Mousetrap.bind('?', function () {
    electron.shell.openExternal('https://www.github.com/ttomovcik/school-information-system/wiki')
});

// Show date and time in main UI
function startTime() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    // Pri month treba nechať '+1' nech neukazuje jeden mesiac späť. 
    document.getElementById('dateTime').innerHTML =
        day + "." + (month + 1) + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM::SS
    var t = setTimeout(startTime, 500);
}

// If mounth, hour or second is <10, add 0 before.
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}