const runningInDevMode = require('electron-is-dev');
const Store = require('electron-store');
const store = new Store();

// var firstRun = require('first-run');
var debugMessageCard = document.getElementById('debugMessageCard');

startTime();

// Check if running in dev mode
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

/*
// First time run - if yes, show pop-up telling that app needs to be configured
if (firstRun === 'true') {
    console.log('[App::FirstTimeRun] Clearing app settings. Just to be sure')
    store.set('schoolName','');
    store.set('edupageServerAddress','');
    store.set('additionalWebPages','');
    store.set('applicationPassowrd','');
    firstRun.clear();
    console.log('[App::FirstTimeRun] Running for the first time. Showing fTR modal.')
    $('#firstTimeRunModal').modal('show')
} else {
    console.log('[App::FirstTimeRun] No need to show fTR modal. Skipping')
}
// Toto narobilo viac škody než úžitku. You stay in your comment block fella
*/

// Shows date and time in main UI
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

// Add '0' in numbers <10
function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    };
    return i;
}