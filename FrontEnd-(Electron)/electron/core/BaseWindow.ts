import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, IpcMainEvent } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Classe base para criação de janelas do Electron com funcionalidades padrão
 */
export abstract class BaseWindow {
  protected window: BrowserWindow;
  protected readonly isDevelopment: boolean;

  constructor(options: BrowserWindowConstructorOptions = {}) {
    this.isDevelopment = !app.isPackaged;
    
    // Configurações padrão que podem ser sobrescritas
    const defaultOptions: BrowserWindowConstructorOptions = {
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        ...options.webPreferences
      },
      ...options
    };

    this.window = new BrowserWindow(defaultOptions);
    this.setupDefaultBehavior();
    this.setupEventListeners();
  }

  /**
   * Configura comportamentos padrão da janela
   */
  private setupDefaultBehavior(): void {
    // Configura o F12 para abrir/fechar DevTools
    this.window.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'F12' && input.type === 'keyDown') {
        this.toggleDevTools();
      }
    });

    // Mostra a janela quando estiver pronta
    this.window.once('ready-to-show', () => {
      this.window.show();
      this.onWindowReady();
    });

    // Evento quando a janela é fechada
    this.window.on('closed', () => {
      this.onWindowClosed();
    });
  }

  /**
   * Configura os listeners de eventos IPC
   */
  private setupEventListeners(): void {
    // Remove listeners existentes para evitar duplicatas
    this.removeAllListeners();
    
    // Configura listeners específicos da janela
    this.registerIpcHandlers();
  }

  /**
   * Alterna entre abrir e fechar o DevTools
   */
  public toggleDevTools(): void {
    if (this.window.webContents.isDevToolsOpened()) {
      this.window.webContents.closeDevTools();
    } else {
      this.window.webContents.openDevTools();
    }
  }

  /**
   * Abre o DevTools
   */
  public openDevTools(): void {
    this.window.webContents.openDevTools();
  }

  /**
   * Fecha o DevTools
   */
  public closeDevTools(): void {
    this.window.webContents.closeDevTools();
  }

  /**
   * Carrega uma URL ou arquivo na janela
   */
  public loadContent(url?: string, filePath?: string): void {
    if (this.isDevelopment && url) {
      this.window.loadURL(url);
    } else if (filePath) {
      this.window.loadFile(filePath);
    } else {
      // Fallback padrão
      this.window.loadFile(path.join(__dirname, '../dist/index.html'));
    }
  }

  /**
   * Envia evento para o renderer process
   */
  public sendToRenderer(channel: string, ...args: any[]): void {
    this.window.webContents.send(channel, ...args);
  }

  /**
   * Registra um handler para eventos IPC específicos desta janela
   */
  protected registerIpcHandler(channel: string, handler: (event: IpcMainEvent, ...args: any[]) => void): void {
    ipcMain.on(channel, (event, ...args) => {
      // Verifica se o evento veio desta janela específica
      if (event.sender === this.window.webContents) {
        handler(event, ...args);
      }
    });
  }

  /**
   * Remove um handler IPC específico
   */
  protected removeIpcHandler(channel: string, handler?: (...args: any[]) => void): void {
    if (handler) {
      ipcMain.removeListener(channel, handler);
    } else {
      ipcMain.removeAllListeners(channel);
    }
  }

  /**
   * Getter para acessar a instância da janela
   */
  public getWindow(): BrowserWindow {
    return this.window;
  }

  /**
   * Verifica se a janela está destruída
   */
  public isDestroyed(): boolean {
    return this.window.isDestroyed();
  }

  /**
   * Fecha a janela
   */
  public close(): void {
    if (!this.window.isDestroyed()) {
      this.window.close();
    }
  }

  /**
   * Método abstrato para registrar handlers IPC específicos da janela
   * Deve ser implementado pelas classes filhas
   */
  protected abstract registerIpcHandlers(): void;

  /**
   * Método chamado quando a janela está pronta para ser exibida
   * Pode ser sobrescrito pelas classes filhas
   */
  protected onWindowReady(): void {
    // Implementação padrão vazia
  }

  /**
   * Método chamado quando a janela é fechada
   * Pode ser sobrescrito pelas classes filhas
   */
  protected onWindowClosed(): void {
    this.removeAllListeners();
  }

  /**
   * Remove todos os listeners IPC desta janela
   */
  private removeAllListeners(): void {
    // Este método deve ser implementado pelas classes filhas
    // para remover seus listeners específicos
  }
}
