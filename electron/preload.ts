import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  startCrawler: (url: string) => ipcRenderer.invoke('start-crawler', url),
});