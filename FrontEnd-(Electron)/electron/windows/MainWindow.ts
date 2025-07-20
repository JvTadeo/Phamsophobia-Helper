import { BaseWindow } from '../core/BaseWindow.js';
import { BrowserWindowConstructorOptions, IpcMainEvent } from 'electron';

/**
 * Janela principal da aplicação
 */
export class MainWindow extends BaseWindow {
  constructor() {
    const options: BrowserWindowConstructorOptions = {
      width: 600,
      height: 800,
      resizable: false,
      title: 'Phasmophobia Helper'
    };

    super(options);
    
    // Carrega o conteúdo da aplicação
    this.loadContent('http://localhost:5173', '../dist/index.html');
  }

  /**
   * Registra os handlers IPC específicos da janela principal
   */
  protected registerIpcHandlers(): void {
    // Exemplo: Handler para receber dados do frontend
    this.registerIpcHandler('main-window:get-data', this.handleGetData.bind(this));
    
    // Exemplo: Handler para configurações
    this.registerIpcHandler('main-window:update-settings', this.handleUpdateSettings.bind(this));
    
    // Exemplo: Handler para notificações
    this.registerIpcHandler('main-window:show-notification', this.handleShowNotification.bind(this));
  }

  /**
   * Exemplo de handler para obter dados
   */
  private handleGetData(event: IpcMainEvent, requestData: any): void {
    console.log('Dados recebidos do frontend:', requestData);
    
    // Processa os dados e envia resposta
    const responseData = {
      success: true,
      data: 'Dados processados com sucesso',
      timestamp: new Date().toISOString()
    };
    
    // Envia resposta de volta para o frontend
    this.sendToRenderer('main-window:data-response', responseData);
  }

  /**
   * Exemplo de handler para atualizar configurações
   */
  private handleUpdateSettings(event: IpcMainEvent, settings: any): void {
    console.log('Configurações atualizadas:', settings);
    
    // Aqui você salvaria as configurações
    // Notifica o frontend sobre a atualização
    this.sendToRenderer('main-window:settings-updated', { success: true });
  }

  /**
   * Exemplo de handler para exibir notificações
   */
  private handleShowNotification(event: IpcMainEvent, notification: { title: string; message: string }): void {
    console.log('Exibindo notificação:', notification);
    
    // Aqui você pode implementar a lógica de notificação
    // Confirma para o frontend que a notificação foi exibida
    this.sendToRenderer('main-window:notification-shown', { success: true });
  }

  /**
   * Método chamado quando a janela está pronta
   */
  protected onWindowReady(): void {
    console.log('Janela principal está pronta');
    
    // Envia evento para o frontend informando que a janela está pronta
    this.sendToRenderer('main-window:ready', { timestamp: new Date().toISOString() });
  }

  /**
   * Método chamado quando a janela é fechada
   */
  protected onWindowClosed(): void {
    console.log('Janela principal foi fechada');
    super.onWindowClosed();
  }

  /**
   * Métodos específicos da janela principal
   */
  public sendGameData(gameData: any): void {
    this.sendToRenderer('game-data-update', gameData);
  }

  public sendPlayerCount(count: number): void {
    this.sendToRenderer('player-count-update', { count });
  }

  public sendNewsUpdate(news: any[]): void {
    this.sendToRenderer('news-update', news);
  }
}
