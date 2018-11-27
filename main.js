const {app, BrowserWindow, Menu,} = require('electron');
const Store = require('electron-store');
const store = new Store();

let win

const menuTemplate = [{
        label: 'Súbor',
        submenu: [{
                label: 'Nastavenia',
                click() {
                    let settingsWindow = new BrowserWindow({
                        width: 960,
                        height: 768,
                    })
                    settingsWindow.on('close', function () {
                        settingsWindow = null
                    })
                    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html')
                    settingsWindow.webContents.openDevTools();
                    settingsWindow.show();
                }
            },
            {type: 'separator'}, 
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        label: 'Zobrazenie',
        submenu: [
            {
                label: 'Aktualizovať obsah',
                click(){
                    console.log('[MainUI::callFromMainScript] Refreshing webview')
                }
            },
            {type: 'separator'},
            {role: 'reload'},
            {role: 'forcereload'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'help',
        submenu: [{
            label: 'Nápoveda',
            click() { require('electron').shell.openExternal('https://github.com/ttomovcik/school-information-system/wiki') }
        },
        {
            label: 'Prvé spustenie',
            click() {
                let settingsWindow = new BrowserWindow({
                    width: 800,
                    height: 600,
                })
                settingsWindow.on('close', function () {
                    settingsWindow = null
                })
                settingsWindow.loadURL('file://' + __dirname + '/app/firstTimeRun.html')
                settingsWindow.show();
            }
        },]
    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

function createWindow() {
    if (store.get('echoolName') === '*'){
        console.log('[MainUI::callFromMainScript] Skipping "applicationTitle", already set.')
    }
    else{
        store.set('schoolName',"Školský informačný systém");
    }

    var applicationTitle = store.get('schoolName');
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: applicationTitle + ' (Školský informačný systém)',
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    })
    win.webContents.openDevTools();
    win.loadURL('file://' + __dirname + '/app/app2.html')
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