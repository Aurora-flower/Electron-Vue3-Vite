// import log from 'electron-log';
import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

app.whenReady().then(() => {
  // const isDev = process.env.NODE_ENV === 'development';
  const win = new BrowserWindow({
    title: 'Electron-Vue-Vite',
    webPreferences: {
      preload: join(__dirname, './preload/index.js'),
    },
  });

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
});
