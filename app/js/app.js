const runningInDevMode = require('electron-is-dev');

var debugMessageCard = document.getElementById('debugMessageCard');

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
    document.getElementById('dateTime').innerHTML =
        day + "." + month + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM::SS
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

if (runningInDevMode) {
    console.log('[App::Debug] Wake up, Neo...');
    console.log('[App::Debug] Running in dev mode');
    if (debugMessageCard.style.display === 'none') {
        debugMessageCard.style.display = 'block';
    } else {
        debugMessageCard.style.display = 'none';
    }
} else {
    console.log('[App::Prod] No more easter eggs :(');
}