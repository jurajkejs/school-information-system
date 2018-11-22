const {
    app,
    BrowserWindow,
    Menu,
} = require('electron')


let win

const menuTemplate = [{
        label: 'Súbor',
        submenu: [{
                label: 'Nastavenia',
                click() {
                    let settingsWindow = new BrowserWindow({
                        width: 1280,
                        height: 768,
                    })
                    settingsWindow.on('close', function () {
                        settingsWindow = null
                    })
                    settingsWindow.loadURL('file:///src/ui/settings/settings.html')
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
        }]
    }
]

const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    })
    win.loadURL('file:///src/app.html')
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