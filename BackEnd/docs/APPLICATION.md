# 🧠 Application Layer - Casos de Uso e Orquestração

A camada **Application** contém a **lógica específica da aplicação**. Aqui ficam os **Use Cases** que orquestram o fluxo de dados e aplicam regras de negócio da aplicação.

## 📋 O que PODE ter aqui:

### ✅ **Use Cases (use-cases/)**
- ✅ **Orquestração** de chamadas entre diferentes serviços
- ✅ **Validações de aplicação** (ex: limite de 1-20 notícias)
- ✅ **Transformação de dados** entre camadas
- ✅ **Coordenação** de múltiplas operações
- ✅ **Regras de negócio específicas** da aplicação

### ✅ **Exemplos permitidos:**
```typescript
// ✅ Use Case que orquestra e valida
export class GetPhasmophobiaNewsUseCase {
  constructor(private steamService: SteamApiService) {}

  async execute(limit: number): Promise<PhasmophobiaNews[]> {
    // ✅ Validação de aplicação
    if (limit <= 0 || limit > 20) {
      throw new Error('Limit must be between 1 and 20');
    }

    // ✅ Orquestração - chama serviço externo
    const steamNews = await this.steamService.getPhasmophobiaNews(limit);

    // ✅ Transformação - converte formato Steam para formato da app
    return steamNews.map(item => ({
      id: item.gid,
      title: item.title,
      content: item.contents,
      author: item.author,
      publishedAt: new Date(item.date * 1000).toISOString(),
      url: item.url
    }));
  }
}
```

## ❌ O que NÃO PODE ter aqui:

### ❌ **Proibições:**
- ❌ **Chamadas diretas para APIs** externas (use Infrastructure)
- ❌ **Lógica de apresentação** (HTTP status, headers, etc)
- ❌ **Dependências de Express** (Request, Response)
- ❌ **Lógica de banco de dados** direta
- ❌ **Formatação para frontend** específica

### ❌ **Exemplos proibidos:**
```typescript
// ❌ NUNCA FAÇA ISSO NO APPLICATION!
import { Request, Response } from 'express'; // ❌ Dependência de apresentação
import axios from 'axios'; // ❌ Deve ser abstraído pela Infrastructure

export class BadNewsUseCase {
  async execute(req: Request, res: Response) { // ❌ Lógica de apresentação
    // ❌ Chamada direta para API
    const response = await axios.get('https://api.steam...');
    
    // ❌ Formatação de resposta HTTP
    res.json({ data: response.data }); // ❌ Isso é responsabilidade da Presentation
  }
}
```

## 🎯 Responsabilidades dos Use Cases:

### 1. **🎭 Orquestração**
```typescript
// Coordena múltiplas operações
const news = await this.steamService.getNews(limit);
const processedNews = this.processNews(news);
await this.cacheService.store(processedNews);
return processedNews;
```

### 2. **🔍 Validação de Aplicação**
```typescript
// Regras específicas da aplicação
if (limit <= 0 || limit > 20) {
  throw new Error('Limit must be between 1 and 20');
}
```

### 3. **🔄 Transformação de Dados**
```typescript
// Converte dados entre formatos
return steamNews.map(item => ({
  id: item.gid,
  title: item.title,
  publishedAt: new Date(item.date * 1000).toISOString()
}));
```

## 📁 Estrutura atual:

```
application/
└── use-cases/
    ├── GetHealthStatusUseCase.ts       # ✅ Health check da aplicação  
    └── GetPhasmophobiaNewsUseCase.ts   # ✅ Busca e processa notícias
```

## 🔄 Dependências permitidas:

```
Application → Domain (entidades)
Application → Infrastructure (serviços)
Application → Shared (utilitários)
```

## 💡 Padrões recomendados:

### **📝 Nomenclatura:**
- `Get[Algo]UseCase` - Para buscar dados
- `Create[Algo]UseCase` - Para criar algo
- `Update[Algo]UseCase` - Para atualizar
- `Delete[Algo]UseCase` - Para deletar

### **🏗️ Estrutura padrão:**
```typescript
export class MeuUseCase {
  constructor(
    private serviceDependencia: AlgumService
  ) {}

  async execute(parametros: TipoParametro): Promise<TipoRetorno> {
    // 1. Validações
    // 2. Orquestração  
    // 3. Transformação
    // 4. Retorno
  }
}
```

## ✅ Checklist antes de adicionar algo:

- [ ] É lógica específica da aplicação?
- [ ] Não faz chamadas diretas para APIs externas?
- [ ] Não depende de Express/HTTP?
- [ ] Orquestra ou transforma dados?
- [ ] Contém regras de validação da aplicação?

**Se respondeu "sim" para todas, pode adicionar na Application! 🧠**

## 🎯 Regra de Ouro:

> **"Use Cases devem ser como maestros de orquestra - coordenam tudo, mas não tocam os instrumentos diretamente!"**
