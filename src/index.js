const { app, BrowserWindow, Menu } = require("electron");
let mainWindow;
function createWindow() {

  mainWindow = new BrowserWindow({ width: 700, height: 340});
  // mainWindow.setResizable(false);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on("closed", () => { mainWindow = null; });
}
app.on("ready", () => {
  createWindow();
  const menu = Menu.buildFromTemplate([
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          click (item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
});
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
    app.quit();
  // }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
