# 🛠️ Shared Layer - Utilitários e Código Compartilhado

A camada **Shared** contém **código que pode ser usado por qualquer outra camada**. É como uma "caixa de ferramentas" com utilitários, constantes, middlewares e helpers.

## 📋 O que PODE ter aqui:

### ✅ **Utils (utils/)**
- ✅ **Funções utilitárias** puras
- ✅ **Helpers de formatação** (data, string, etc)
- ✅ **Clientes HTTP configurados** (ApiClient)
- ✅ **Sistema de logging** (Logger)
- ✅ **Wrappers para captura de erro** (asyncHandler)

### ✅ **Constants (constants/)**
- ✅ **Configurações globais** (URLs, timeouts)
- ✅ **Status codes** padronizados
- ✅ **Mensagens de erro** padrão
- ✅ **Constantes de aplicação** (limites, formatos)

### ✅ **Middleware (middleware/)**
- ✅ **Middlewares do Express** reutilizáveis
- ✅ **Interceptores de request/response**
- ✅ **Handlers de erro** centralizados
- ✅ **Middleware de logging** automático

### ✅ **Interfaces (interfaces/)**
- ✅ **Interfaces compartilhadas** entre camadas
- ✅ **Tipos de resposta** padronizados
- ✅ **Contratos de dados** comuns

### ✅ **Exceptions (exceptions/)**
- ✅ **Classes de erro** customizadas
- ✅ **Hierarquia de exceções** da aplicação

## ✅ **Exemplos permitidos:**

### **🔧 Utils:**
```typescript
// ✅ Logger com cores e formatação
export class Logger {
  static info(message: string, data?: any): void {
    console.log(`ℹ️ [INFO] ${new Date().toISOString()}: ${message}`);
  }
}

// ✅ Wrapper para captura automática de erros
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// ✅ Cliente HTTP configurado
export class ApiClient {
  private axiosInstance: AxiosInstance;
  
  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: { 'User-Agent': 'Phasmophobia-Helper/1.0.0' }
    });
  }
}
```

### **⚙️ Constants:**
```typescript
// ✅ Configurações centralizadas
export const AppConfig = {
  PORT: Number(process.env.PORT) || 3001,
  STEAM_API_BASE_URL: 'https://api.steampowered.com',
  PHASMO_APP_ID: '739630'
} as const;

// ✅ Status codes padronizados
export const StatusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;
```

### **🔗 Interfaces:**
```typescript
// ✅ Interface para padronizar respostas
export interface ApiResponse<T = any> {
  status: 'SUCCESS' | 'ERROR';
  timestamp: string;
  data?: T;
  error?: string;
}
```

### **🚨 Exceptions:**
```typescript
// ✅ Classe de erro base
export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
  }
}

// ✅ Erros específicos
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 400);
  }
}
```

### **🔄 Middleware:**
```typescript
// ✅ Middleware de logging automático
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  Logger.debug('Request received', {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip
  });
  next();
};

// ✅ Handler de erro centralizado
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  Logger.error('Error occurred', error);
  
  res.status(500).json({
    status: 'ERROR',
    timestamp: new Date().toISOString(),
    error: error.message
  });
};
```

## ❌ O que NÃO PODE ter aqui:

### ❌ **Proibições:**
- ❌ **Lógica de negócio específica** (isso é Domain/Application)
- ❌ **Integrações com APIs específicas** (isso é Infrastructure)
- ❌ **Controllers ou rotas** (isso é Presentation)
- ❌ **Use Cases** (isso é Application)

### ❌ **Exemplos proibidos:**
```typescript
// ❌ NUNCA FAÇA ISSO NO SHARED!

// ❌ Lógica de negócio específica
export class PhasmophobiaBusinessLogic { // ❌ Muito específico
  calculateNewsPopularity() { // ❌ Regra de negócio específica
    // isso pertence ao Application
  }
}

// ❌ Integração específica com API
export class SteamApiClient { // ❌ Muito específico
  async getPhasmophobiaNews() { // ❌ Lógica de Infrastructure
    // isso pertence ao Infrastructure/services
  }
}

// ❌ Controller disfarçado
export class NewsHelper { // ❌ Parece util mas é controller
  async handleNewsRequest(req: Request, res: Response) { // ❌ Lógica de Presentation
    // isso pertence ao Presentation/controllers
  }
}
```

## 📁 Estrutura atual:

```
shared/
├── constants/
│   └── config.ts              # ✅ Configurações globais
├── exceptions/
│   └── AppError.ts            # ✅ Classes de erro customizadas
├── interfaces/
│   └── IResponse.ts           # ✅ Interfaces de resposta
├── middleware/
│   ├── errorHandler.ts        # ✅ Tratamento centralizado de erros
│   └── requestLogger.ts       # ✅ Logging automático de requests
└── utils/
    ├── ApiClient.ts           # ✅ Cliente HTTP configurado
    ├── asyncHandler.ts        # ✅ Wrapper para captura de erros
    └── Logger.ts              # ✅ Sistema de logging com cores
```

## 🔄 Dependências permitidas:

```
Shared → Bibliotecas externas APENAS (axios, express tipos, etc)
Shared → NÃO depende de outras camadas da aplicação
```

## 💡 Padrões recomendados:

### **📝 Nomenclatura:**
- **Classes**: `PascalCase` (Logger, ApiClient)
- **Funções**: `camelCase` (asyncHandler, formatDate)
- **Constantes**: `UPPER_SNAKE_CASE` ou `PascalCase` com `as const`
- **Interfaces**: `IPascalCase` ou `PascalCase`

### **🏗️ Critérios para adicionar no Shared:**

1. **🔄 Reutilizável**: Pode ser usado por 2+ camadas?
2. **🎯 Genérico**: Não é específico de um domínio?
3. **🔧 Utilitário**: É uma ferramenta/helper?
4. **🏗️ Infraestrutural**: Facilita desenvolvimento?

### **✅ Exemplos de coisas que DEVEM estar no Shared:**
```typescript
// ✅ Formatação de data (usado em várias camadas)
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

// ✅ Validação genérica (usado em várias camadas)
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ Constante global (usado por toda aplicação)
export const DEFAULT_PAGE_SIZE = 20;
```

### **❌ Exemplos de coisas que NÃO devem estar no Shared:**
```typescript
// ❌ Muito específico do domínio Phasmophobia
export const calculatePhasmophobiaScore = () => { /* ... */ };

// ❌ Lógica de negócio específica
export const validateNewsLimit = (limit: number) => {
  if (limit > 20) throw new Error('...');
};

// ❌ Integração específica
export const callSteamApi = () => { /* ... */ };
```

## 🎯 Tipos de utilitários recomendados:

### **📅 Manipulação de Data/Hora:**
```typescript
export const DateUtils = {
  formatISO: (date: Date) => date.toISOString(),
  addDays: (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
};
```

### **🔤 Manipulação de String:**
```typescript
export const StringUtils = {
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  slugify: (str: string) => str.toLowerCase().replace(/\s+/g, '-')
};
```

### **🔍 Validadores:**
```typescript
export const Validators = {
  isPositiveNumber: (num: number) => num > 0,
  isValidUrl: (url: string) => /^https?:\/\//.test(url)
};
```

## ✅ Checklist antes de adicionar algo:

- [ ] É reutilizável por múltiplas camadas?
- [ ] Não contém lógica de negócio específica?
- [ ] Não é integração com serviço específico?
- [ ] É uma ferramenta/utilitário genérico?
- [ ] Facilitaria o desenvolvimento?

**Se respondeu "sim" para todas, pode adicionar no Shared! 🛠️**

## 🎯 Regra de Ouro:

> **"Shared é como uma oficina de ferramentas - deve ter ferramentas úteis que qualquer pessoa pode usar, mas não deve fazer o trabalho específico de ninguém!"**
