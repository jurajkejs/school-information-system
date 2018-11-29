const {
    app,
    BrowserWindow,
    Menu,
} = require('electron');
const Store = require('electron-store');
const store = new Store();
const runningInDevMode = require('electron-is-dev');

let win

const menuTemplate = [{
        label: 'Súbor',
        submenu: [{
                label: 'Nastavenia',
                click() {
                    let settingsWindow = new BrowserWindow({
                        width: 1024,
                        height: 768,
                    })
                    settingsWindow.on('close', function () {
                        settingsWindow = null
                    })
                    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html')
                    settingsWindow.show();
                    if (runningInDevMode) {
                        settingsWindow.webContents.openDevTools();
                    } else {
                        console.log('[App::Prod] Disabling devTools');
                    }
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        label: 'Zobrazenie',
        submenu: [{
                label: 'Aktualizovať obsah',
                click() {
                    console.log('[MainUI::callFromMainScript] Refreshing webview')
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'reload'
            },
            {
                role: 'forcereload'
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'help',
        submenu: [{
                label: 'Nápoveda',
                click() {
                    require('electron').shell.openExternal('https://github.com/ttomovcik/school-information-system/wiki')
                }
            },
            {
                label: 'Prvé spustenie',
                click() {
                    let firstRunWindow = new BrowserWindow({
                        width: 800,
                        height: 600,
                    })
                    firstRunWindow.on('close', function () {
                        firstRunWindow = null
                    })
                    firstRunWindow.loadURL('file://' + __dirname + '/app/firstTimeRun.html')
                    firstRunWindow.show();
                    if (runningInDevMode) {
                        win.webContents.openDevTools();
                    } else {
                        console.log('[App::Prod] Disabling devTools');
                    }
                }
            },
        ]
    }
]

var veryImportantStringArray = [
    "No, I won't fix you printer!",
    'Haha, yes. Very funny',
    'No unicorns were hurt during development',
    'Please help me.',
    'mv /home/ttomovcik > /dev/null',
    'I saw it on the internet. That should be easy to do!',
    'Aaaaaaaaaaaaaaaaaaaa (.com)',
    'Never gonna give you up',
    'Remove child from parent with fork',
    'I make computer do beep boop',
    'Thanks StackOverflow for helping me, and Nox (xou) for feedback on UI',
    'rm -rf / --no-preserve-root'
]
var motdInTitle = veryImportantStringArray[Math.floor(Math.random()*veryImportantStringArray.length)];

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

function createWindow() {
    var applicationTitle = store.get('schoolName');
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: store.get('schoolName') +'(Školský informačný systém)',
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    })
    if (store.get('motdInTitle') === 'yep'){
        win.setTitle(applicationTitle + ' (Školský informačný systém) [' + motdInTitle + ']')
    } else{
        console.log('[App::EasterEggs]: Skipping motd in title')
    }
    if (runningInDevMode) {
        win.webContents.openDevTools();
    } else {
        console.log('[App::Prod] Disabling devTools');
    }
    win.loadURL('file://' + __dirname + '/app/app.html')
    win.on('closed', () => {
        win = null
        app.quit();
    })
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