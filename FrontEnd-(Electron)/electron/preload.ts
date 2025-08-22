const { contextBridge, ipcRenderer } = require('electron');

// Exposes safe APIs to the front-end
contextBridge.exposeInMainWorld('electronAPI', {
  stopwatch: {
    show: () => ipcRenderer.send('stopwatch:show'),
  },
  // Global shortcuts listeners
  onF1Pressed: (callback: () => void) => {
    ipcRenderer.on('global-f1-pressed', callback);
  },
  // Open Default Browser
  openDefaultBrowser: (url: string) => {
    ipcRenderer.send('open-default-browser', url);
  },
  // Remove listeners
  removeF1Listener: () => {
    ipcRenderer.removeAllListeners('global-f1-pressed');
  },
  minimize: () => ipcRenderer.send('minimize'),
  close: () => ipcRenderer.send('close'),
});
