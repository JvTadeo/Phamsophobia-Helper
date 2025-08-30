import { BaseWindow } from '../core/BaseWindow.js';
import { BrowserWindowConstructorOptions, ipcMain } from 'electron';

/**
 * Main application window
 */
export class MainWindow extends BaseWindow {
  constructor() {
    const options: BrowserWindowConstructorOptions = {
      width: 600,
      height: 800,
      resizable: false,
      maximizable: false,
      frame: false,
      title: 'Phasmophobia Helper'
    };

    super(options);
    
    // Loads the application content
    this.loadContent('http://localhost:5173', '../dist/index.html');
  }

  /**
   * Registers main window specific IPC handlers
   */
  protected registerIpcHandlers(): void {
    ipcMain.on('minimize', () => this.onMinizeCalled());
    ipcMain.on('close', () => this.close());
  }

  /**
   * Method called when the window is ready
   */
  protected onWindowReady(): void {
  }

  /**
   * Method called when the window is closed
   */
  protected onWindowClosed(): void {
    super.onWindowClosed();
  }

  // ------------------------------
  private onMinizeCalled(): void {
    this.getWindow().minimize();
  }

}
