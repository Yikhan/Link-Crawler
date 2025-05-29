"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  startCrawler: (url) => electron.ipcRenderer.invoke("start-crawler", url)
});
