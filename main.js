const { app, dialog, ipcMain, BrowserWindow } = require('electron')
const path = require('path');
const { download } = require('electron-dl');


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  win.webContents.openDevTools()
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('openDialog', (event, arg) => {
  dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    properties: ['openDirectory']
  }).then(result => {
    event.reply("reply", result);
  }).catch(err => {
    console.log(err)
  })
})

ipcMain.handle('dl', async (event, url, directory) => {
 	const win = BrowserWindow.getFocusedWindow();
  console.log(event)
 	console.log(await download(win, url, {directory: directory}));
  // event.reply("dl-finish");
});
