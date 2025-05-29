const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startCrawler: (url) => ipcRenderer.invoke('start-crawler', url),
});