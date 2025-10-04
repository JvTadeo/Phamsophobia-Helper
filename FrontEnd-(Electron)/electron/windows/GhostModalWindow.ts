import { BaseWindow } from "../core/BaseWindow.js";
import { BrowserWindowConstructorOptions, ipcMain } from 'electron';
import path from 'path';

export class GhostModalWindow extends BaseWindow {

    constructor() {
        const options: BrowserWindowConstructorOptions = {
            width: 400,
            height: 600,
            resizable: false,
            maximizable: false,
            frame: false,
            movable: true,
            title: 'Ghost Information'
        };

        super(options);
        const url = this.isDevelopment ? 'http://localhost:5173/#/ghost-information': `file://${path.join(process.resourcesPath, 'dist', 'index.html')}#/ghost-information`;

        this.window.loadURL(url);
    }

    /**
     * Registers main window specific IPC handlers
     */
    protected registerIpcHandlers(): void {
        ipcMain.on('ghost:minimize', () => this.onMinizeCalled());
        ipcMain.on('ghost:close', () => this.close());
        ipcMain.on('ghost:loading', (event, data) => {
            this.getWindow().webContents.send('ghost:loading', true);
        })
        ipcMain.on('ghost:update', (event, data) => {
            this.getWindow().webContents.send('ghost:update', data);
        });
        ipcMain.on('ghost:language-update', (event, data) => {
            this.getWindow().webContents.send('ghost:language_update', data);
        });
    }

    /**
     * Method called when the window is ready
     */
    protected override onWindowReady(): void {
        this.getWindow().setAlwaysOnTop(true, 'screen-saver');
    }

    /**
     * Method called when the window is closed
     */
    protected onWindowClosed(): void {
        this.removeIpcHandler('ghost:close');
        this.removeIpcHandler('ghost:minimize');
        this.removeIpcHandler('ghost:update');
        this.removeIpcHandler('ghost:loading');
        this.removeIpcHandler('ghost:language-update');
        super.onWindowClosed();
    }

    // ------------------------------
    private onMinizeCalled(): void {
        this.getWindow().minimize();
    }
}