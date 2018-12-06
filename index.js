const { app, BrowserWindow } = require("electron");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({ width: 680, height: 330});
  // mainWindow.setResizable(false);
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on("closed", () => { mainWindow = null; });
}
app.on("ready", createWindow);
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
