"use strict";
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { runCrawler } = require("./crawler.js");
function createWindow() {
  const win = new BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "../dist/index.html")}`);
}
app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("start-crawler", async (_, url) => {
    return await runCrawler(url);
  });
});
