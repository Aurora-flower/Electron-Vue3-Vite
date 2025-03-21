// import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

function resolvePath(relUrl: string) {
  return join(__dirname, relUrl);
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Electron-Vue-Vite',
    webPreferences: {
      preload: resolvePath('../preload/index.js'),
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (!app.isPackaged && process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(join(__dirname, '../public/index.html'));
  }
});
