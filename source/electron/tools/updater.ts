import Logger from 'electron-log';
import { BrowserWindow, Notification } from 'electron';
import electronUpdater, {
  type AppUpdater,
  // NsisUpdater,
} from 'electron-updater';
import { getIsPackage } from '../helpers/app';

export function getAutoUpdater(): AppUpdater {
  const { autoUpdater } = electronUpdater;
  Logger.transports.file.level = 'debug';
  Logger.transports.file.format =
    '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {scope} {text}';
  Logger.transports.file.resolvePathFn = () => './update.log';
  // const notifer = new Notification({
  //   title: '测试',
  //   body: 'update',
  // });
  // notifer.show();
  autoUpdater.logger = Logger;
  return autoUpdater;
}

export function update(window?: BrowserWindow | undefined) {
  if (!window || !getIsPackage()) {
    return;
  }
  const autoUpdaterInstance = getAutoUpdater();
  // autoUpdaterInstance.setFeedURL({
  //   provider: 'github',
  //   owner: 'Aurora-flower',
  //   repo: 'Electron-Vue3-Vite',
  // });
  autoUpdaterInstance.checkForUpdatesAndNotify({
    title: '更新提示',
    body: '检测到新版本，是否更新？',
  });
  // autoUpdaterInstance.on('update-available', () => {
  //   autoUpdaterInstance.downloadUpdate()
  // })
  autoUpdaterInstance.on('download-progress', (progress) => {
    Logger.info('download-progress');
    window.setProgressBar(progress.percent / 100);
  });
  autoUpdaterInstance.on('update-downloaded', () => {
    Logger.info('update-downloaded');
    const notification = new Notification({
      title: '更新提示',
      body: '更新已下载完成，是否重启应用进行安装？',
    });
    notification.on('click', () => {
      autoUpdaterInstance.quitAndInstall();
    });
  });

  Logger.info('update');
}
