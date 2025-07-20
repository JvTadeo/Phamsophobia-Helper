import { app, BrowserWindow } from 'electron';
import { MainWindow } from './windows/MainWindow.js';

let mainWindow: MainWindow | null = null;

/**
 * Cria a janela principal da aplicação
 */
function createWindow(): void {
  mainWindow = new MainWindow();
}

// Configuração dos eventos do Electron
app.whenReady().then(() => {
  createWindow();

  // No macOS, recria a janela quando o ícone do dock é clicado
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  // No macOS, aplicações ficam ativas mesmo sem janelas
  if (process.platform !== 'darwin') {
    app.quit();
  }
  mainWindow = null;
});
