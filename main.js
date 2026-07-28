const {app, BrowserWindow} = require('electron');
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
};

app.whenReady().then(createWindow);