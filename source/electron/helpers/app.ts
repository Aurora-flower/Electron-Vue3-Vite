import { app } from 'electron';

export function getIsPackage() {
  return app.isPackaged;
}
