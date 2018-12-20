const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const runningInDevMode = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

var $ = require('jquery');
var Mousetrap = require('mousetrap');

var navbar_application_title = document.getElementById('navbar_application_title');
var overlay = document.getElementById('overlay');
var loadStatusText = document.getElementById('loadStatus_text');
var dateTime = document.getElementById('dateTime');
var classNumber = document.getElementById('classNumber');
var snowflakes = document.getElementById('snowflakes');
var storedValue_schoolName = store.get('schoolName');

var fa_covfefe = '<i class="fas fa-coffee"></i><br>';
var fa_smoking = '<i class="fas fa-smoking"></i><br>';
var fa_chalkboard_teacher = '<i class="fas fa-chalkboard-teacher"></i><br>';
var fa_utensils = '<i class="fas fa-utensils"></i><br>';
var fa_cookie_bite = '<i class="fas fa-utensils"></i><br>';
var fa_arrow_right = '<br><i class="fas fa-arrow-right"></i> '

setTimeout(function () {
    applicationInit();
}, 3000);

function getCurrentDateTime() {
    var date = new Date();
    var day = date.getDate();
    var month = (date.getMonth() + 1);
    var year = date.getFullYear();
    var hour = checkTime(date.getHours());
    var minute = checkTime(date.getMinutes());
    var second = checkTime(date.getSeconds());
    return [day, month, year, hour, minute, second];
}

function applicationInit() {
    loadStatusText.innerHTML = "Startup (1/5)";
    setTimeout(getCurrentDateTime, 500);
    setTimeout(showDateTime, 500);
    setTimeout(showClassStateNumber, 30000);

    loadStatusText.innerHTML = "Startup (2/5)";
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
        settingsWindow.loadURL('file://' + __dirname + '/Settings.html');
        settingsWindow.show();
        if (runningInDevMode) {
            settingsWindow.webContents.openDevTools();
        }
    });

    loadStatusText.innerHTML = "Startup (3/5)";
    Mousetrap.bind('?', function () {
        electron.shell.openExternal('https://www.github.com/ttomovcik/school-information-system/wiki')
    });

    loadStatusText.innerHTML = "Startup (4/5)";
    if (storedValue_schoolName == '*' || storedValue_schoolName == '') {
        navbar_application_title.innerHTML = 'Školský informačný systém';
    } else {
        navbar_application_title.innerHTML = storedValue_schoolName;
    }

    loadStatusText.innerHTML = "Startup (5/5)";
    if (store.get('toggleAutoTheming') === 'enabled') {
        if (getCurrentDateTime()[1] == '12') {
            snowflakes.style.display = 'block';
        }
    }

    showDateTime();
    setTimeout(function () {
        overlay.style.display = 'none';
        $('#wrapper').removeClass('blur');
    }, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

function showDateTime() {
    setInterval(function () {
        dateTime.innerHTML = getCurrentDateTime()[0] + '.' +
            getCurrentDateTime()[1] + '.' +
            getCurrentDateTime()[2] + ' ' +
            getCurrentDateTime()[3] + ':' +
            getCurrentDateTime()[4] + ':' +
            getCurrentDateTime()[5]
    }, 500)
}

function showClassStateNumber() {
    var currentHour = getCurrentDateTime()[3];
    var currentMinute = getCurrentDateTime()[4];
    var currentHourMinutes = currentHour + currentMinute;
    console.log(currentHourMinutes);
    switch (true) {
        case (currentHourMinutes < 0700):
            classNumber.innerHTML = fa_covfefe + ' ' + 'Dobré ráno';
            break;
        case (currentHourMinutes < 0745):
            classNumber.innerHTML = fa_chalkboard_teacher + ' ' + '0. hodina';
            break;
        case (currentHourMinutes < 0750):
            classNumber.innerHTML = fa_smoking + ' ' + '5-minútová prestávka' + fa_arrow_right + '1. hodina';
            break;
        case (currentHourMinutes < 0835):
            classNumber.innerHTML = fa_chalkboard_teacher + ' ' + '1. hodina';
            break;
        case (currentHourMinutes < 0840):
            classNumber.innerHTML = fa_smoking + ' ' + '5-minútová prestávka > 2. hodina';
            break;
        case (currentHourMinutes < 0925):
            classNumber.innerHTML = fa_chalkboard_teacher + ' ' + '2. hodina';
            break;
        case (currentHourMinutes < 0935):
            classNumber.innerHTML = fa_cookie_bite + ' ' + '10-minútová prestávka > 3. hodina';
            break;
        case (currentHourMinutes < 1020):
            classNumber.innerHTML = fa_chalkboard_teacher + ' ' + '3. hodina';
            break;
        case (currentHourMinutes < 1030):
            classNumber.innerHTML = fa_cookie_bite + ' ' + '10-minútová prestávka' + '<br>' + '> 3. hodina';
            break;
        case (currentHourMinutes < 1115):
            // 4. hodina
            break;
        case (currentHourMinutes < 1120):
            // Prestávka po 4 hodine, 5 minút
            break;
        case (currentHourMinutes < 1205):
            // 5. hodina
            break;
        case (currentHourMinutes < 1240):
            // Veľká prestávka
            break;
        case (currentHourMinutes < 1325):
            // 6. hodina
            break;
        case (currentHourMinutes < 1330):
            // prestávka po 6. hodine, 5 minút
            break;
        case (currentHourMinutes < 1415):
            console.log('A ven, koniec vyučovania');
            break;
        default:
            console.log('A ven, koniec vyučovania');
    }
}