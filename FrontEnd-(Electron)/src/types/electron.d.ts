export interface ElectronAPI {
  // Stopwatch
  stopwatch: {
    show: () => void;
  };

  // Ghost
  ghost: {
    show: () => void;
    close: () => void;
    minimize: () => void;
    update: (data: any ) => void;
    loading: (data: boolean) => void;
    languageUpdate: (data: any) => void;
    onUpdate: (callback: (event: any, data: any) => void) => void;
    onLoading: (callback: (event: any, data: boolean) => void) => void;
    onLanguageUpdate: (callback: (event: any, data: any) => void) => void;
  };

  // Window
  window: {
    close: () => void;
    minimize: () => void;
  };

  // Utils
  utils: {
    openDefaultBrowser: (url: string) => void;
  };

  // Shortcuts
  shortcuts: {
    onF1Pressed: (callback: () => void) => void;
    removeF1Listener: () => void;
  };
}

// Extensão da interface Window
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
