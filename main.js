const {
    app,
    BrowserWindow
} = require('electron')
let win

function createWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            webSecurity: false,
            allowRunningInsecureContent: true // Povolí HTTP obsah z iných stránok
        }
    })
    win.loadURL('file:///src/app.html')
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
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