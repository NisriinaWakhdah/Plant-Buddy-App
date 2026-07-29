const {app, BrowserWindow, ipcMain} = require('electron');
require('electron-reload')(__dirname) // electron-reload

function createWindow() {
    const win = new BrowserWindow({
        width: 320,
        height: 420,
        resizable: false,
        fullscreenable: false,
        center: true,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

    /* Window controller with ipc handlers */
    ipcMain.on('window:minimize', () => win.minimize());
    ipcMain.on('window:close', () => win.close());
};

app.whenReady().then(createWindow);