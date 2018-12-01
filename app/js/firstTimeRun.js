var firstRun = require('first-run');

const Store = require('electron-store');
const store = new Store();

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