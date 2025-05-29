import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${join(__dirname, '../dist/index.html')}`);
}

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle('start-crawler', async (_, url: string) => {
    // ✅ 动态加载 crawler.ts，避免打包进主进程
    const { runCrawler } = await import('./crawler.js');
    return await runCrawler(url);
  });
});
