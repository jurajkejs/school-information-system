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

if (storedValue_schoolName !== '*' || storedValue_schoolName !== 'undefined') {
    navbar_application_title.innerHTML = storedValue_schoolName;
}

if (store.get('toggleAutoTheming') === 'enabled') {
    if (month == '12') {
        snowflakes.style.display = 'block';
    }
}

Mousetrap.bind(['command+n', 'ctrl+n'], function () {
    let settingsWindow
    settingsWindow = new BrowserWindow({
        width: 1024,
        height: 768,
    })
    settingsWindow.on('close', function () {
        settingsWindow = null
    })
    settingsWindow.loadURL('file://' + __dirname + '/src/html/settings.html')
    settingsWindow.show();
    if (runningInDevMode) {
        settingsWindow.webContents.openDevTools();
    }
});

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

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}