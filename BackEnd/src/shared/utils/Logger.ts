// ANSI Color Codes
const Colors = {
  // Reset
  reset: '\x1b[0m',
  
  // Text colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Bright colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  
  // Background colors
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  
  // Styles
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  underline: '\x1b[4m'
} as const;

// Log Levels
type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SUCCESS';

interface LogConfig {
  level: LogLevel;
  color: string;
  emoji: string;
  bgColor?: string;
}

const LogConfigs: Record<LogLevel, LogConfig> = {
  INFO: { level: 'INFO', color: Colors.blue, emoji: 'ℹ️' },
  WARN: { level: 'WARN', color: Colors.yellow, emoji: '⚠️' },
  ERROR: { level: 'ERROR', color: Colors.red, emoji: '❌', bgColor: Colors.bgRed },
  DEBUG: { level: 'DEBUG', color: Colors.magenta, emoji: '🐛' },
  SUCCESS: { level: 'SUCCESS', color: Colors.green, emoji: '✅' }
};

export class Logger {
  private static formatTimestamp(): string {
    const now = new Date();
    
    const date = now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const time = now.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    return `${date} ${time}`;
  }

  private static formatMessage(config: LogConfig, message: string, data?: any): string {
    const timestamp = this.formatTimestamp();
    const coloredLevel = `${config.color}${config.level}${Colors.reset}`;
    const coloredMessage = `${config.color}${message}${Colors.reset}`;
    
    let logLine = `${config.emoji} [${coloredLevel}] ${Colors.dim}${timestamp}${Colors.reset}: ${coloredMessage}`;
    
    if (data !== undefined) {
      const dataStr = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
      logLine += `\n${Colors.cyan}${dataStr}${Colors.reset}`;
    }
    
    return logLine;
  }

  private static shouldLog(level: LogLevel): boolean {
    const env = process.env.NODE_ENV || 'development';
    
    // Em produção, não mostrar logs DEBUG
    if (env === 'production' && level === 'DEBUG') {
      return false;
    }
    
    return true;
  }

  static info(message: string, data?: any): void {
    if (this.shouldLog('INFO')) {
      console.log(this.formatMessage(LogConfigs.INFO, message, data));
    }
  }

  static warn(message: string, data?: any): void {
    if (this.shouldLog('WARN')) {
      console.warn(this.formatMessage(LogConfigs.WARN, message, data));
    }
  }

  static error(message: string, error?: Error | any): void {
    if (this.shouldLog('ERROR')) {
      console.error(this.formatMessage(LogConfigs.ERROR, message, error));
      
      // Stack trace para erros
      if (error instanceof Error && error.stack) {
        console.error(`${Colors.dim}${error.stack}${Colors.reset}`);
      }
    }
  }

  static debug(message: string, data?: any): void {
    if (this.shouldLog('DEBUG')) {
      console.debug(this.formatMessage(LogConfigs.DEBUG, message, data));
    }
  }

  static success(message: string, data?: any): void {
    if (this.shouldLog('SUCCESS')) {
      console.log(this.formatMessage(LogConfigs.SUCCESS, message, data));
    }
  }

  // Métodos especiais
  static server(message: string, port?: number): void {
    const serverMsg = port ? `${message} on port ${port}` : message;
    console.log(`🚀 ${Colors.bold}${Colors.brightGreen}${serverMsg}${Colors.reset}`);
  }

  static request(method: string, url: string, status?: number): void {
    const methodColor = method === 'GET' ? Colors.green : 
                       method === 'POST' ? Colors.blue : 
                       method === 'PUT' ? Colors.yellow : 
                       method === 'DELETE' ? Colors.red : Colors.white;
    
    const statusColor = !status ? Colors.white :
                       status < 300 ? Colors.green :
                       status < 400 ? Colors.yellow :
                       Colors.red;
    
    const timestamp = this.formatTimestamp();
    const statusText = status ? ` ${statusColor}${status}${Colors.reset}` : '';
    
    console.log(
      `🌐 ${Colors.dim}${timestamp}${Colors.reset} ` +
      `${methodColor}${method}${Colors.reset} ` +
      `${Colors.cyan}${url}${Colors.reset}${statusText}`
    );
  }

  // Método para remover cores (útil para logs em arquivo)
  static stripColors(text: string): string {
    // Regex para remover códigos ANSI
    return text.replace(/\x1b\[[0-9;]*m/g, '');
  }

  // Método para log customizado com regex
  static custom(pattern: RegExp, replacement: string, message: string): void {
    const coloredMessage = message.replace(pattern, replacement);
    const timestamp = this.formatTimestamp();
    
    console.log(`🎨 ${Colors.dim}${timestamp}${Colors.reset}: ${coloredMessage}`);
  }
}
