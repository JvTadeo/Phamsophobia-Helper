// Tipos para integração com Electron
export interface ElectronAPI {
  // Controle de janela
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
  toggleDevTools: () => void;

  // Janelas específicas
  openSettings: () => void;

  // Configurações
  saveSettings: (settings: any) => void;
  loadSettings: () => void;
  resetSettings: () => void;

  // Eventos personalizados
  sendCustomEvent: (data: any) => void;

  // Listeners
  onSettingsLoaded: (callback: (settings: any) => void) => void;
  onSettingsSaved: (callback: (result: any) => void) => void;
  onSettingsReset: (callback: (result: any) => void) => void;
  onCustomEventResponse: (callback: (data: any) => void) => void;
  onShowHelp: (callback: (context: any) => void) => void;
  onSaveShortcut: (callback: () => void) => void;
  onUndoShortcut: (callback: () => void) => void;

  // Métodos legados (mantidos para compatibilidade)
  minimize: () => Promise<void>;
  maximize: () => Promise<void>;
  close: () => Promise<void>;
  getVersion: () => Promise<string>;
  onUpdateAvailable: (callback: (event: any, ...args: any[]) => void) => void;

  // Utilidades
  removeAllListeners: (channel: string) => void;
  getAppVersion: () => Promise<string>;
  getPlatform: () => string;

  // Genéricos
  on: (channel: string, callback: (...args: any[]) => void) => void;
  off: (channel: string, callback: (...args: any[]) => void) => void;
  send: (channel: string, ...args: any[]) => void;
  invoke: (channel: string, ...args: any[]) => Promise<any>;
}

export interface ElectronEnv {
  platform: string;
  nodeVersion: string;
  electronVersion: string;
  chromeVersion: string;
}

// Extensão da interface Window
declare global {
  interface Window {
    electronAPI: ElectronAPI;
    electronEnv: ElectronEnv;
  }
}
