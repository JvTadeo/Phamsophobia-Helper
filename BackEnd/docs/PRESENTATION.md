# 🌐 Presentation Layer - Controllers e Rotas HTTP

A camada **Presentation** é a **porta de entrada** da aplicação. Aqui ficam os **Controllers** e **Rotas** que recebem requisições HTTP e coordenam com os Use Cases.

## 📋 O que PODE ter aqui:

### ✅ **Controllers (controllers/)**
- ✅ **Recebimento de requisições HTTP** (Request/Response)
- ✅ **Extração de parâmetros** (query, body, params)
- ✅ **Chamadas para Use Cases** (orquestração)
- ✅ **Formatação de respostas HTTP** (status codes, JSON)
- ✅ **Tratamento básico de erros** (com asyncHandler)

### ✅ **Routes (routes/)**
- ✅ **Definição de endpoints** (GET, POST, etc)
- ✅ **Mapeamento URL → Controller**
- ✅ **Aplicação de middlewares** específicos
- ✅ **Agrupamento de rotas** relacionadas

### ✅ **Exemplos permitidos:**
```typescript
// ✅ Controller que coordena HTTP com Use Cases
export class NewsController {
  constructor(private getNewsUseCase: GetPhasmophobiaNewsUseCase) {}

  // ✅ Extrai parâmetros HTTP e chama Use Case
  getNews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // ✅ Extração de parâmetros HTTP
    const limitParam = req.query.limit;
    const limit = limitParam ? Number(limitParam) : 5;

    // ✅ Chamada para Use Case (lógica de aplicação)
    const news = await this.getNewsUseCase.execute(limit);

    // ✅ Formatação de resposta HTTP
    res.json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      data: news,
      count: news.length
    });
  });
}

// ✅ Rotas que mapeiam URLs para Controllers
const router = Router();
router.get('/news', newsController.getNews);
router.get('/health', healthController.getHealth);
```

## ❌ O que NÃO PODE ter aqui:

### ❌ **Proibições:**
- ❌ **Lógica de negócio** (isso é Domain/Application)
- ❌ **Chamadas diretas para APIs** externas (isso é Infrastructure)
- ❌ **Validações complexas de negócio** (isso é Application)
- ❌ **Transformações de dados** complexas (isso é Application)
- ❌ **Acesso direto ao banco** (isso é Infrastructure)

### ❌ **Exemplos proibidos:**
```typescript
// ❌ NUNCA FAÇA ISSO NA PRESENTATION!
export class BadNewsController {
  async getNews(req: Request, res: Response) {
    const limit = Number(req.query.limit) || 5;

    // ❌ Validação de negócio - pertence ao Use Case
    if (limit <= 0 || limit > 20) {
      return res.status(400).json({ error: 'Invalid limit' });
    }

    // ❌ Chamada direta para API - pertence ao Infrastructure
    const response = await axios.get('https://api.steampowered.com/...');
    
    // ❌ Transformação de dados - pertence ao Use Case
    const transformedNews = response.data.newsitems.map(item => ({
      id: item.gid,
      title: item.title,
      publishedAt: new Date(item.date * 1000).toISOString()
    }));

    res.json({ data: transformedNews });
  }
}
```

## 🎯 Responsabilidades da Presentation:

### 1. **📥 Recebimento de Requisições**
```typescript
// Extrai dados da requisição HTTP
const { id } = req.params;
const { limit, filter } = req.query;
const { name, email } = req.body;
```

### 2. **🔗 Coordenação com Use Cases**
```typescript
// Chama o Use Case apropriado
const result = await this.someUseCase.execute(parameters);
```

### 3. **📤 Formatação de Respostas**
```typescript
// Formata resposta HTTP padronizada
res.status(200).json({
  status: 'SUCCESS',
  timestamp: new Date().toISOString(),
  data: result
});
```

### 4. **🚨 Delegação de Erros**
```typescript
// Usa asyncHandler para captura automática
getNews = asyncHandler(async (req, res) => {
  // Se der erro, asyncHandler captura automaticamente
  const result = await this.useCase.execute();
  res.json(result);
});
```

## 📁 Estrutura atual:

```
presentation/
├── controllers/
│   ├── HealthController.ts    # ✅ Controller para health check
│   └── NewsController.ts      # ✅ Controller para notícias
└── routes/
    └── index.ts               # ✅ Definição de todas as rotas
```

## 🔄 Dependências permitidas:

```
Presentation → Application (Use Cases)
Presentation → Shared (utilitários como Logger, asyncHandler)
Presentation → Express (Request, Response, Router)
```

## 💡 Padrões recomendados:

### **📝 Nomenclatura:**
- `[Nome]Controller` - Para controllers
- `[nome]Routes` - Para arquivos de rotas
- `get[Algo]`, `create[Algo]`, `update[Algo]`, `delete[Algo]` - Para métodos

### **🏗️ Estrutura padrão do Controller:**
```typescript
export class MyController {
  constructor(
    private myUseCase: MyUseCase
  ) {}

  // ✅ Usando asyncHandler para captura automática de erros
  getAction = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // 1. Extrair parâmetros
    const params = this.extractParams(req);
    
    // 2. Chamar Use Case
    const result = await this.myUseCase.execute(params);
    
    // 3. Resposta HTTP
    res.json({
      status: 'SUCCESS',
      data: result
    });
  });

  private extractParams(req: Request) {
    // ✅ Lógica simples de extração
    return {
      id: req.params.id,
      limit: Number(req.query.limit) || 10
    };
  }
}
```

### **🗺️ Estrutura padrão das Rotas:**
```typescript
import { Router } from 'express';
import { SomeController } from '../controllers/SomeController';

const router = Router();
const controller = new SomeController();

// ✅ Mapeamento simples URL → Controller
router.get('/endpoint', controller.getAction);
router.post('/endpoint', controller.createAction);

export { router as someRoutes };
```

## ⚡ asyncHandler - Captura Automática de Erros:

### **✅ Como usar:**
```typescript
// ✅ Com asyncHandler - erros capturados automaticamente
getNews = asyncHandler(async (req: Request, res: Response) => {
  const news = await this.useCase.execute(); // Se der erro, vai direto pro middleware
  res.json({ data: news });
});

// ❌ Sem asyncHandler - precisa de try/catch manual
async getNews(req: Request, res: Response, next: NextFunction) {
  try {
    const news = await this.useCase.execute();
    res.json({ data: news });
  } catch (error) {
    next(error); // Manual
  }
}
```

## 📊 Padrões de Resposta HTTP:

### **✅ Resposta de Sucesso:**
```typescript
res.json({
  status: 'SUCCESS',
  timestamp: new Date().toISOString(),
  data: result,
  count: result.length // Para arrays
});
```

### **✅ Resposta de Erro (automática via middleware):**
```typescript
// Não precisa fazer isso manualmente!
// O middleware de erro trata automaticamente:
{
  "status": "ERROR",
  "timestamp": "2025-07-16T21:30:00.000Z",
  "error": "Mensagem do erro"
}
```

## ✅ Checklist antes de adicionar algo:

- [ ] Lida com requisições/respostas HTTP?
- [ ] Não contém lógica de negócio?
- [ ] Delega processamento para Use Cases?
- [ ] Usa asyncHandler para captura de erros?
- [ ] Retorna respostas HTTP padronizadas?

**Se respondeu "sim" para todas, pode adicionar na Presentation! 🌐**

## 🎯 Regra de Ouro:

> **"Controllers são como recepcionistas - recebem a solicitação, direcionam para quem pode resolver, e entregam a resposta de volta!"**
