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
            webSecurity: false
        }
    })
    win.loadURL('file:///ui_v2/app.html')
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null
    })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        // Vynútiť zatvorenie aplikácie pre macOS, treba doknčiť force-close pre Windows
        app.quit()
    }
})
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
})