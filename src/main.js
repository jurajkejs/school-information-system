const {
    app,
    BrowserWindow,
} = require('electron');
const runningInDevMode = require('electron-is-dev');

let win

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
    win.loadURL('file://' + __dirname + '/../index.html')
    win.on('closed', () => {
        win = null
        app.quit();
    })
    win.setResizable(true);
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