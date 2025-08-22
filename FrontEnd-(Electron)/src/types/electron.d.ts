export interface ElectronAPI {
  // Stopwatch
  stopwatch: {
    show: () => void;
  };

  // Global shortcuts
  onF1Pressed: (callback: () => void) => void;
  removeF1Listener: () => void;
  openDefaultBrowser: (url: string) => void;
  close: () => void;
  minimize: () => void;
}

// Extensão da interface Window
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
