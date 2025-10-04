import { BrowserWindowConstructorOptions, globalShortcut } from "electron";
import { BaseWindow } from "../core/BaseWindow.js";
import path from "path";

export class StopWatchWindow extends BaseWindow {
    constructor() {
        const options : BrowserWindowConstructorOptions = {
            width: 220,
            height: 140,
            resizable: false,
            title: 'StopWatch',
            alwaysOnTop: true,
            movable: true,
            frame: false
        };
        super(options);

        const url = this.isDevelopment ? 'http://localhost:5173/#/stopwatch': `file://${path.join(process.resourcesPath, 'dist', 'index.html')}#/stopwatch`;
        this.window.loadURL(url);
        
        // Registra o atalho global F1
        this.registerGlobalShortcuts();
        
        // Remove os atalhos quando a janela for fechada
        this.getWindow().on('closed', () => {
            this.unregisterGlobalShortcuts();
        });
    }

    protected override onWindowReady(): void {
        this.getWindow().setAlwaysOnTop(true, 'screen-saver');
    }

    private registerGlobalShortcuts(): void {
        // Registra F1 como atalho global
        const registered = globalShortcut.register('F1', () => {
            // Envia notificação para o renderer process
            this.getWindow().webContents.send('global-f1-pressed');
        });

        if (!registered) {
            console.warn('Failed to register global shortcut F1');
        }
    }

    private unregisterGlobalShortcuts(): void {
        // Remove o atalho global F1
        globalShortcut.unregister('F1');
    }

    protected registerIpcHandlers(): void {
        // Handler movido para main.ts como handler global
    }
}