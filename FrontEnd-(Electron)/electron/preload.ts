import { contextBridge, ipcRenderer } from 'electron';

// Expõe APIs seguras para o front-end
contextBridge.exposeInMainWorld('electronAPI', {
  // Exemplo de função para comunicação com o main process
  getVersion: () => process.versions.electron,
  
  // Exemplo de evento do renderer para o main
  sendMessage: (message: string) => ipcRenderer.send('message-from-renderer', message),
  
  // Exemplo de listener para eventos do main
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('message-from-main', (_event, message) => callback(message));
  }
});

console.log('Preload script carregado!');
