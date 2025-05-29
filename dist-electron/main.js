import { app, ipcMain, BrowserWindow } from "electron";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 1e3,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "../preload/index.cjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${join(__dirname, "../dist/index.html")}`);
}
app.whenReady().then(() => {
  createWindow();
  ipcMain.handle("start-crawler", async (_, url) => {
    const { runCrawler } = await import("./crawler-rsGyWpf8.js");
    return await runCrawler(url);
  });
});
