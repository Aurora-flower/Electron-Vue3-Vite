import { join } from 'node:path';
// import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import { getIsPackage } from './helpers/app';
import { update } from './tools/updater';

function resolvePath(relUrl: string) {
  return join(__dirname, relUrl);
}

(function () {
  app.disableHardwareAcceleration();
})();

app.whenReady().then(() => {
  const win = new BrowserWindow({
    title: 'Electron-Vue-Vite',
    webPreferences: {
      webgl: true,
      offscreen: false,
      preload: resolvePath('../preload/index.js'),
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (!getIsPackage() && process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(join(__dirname, '../public/index.html'));
  }

  update(win);
});
