const {
    app,
    BrowserWindow,
} = require('electron');
const runningInDevMode = require('electron-is-dev');
const settingsStorage = new(require('electron-store'))

let win

var application_storedSettings_app_motdInTitle = settingsStorage.get('motdInTitle')
/* Message of the day strings */
var application_mothInTitle_Strings = [
    '(mv ttomovcik > /dev/null)',
    '(No unicorns were hurt during development)',
    '(Insert fancy tagline here)',
    '(Vodka distilled from milk)',
    '(People who sit on the front row at the cinema technically get to see the movie first)',
    '(s̮̪͚̯̺̎e̩͎͎͚͈̩n̙͎̫͑ͩ̍͑d̳̘͔̘ͦ̇ͧ ͎̭̟͎͂͐͋̔͌̆̚n̫͈̖̪̬̈́ͤ͆̓u̱̯̳̺̮͍̫̔͛ͦ͒̄̑d͇͈̦̬͇̼̹̓͊̋̓̅ͭ̚e͖̪̰͈͂̈̇̒͊̾́s̤̪͓̰̭̉ͣ͛̚ͅ)',
    '(ｈａｖｅ　ａ　ｎｉｃｅ　ｄａｙ　ヺ唄円日)'
]
var application_mothInTitle_Strings_selected = Math.floor(Math.random() * application_mothInTitle_Strings.length);

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: false,
        title: 'Školský informačný systém',
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    })
    if (runningInDevMode) {
        win.webContents.openDevTools();
    }
     // easterEggs/motdInTitle
     if (application_storedSettings_app_motdInTitle == 'yep') {
        win.setTitle(application_mothInTitle_Strings[application_mothInTitle_Strings_selected])
    }
    win.loadURL('file://' + __dirname + '/App.html')
    win.on('closed', () => {
        win = null
        app.quit();
    })
    win.setResizable(true);
    win.maximize();
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})