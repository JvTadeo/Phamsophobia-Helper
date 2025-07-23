const { contextBridge, ipcRenderer } = require('electron');

// Exposes safe APIs to the front-end
contextBridge.exposeInMainWorld('electronAPI', {
  // Example function for communication with the main process
  getVersion: () => process.versions.electron,

  stopwatch: {
    show: () => ipcRenderer.send('stopwatch:show'),
  },

  // Global shortcuts listeners
  onF1Pressed: (callback: () => void) => {
    ipcRenderer.on('global-f1-pressed', callback);
  },

  // Remove listeners
  removeF1Listener: () => {
    ipcRenderer.removeAllListeners('global-f1-pressed');
  }
});
