import log from 'electron-log';
import { BrowserWindow } from 'electron';
import electronUpdater, {
  type AppUpdater,
  // NsisUpdater,
} from 'electron-updater';
import { getIsPackage } from '../helpers/app';

export function getAutoUpdater(): AppUpdater {
  const { autoUpdater } = electronUpdater;
  log.transports.file.level = 'debug';
  autoUpdater.logger = log;
  return autoUpdater;
}

export function update(window?: BrowserWindow | undefined) {
  if (!window || !getIsPackage()) {
    return;
  }
  const autoUpdaterInstance = getAutoUpdater();
  autoUpdaterInstance.checkForUpdatesAndNotify();
}
