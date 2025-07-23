import { BaseWindow } from '../core/BaseWindow.js';
import { BrowserWindowConstructorOptions } from 'electron';

/**
 * Main application window
 */
export class MainWindow extends BaseWindow {
  constructor() {
    const options: BrowserWindowConstructorOptions = {
      width: 400,
      height: 600,
      resizable: false,
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
}
