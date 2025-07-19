import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Equivalente ao __dirname em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Cria uma janela do Electron com as especificações solicitadas
 */
function createWindow(): BrowserWindow {
  // Cria a janela com as dimensões especificadas
  const window = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false // Não mostra até estar pronta
  });

  // Carrega o conteúdo (URL de desenvolvimento ou arquivo local)
  const isDevelopment = !app.isPackaged;
  if (isDevelopment) {
    window.loadURL('http://localhost:5173');
  } else {
    window.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Configura o evento F12 para abrir/fechar o inspetor
  window.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' && input.type === 'keyDown') {
      if (window.webContents.isDevToolsOpened()) {
        window.webContents.closeDevTools();
      } else {
        window.webContents.openDevTools();
      }
    }
  });

  // Mostra a janela quando estiver pronta
  window.once('ready-to-show', () => {
    window.show();
  });

  return window;
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
});
