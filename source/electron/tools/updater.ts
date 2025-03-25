import Logger from 'electron-log';
import {
  BrowserWindow,
  // Notification
} from 'electron';
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
  autoUpdaterInstance.checkForUpdatesAndNotify();

  Logger.info('update');
}
