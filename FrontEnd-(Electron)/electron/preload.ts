const { contextBridge, ipcRenderer} = require('electron');
import type { IpcRendererEvent } from 'electron';


// ---- Helpers
function createSender(channel:string) {
  return (data?: any) => ipcRenderer.send(channel, data);
}

function createListener<T = any>(channel: string, callback: (data: T) => void) {
  const listener = (event: IpcRendererEvent, data: T) => callback(data);

  ipcRenderer.on(channel, listener);
  
  return () => {
    ipcRenderer.removeListener(channel, listener);
  }
}

// 
// Exposes safe APIs to the front-end
contextBridge.exposeInMainWorld('electronAPI', {
  stopwatch: {
    show: createSender('stopwatch:show'),
  },

  ghost: {
    show: createSender('ghost:show'),
    close: createSender('ghost:close'),
    minimize: createSender('ghost:minimize'),
    update: (data: any) => ipcRenderer.send('ghost:update', data),
    loading: (data: boolean) => ipcRenderer.send('ghost:loading', data),
    languageUpdate: (data: any) => ipcRenderer.send('ghost:language-update', data),
    onUpdate: (callback: (data: any) => void) => createListener('ghost:update', callback),
    onLoading: (callback: (data: boolean) => void) => createListener('ghost:loading', callback),
    onLanguageUpdate: (callback: (data: any) => void) => createListener('ghost:language_update', callback),
  },

  shortcuts: {
    onF1Pressed: (callback: () => void) => createListener('global-f1-pressed', callback),
    removeF1Listeners: () => ipcRenderer.removeAllListeners('global-f1-pressed'),
  },

  window: {
    minimize: createSender('minimize'),
    close: createSender('close'),
  },

  utils: {
    openDefaultBrowser: (url: string) => ipcRenderer.send('open-default-browser', url),
  },
});
