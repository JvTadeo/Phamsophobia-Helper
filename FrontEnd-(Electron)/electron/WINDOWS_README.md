# Sistema de Janelas Electron

Este sistema fornece uma estrutura base para criar janelas do Electron personalizadas com funcionalidades padrão.

## Estrutura

### BaseWindow (Classe Base)

A classe `BaseWindow` é a classe abstrata que fornece funcionalidades padrão para todas as janelas:

#### Funcionalidades Incluídas:
- **DevTools**: Tecla F12 para abrir/fechar o DevTools
- **Eventos IPC**: Sistema para escutar e enviar eventos para o front-end
- **Carregamento de conteúdo**: Suporte automático para desenvolvimento e produção
- **Gestão de lifecycle**: Eventos de pronto e fechamento da janela

#### Métodos Principais:
- `sendToRenderer(channel, ...args)`: Envia eventos para o front-end
- `registerIpcHandler(channel, handler)`: Registra handlers para eventos IPC
- `toggleDevTools()`: Alterna o DevTools
- `loadContent(url?, filePath?)`: Carrega conteúdo na janela

## Como Usar

### 1. Criando uma Nova Janela

```typescript
import { BaseWindow } from '../core/BaseWindow';
import { BrowserWindowConstructorOptions, IpcMainEvent } from 'electron';

export class MinhaJanela extends BaseWindow {
  constructor() {
    const options: BrowserWindowConstructorOptions = {
      width: 800,
      height: 600,
      title: 'Minha Janela'
    };

    super(options);
    this.loadContent('http://localhost:5173', '../dist/index.html');
  }

  // OBRIGATÓRIO: Implementar este método
  protected registerIpcHandlers(): void {
    // Registre seus handlers IPC aqui
    this.registerIpcHandler('minha-janela:evento', this.handleEvento.bind(this));
  }

  private handleEvento(event: IpcMainEvent, data: any): void {
    console.log('Evento recebido:', data);
    
    // Processar dados
    const response = { success: true, data: 'processado' };
    
    // Enviar resposta para o front-end
    this.sendToRenderer('minha-janela:resposta', response);
  }

  // OPCIONAL: Sobrescrever métodos de lifecycle
  protected onWindowReady(): void {
    console.log('Janela pronta!');
    this.sendToRenderer('window-ready');
  }

  protected onWindowClosed(): void {
    console.log('Janela fechada!');
    super.onWindowClosed(); // Sempre chame o super
  }
}
```

### 2. Usando no main.ts

```typescript
import { MinhaJanela } from './windows/MinhaJanela';

let minhaJanela: MinhaJanela | null = null;

function criarMinhaJanela(): void {
  minhaJanela = new MinhaJanela();
}
```

### 3. Comunicação com o Front-end

#### Do Electron para o Front-end:
```typescript
// Na classe da janela
this.sendToRenderer('channel-name', { data: 'example' });
```

#### Do Front-end para o Electron:
```typescript
// No preload.js, expor a API
contextBridge.exposeInMainWorld('electronAPI', {
  sendToMain: (channel: string, data: any) => ipcRenderer.invoke(channel, data)
});

// No front-end
window.electronAPI.sendToMain('minha-janela:evento', { exemplo: 'dados' });
```

## Exemplos Incluídos

### MainWindow
Janela principal da aplicação com handlers para:
- Obtenção de dados
- Atualização de configurações
- Exibição de notificações

### SettingsWindow
Janela de configurações com handlers para:
- Salvar configurações
- Carregar configurações
- Resetar configurações

## Funcionalidades Automáticas

### DevTools
- **F12**: Alterna entre abrir/fechar DevTools
- Métodos `openDevTools()` e `closeDevTools()` disponíveis

### Lifecycle da Janela
- `onWindowReady()`: Chamado quando a janela está pronta para ser exibida
- `onWindowClosed()`: Chamado quando a janela é fechada

### Gestão de Eventos IPC
- Registro automático de handlers específicos da janela
- Limpeza automática quando a janela é fechada
- Verificação se o evento veio da janela correta

## Boas Práticas

1. **Sempre implemente `registerIpcHandlers()`**: Este método é obrigatório
2. **Use bind() nos handlers**: Para manter o contexto correto
3. **Chame `super.onWindowClosed()`**: Para garantir limpeza adequada
4. **Prefixe os canais IPC**: Use `nome-da-janela:evento` para evitar conflitos
5. **Trate erros**: Sempre trate possíveis erros nos handlers

## Estrutura de Arquivos

```
electron/
├── core/
│   └── BaseWindow.ts          # Classe base
├── windows/
│   ├── index.ts              # Exportações
│   ├── MainWindow.ts         # Janela principal
│   └── SettingsWindow.ts     # Janela de configurações
└── main.ts                   # Arquivo principal
```
