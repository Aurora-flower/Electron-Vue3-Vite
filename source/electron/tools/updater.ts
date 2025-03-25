import Logger from 'electron-log';
import { BrowserWindow, Notification } from 'electron';
import electronUpdater, {
  type AppUpdater,
  // NsisUpdater,
} from 'electron-updater';
import { getIsPackage } from '../helpers/app';

// async function sleep(ms: number) {
//   return new Promise((resolve) => {
//     const timer = setTimeout(() => {
//       resolve(true);
//       clearTimeout(timer);
//     }, ms);
//   });
// }

export function getAutoUpdater(): AppUpdater {
  const { autoUpdater } = electronUpdater;
  Logger.transports.file.level = 'debug';
  Logger.transports.file.format =
    '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}';
  Logger.transports.file.resolvePathFn = () => './update.log';
  autoUpdater.disableWebInstaller = false;
  autoUpdater.autoDownload = false;
  autoUpdater.logger = Logger;
  return autoUpdater;
}

export function update(window?: BrowserWindow | undefined) {
  if (!window || !getIsPackage()) {
    return;
  }
  const autoUpdaterInstance = getAutoUpdater();

  // Tip: 一般情况下不需要 setFeedURL，也不建议使用，Electron-builder 会自动识别与处理
  // autoUpdaterInstance.setFeedURL({
  //   provider: 'github',
  //   owner: 'Aurora-flower',
  //   repo: 'Electron-Vue3-Vite',
  // });
  autoUpdaterInstance.checkForUpdatesAndNotify({
    title: '更新提示',
    body: '检测到新版本',
  });

  autoUpdaterInstance.on('update-available', () => {
    // Tip: 有时下载会过快，开启自动下载时会直接出现更新完成的提示。
    const notification = new Notification({
      title: '下载询问',
      body: '检测到新版本，是否下载？',
    });
    notification.show();
    notification.on('click', () => {
      Logger.info('新版本下载中...');
      autoUpdaterInstance.downloadUpdate();
    });
  });

  autoUpdaterInstance.on('update-not-available', () => {
    Logger.info('没有可用更新');
  });

  autoUpdaterInstance.on('download-progress', (progress) => {
    Logger.info('download-progress', progress.percent);
    window.setProgressBar(progress.percent / 100);
  });

  autoUpdaterInstance.on('update-downloaded', () => {
    Logger.info('update-downloaded');
    const notification = new Notification({
      title: '更新提示',
      body: '更新已下载完成，是否重启应用进行安装？',
    });
    notification.show();
    notification.on('click', () => {
      autoUpdaterInstance.quitAndInstall();
    });
  });

  autoUpdaterInstance.on('error', (error) => {
    Logger.error('error', error);
  });
}
