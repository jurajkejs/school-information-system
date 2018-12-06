const runningInDevMode = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

var debugMessageCard = document.getElementById('debugMessageCard');
var ftrState = store.get('ftrState');

console.log('[App::Renderer/Info] Wake up, Neo...');

// Shows date and time in main UI, startTime() will be called once page loads
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
        day + "." + (month+1) + "." + year + " " + h + ":" + m + ":" + s; // DD.MM.YYYY HH:MM::SS
    var t = setTimeout(startTime, 500);
}

// Add '0' in numbers <10
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}

if (runningInDevMode) {
    console.log('[App::Renderer/Info] Running in dev mode');
    if (debugMessageCard.style.display === 'none') {
        debugMessageCard.style.display = 'block';
    } else {
        debugMessageCard.style.display = 'none';
    }
} else {
    console.log('[App::Renderer/Info] Running in prod mode');
}

if (ftrState === 'undefined' || ftrState === 'true') {
    console.log('[App::Renderer/Info] Mashed potatoes');
} else {
    console.log('[App::Renderer/Info] Skipping #ftrModal.');
}