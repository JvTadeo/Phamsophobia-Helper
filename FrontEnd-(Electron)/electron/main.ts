import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { MainWindow } from './windows/MainWindow.js';
import { StopWatchWindow } from './windows/StopwatchWindow.js';

let mainWindow: MainWindow | null = null;
let stopwatchWindow: StopWatchWindow | null = null;

/**
 * Creates the main application window
 */
function createWindow(): void {
  mainWindow = new MainWindow();
}

/**
 * Creates the stopwatch window
 */
function createStopWatchWindow(): void {
  if (!stopwatchWindow || stopwatchWindow.isDestroyed()) {
    stopwatchWindow = new StopWatchWindow();
  } else {
    stopwatchWindow.getWindow().show();
  }
}

// Electron event configuration
app.whenReady().then(() => {
  createWindow();
  
  // Setup global IPC handlers
  setupIpcHandlers();
  
  // On macOS, recreate the window when the dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/**
 * Setup global IPC handlers
 */
function setupIpcHandlers(): void {  
  // Handler for showing stopwatch window
  ipcMain.on('stopwatch:show', () => {
    createStopWatchWindow();
  });

  // Handler for Open Default Browser
  ipcMain.on('open-default-browser', (event, url: string) => {
    event.preventDefault();
    shell.openExternal(url);
  });
}

// When all windows are closed
app.on('window-all-closed', () => {
  // On macOS, applications stay active even without windows
  if (process.platform !== 'darwin') {
    app.quit();
  }
  
  mainWindow = null;
  stopwatchWindow = null;
});
