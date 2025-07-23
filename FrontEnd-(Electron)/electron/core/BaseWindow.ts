import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, IpcMainEvent } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// ES Module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Base class for creating Electron windows with standard functionalities
 */
export abstract class BaseWindow {
  protected window: BrowserWindow;
  protected readonly isDevelopment: boolean;

  constructor(options: BrowserWindowConstructorOptions = {}) {
    this.isDevelopment = !app.isPackaged;
    
    // Determine correct preload path based on development vs production
    const preloadPath = this.isDevelopment 
      ? path.join(__dirname, '../preload.js')  // Development: dist-electron/preload.js
      : path.join(__dirname, 'preload.js');    // Production: bundled with app
    
    // Verify if preload file exists
    if (!fs.existsSync(preloadPath)) {
      console.warn(`Preload script not found at: ${preloadPath}`);
    }
    
    // Default settings that can be overridden
    const defaultOptions: BrowserWindowConstructorOptions = {
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: preloadPath,
        ...options.webPreferences
      },
      ...options
    };

    this.window = new BrowserWindow(defaultOptions);
    this.setupDefaultBehavior();
    this.setupEventListeners();
  }

  /**
   * Sets up default window behaviors
   */
  private setupDefaultBehavior(): void {
    // Sets up F12 to open/close DevTools
    this.window.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'F12' && input.type === 'keyDown') this.toggleDevTools();
    });

    // Shows the window when ready
    this.window.once('ready-to-show', () => {
      this.window.show();
      this.onWindowReady();
    });

    // Event when the window is closed
    this.window.on('closed', () => {
      this.onWindowClosed();
    });
  }

  /**
   * Sets up IPC event listeners
   */
  private setupEventListeners(): void {
    // Removes existing listeners to avoid duplicates
    this.removeAllListeners();
    
    // Sets up window-specific listeners
    this.registerIpcHandlers();
  }

  /**
   * Removes all IPC listeners for this window
   */
  private removeAllListeners(): void {
    // This method should be implemented by child classes
    // to remove their specific listeners
  }

  /**
   * Toggles DevTools open/close
   */
  public toggleDevTools(): void {
    if (this.window.webContents.isDevToolsOpened()) {
      this.window.webContents.closeDevTools();
    } else {
      this.window.webContents.openDevTools();
    }
  }

  /**
   * Opens DevTools
   */
  public openDevTools(): void {
    this.window.webContents.openDevTools();
  }

  /**
   * Closes DevTools
   */
  public closeDevTools(): void {
    this.window.webContents.closeDevTools();
  }

  /**
   * Loads a URL or file in the window
   */
  public loadContent(url?: string, filePath?: string): void {
    if (this.isDevelopment && url) {
      this.window.loadURL(url);
    } else if (filePath) {
      const fullPath = path.isAbsolute(filePath) 
        ? filePath 
        : path.join(__dirname, filePath);
      this.window.loadFile(fullPath);
    } else {
      // Default fallback
      const defaultPath = path.join(__dirname, '../../dist/index.html');
      this.window.loadFile(defaultPath);
    }
  }

  /**
   * Sends event to the renderer process
   */
  public sendToRenderer(channel: string, ...args: any[]): void {
    this.window.webContents.send(channel, ...args);
  }

  /**
   * Getter to access the window instance
   */
  public getWindow(): BrowserWindow {
    return this.window;
  }

  /**
   * Checks if the window is destroyed
   */
  public isDestroyed(): boolean {
    return this.window.isDestroyed();
  }

  /**
   * Closes the window
   */
  public close(): void {
    if (!this.window.isDestroyed()) {
      this.window.close();
    }
  }

  /**
   * Abstract method to register window-specific IPC handlers
   * Must be implemented by child classes
   */
  protected abstract registerIpcHandlers(): void;

  /**
   * Method called when the window is ready to be displayed
   * Can be overridden by child classes
   */
  protected onWindowReady(): void {
    // Empty default implementation
  }

  /**
   * Method called when the window is closed
   * Can be overridden by child classes
   */
  protected onWindowClosed(): void {
    this.removeAllListeners();
  }

  /**
   * Registers a handler for window-specific IPC events
   */
  protected registerIpcHandler(channel: string, handler: (event: IpcMainEvent, ...args: any[]) => void): void {
    ipcMain.on(channel, (event, ...args) => {
      // Checks if the event came from this specific window
      if (event.sender === this.window.webContents) {
        handler(event, ...args);
      }
    });
  }

  /**
   * Removes a specific IPC handler
   */
  protected removeIpcHandler(channel: string, handler?: (...args: any[]) => void): void {
    if (handler) {
      ipcMain.removeListener(channel, handler);
    } else {
      ipcMain.removeAllListeners(channel);
    }
  }
}
