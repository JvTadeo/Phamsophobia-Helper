import { BaseWindow } from '../core/BaseWindow.js';
import { BrowserWindowConstructorOptions, IpcMainEvent } from 'electron';

/**
 * Janela de configurações da aplicação
 */
export class SettingsWindow extends BaseWindow {
  constructor() {
    const options: BrowserWindowConstructorOptions = {
      width: 500,
      height: 600,
      resizable: true,
      title: 'Configurações',
      parent: undefined, // Defina a janela pai se necessário
      modal: false
    };

    super(options);
    
    // Carrega uma página específica para configurações
    this.loadContent('http://localhost:5173/#/settings', '../dist/index.html');
  }

  /**
   * Registra os handlers IPC específicos da janela de configurações
   */
  protected registerIpcHandlers(): void {
    this.registerIpcHandler('settings-window:save-config', this.handleSaveConfig.bind(this));
    this.registerIpcHandler('settings-window:load-config', this.handleLoadConfig.bind(this));
    this.registerIpcHandler('settings-window:reset-config', this.handleResetConfig.bind(this));
  }

  /**
   * Handler para salvar configurações
   */
  private handleSaveConfig(event: IpcMainEvent, config: any): void {
    console.log('Salvando configurações:', config);
    
    try {
      // Aqui você implementaria a lógica de salvamento
      // Por exemplo, salvar em um arquivo JSON ou banco de dados
      
      this.sendToRenderer('settings-window:config-saved', { 
        success: true, 
        message: 'Configurações salvas com sucesso!' 
      });
    } catch (error) {
      this.sendToRenderer('settings-window:config-saved', { 
        success: false, 
        message: 'Erro ao salvar configurações',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * Handler para carregar configurações
   */
  private handleLoadConfig(event: IpcMainEvent): void {
    console.log('Carregando configurações...');
    
    try {
      // Aqui você implementaria a lógica de carregamento
      const config = {
        theme: 'dark',
        language: 'pt-BR',
        notifications: true,
        autoStart: false
      };
      
      this.sendToRenderer('settings-window:config-loaded', { 
        success: true, 
        config 
      });
    } catch (error) {
      this.sendToRenderer('settings-window:config-loaded', { 
        success: false, 
        message: 'Erro ao carregar configurações',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * Handler para resetar configurações
   */
  private handleResetConfig(event: IpcMainEvent): void {
    console.log('Resetando configurações...');
    
    try {
      // Aqui você implementaria a lógica de reset
      const defaultConfig = {
        theme: 'light',
        language: 'en-US',
        notifications: true,
        autoStart: false
      };
      
      this.sendToRenderer('settings-window:config-reset', { 
        success: true, 
        config: defaultConfig 
      });
    } catch (error) {
      this.sendToRenderer('settings-window:config-reset', { 
        success: false, 
        message: 'Erro ao resetar configurações',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      });
    }
  }

  /**
   * Método chamado quando a janela está pronta
   */
  protected onWindowReady(): void {
    console.log('Janela de configurações está pronta');
    
    // Carrega as configurações automaticamente quando a janela abre
    this.sendToRenderer('settings-window:ready');
  }

  /**
   * Método chamado quando a janela é fechada
   */
  protected onWindowClosed(): void {
    console.log('Janela de configurações foi fechada');
    super.onWindowClosed();
  }
}
