# 🔌 Infrastructure Layer - Serviços Externos e Integrações

A camada **Infrastructure** é responsável por **implementar interfaces** e **conectar com serviços externos**. Aqui ficam as implementações concretas que fazem a ponte com o mundo exterior.

## 📋 O que PODE ter aqui:

### ✅ **Services (services/)**
- ✅ **Integração com APIs externas** (Steam, GitHub, etc)
- ✅ **Implementações de banco de dados** (MongoDB, PostgreSQL)
- ✅ **Clientes HTTP** configurados (Axios)
- ✅ **Implementações de cache** (Redis)
- ✅ **Integração com filas** (RabbitMQ, AWS SQS)
- ✅ **Serviços de email** (SendGrid, AWS SES)

### ✅ **Exemplos permitidos:**
```typescript
// ✅ Serviço que integra com API externa
export class SteamApiService {
  private steamApi: AxiosInstance;

  constructor() {
    this.steamApi = axios.create({
      baseURL: 'https://api.steampowered.com',
      timeout: 10000
    });
  }

  async getPhasmophobiaNews(limit: number): Promise<SteamNewsItem[]> {
    // ✅ Implementação específica da Steam API
    const response = await this.steamApi.get('/ISteamNews/GetNewsForApp/v0002/', {
      params: { appid: '739630', count: limit }
    });
    
    return response.data.appnews.newsitems;
  }
}

// ✅ Implementação de cache
export class RedisService {
  private client: Redis;

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}
```

## ❌ O que NÃO PODE ter aqui:

### ❌ **Proibições:**
- ❌ **Lógica de negócio** (isso é Domain/Application)
- ❌ **Validações de aplicação** (isso é Application)
- ❌ **Lógica de apresentação** (isso é Presentation)
- ❌ **Transformações complexas** de dados (isso é Application)

### ❌ **Exemplos proibidos:**
```typescript
// ❌ NUNCA FAÇA ISSO NA INFRASTRUCTURE!
export class BadSteamService {
  async getPhasmophobiaNews(limit: number) {
    // ❌ Validação de negócio - pertence ao Use Case
    if (limit <= 0 || limit > 20) {
      throw new Error('Invalid limit');
    }

    const response = await axios.get('...');
    
    // ❌ Transformação para formato da aplicação - pertence ao Use Case
    return response.data.map(item => ({
      id: item.gid,
      title: item.title,
      publishedAt: new Date(item.date * 1000).toISOString() // ❌ Lógica de aplicação
    }));
  }
}
```

## 🎯 Responsabilidades da Infrastructure:

### 1. **🌐 Integração com APIs Externas**
```typescript
// Configuração e chamadas para APIs
const response = await this.steamApi.get('/endpoint', { params });
return response.data; // Retorna dados "crus" da API
```

### 2. **🗃️ Persistência de Dados**
```typescript
// Operações de banco de dados
async save(entity: SomeEntity): Promise<void> {
  await this.repository.save(entity);
}
```

### 3. **⚡ Serviços de Cache**
```typescript
// Operações de cache
async getCached(key: string): Promise<any> {
  return await this.redis.get(key);
}
```

### 4. **📧 Serviços de Comunicação**
```typescript
// Envio de emails, notificações, etc
async sendEmail(to: string, subject: string): Promise<void> {
  await this.emailService.send({ to, subject });
}
```

## 📁 Estrutura atual:

```
infrastructure/
└── services/
    └── SteamApiService.ts    # ✅ Integração com Steam API
```

## 🔄 Dependências permitidas:

```
Infrastructure → Domain (para conhecer entidades)
Infrastructure → Shared (para utilitários como Logger)
Infrastructure → Bibliotecas externas (axios, redis, etc)
```

## 💡 Padrões recomendados:

### **📝 Nomenclatura:**
- `[Nome]ApiService` - Para integração com APIs
- `[Nome]Repository` - Para banco de dados
- `[Nome]CacheService` - Para cache
- `[Nome]EmailService` - Para email

### **🏗️ Estrutura padrão:**
```typescript
export class SteamApiService {
  private client: AxiosInstance;

  constructor() {
    // Configuração do cliente
    this.client = axios.create({...});
  }

  async operacao(parametros: Tipo): Promise<TipoResposta> {
    // Implementação específica da integração
    const response = await this.client.get('/endpoint');
    return response.data; // Dados "crus"
  }
}
```

### **🔧 Configuração centralizada:**
```typescript
// ✅ Use configurações do shared/constants
import { AppConfig } from '@/shared/constants/config';

this.steamApi = axios.create({
  baseURL: AppConfig.STEAM_API_BASE_URL,
  timeout: AppConfig.API_TIMEOUT
});
```

## ⚠️ Armadilhas comuns:

### **❌ Misturar responsabilidades:**
```typescript
// ❌ Ruim - mistura Infrastructure com Application
async getNewsForUser(userId: string, limit: number) {
  // ❌ Validação (deveria ser no Use Case)
  if (limit > 20) throw new Error('...');
  
  const news = await this.api.get('...');
  
  // ❌ Transformação (deveria ser no Use Case)  
  return news.map(n => ({ ...n, formatted: true }));
}

// ✅ Bom - só responsabilidade de Infrastructure
async getRawNews(limit: number): Promise<RawNewsData[]> {
  const response = await this.api.get('/news', { params: { limit } });
  return response.data.newsitems; // Dados "crus" da API
}
```

## ✅ Checklist antes de adicionar algo:

- [ ] É integração com serviço externo?
- [ ] Não contém lógica de negócio?
- [ ] Não faz validações de aplicação?
- [ ] Retorna dados "crus" sem transformações complexas?
- [ ] Usa bibliotecas externas para implementação?

**Se respondeu "sim" para todas, pode adicionar na Infrastructure! 🔌**

## 🎯 Regra de Ouro:

> **"Infrastructure é como o encanamento da casa - conecta tudo com o mundo exterior, mas não decide o que fazer com a água!"**
