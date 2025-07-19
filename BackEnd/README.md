# 🎮 Phasmophobia Helper - Backend API

Backend desenvolvido com **Clean Architecture**, **TypeScript**, **Express** e **tsup** para buscar notícias do jogo Phasmophobia através da Steam API.

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Desenvolvimento (com watch - recompila automaticamente)
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start
```

## 📡 Endpoints Disponíveis

| Método | Endpoint | Descrição | Exemplo |
|--------|----------|-----------|---------|
| `GET` | `/health` | Status da API | `http://localhost:3001/health` |
| `GET` | `/news` | Notícias do Phasmophobia | `http://localhost:3001/news?limit=5` |

### 📰 Endpoint de Notícias

```bash
# Buscar 5 notícias (padrão)
GET /news

# Buscar 10 notícias específicas
GET /news?limit=10

# Resposta de sucesso:
{
  "status": "SUCCESS",
  "timestamp": "2025-07-16T21:30:00.000Z",
  "data": [
    {
      "id": "12345",
      "title": "Nova atualização do Phasmophobia!",
      "content": "Descrição da notícia...",
      "author": "Kinetic Games",
      "publishedAt": "2025-07-16T20:00:00.000Z",
      "url": "https://steamcommunity.com/..."
    }
  ],
  "count": 5
}
```

## 🏗️ Arquitetura Clean Architecture

```
src/
├── 📁 domain/              # 🧬 Entidades e regras de negócio puras
│   └── entities/           # Modelos de dados (PhasmophobiaNews, Health)
├── 📁 application/         # 🧠 Casos de uso e lógica da aplicação  
│   └── use-cases/          # Orquestração e regras de negócio
├── 📁 infrastructure/      # 🔌 Serviços externos e APIs
│   └── services/           # Integração com Steam API, banco de dados, etc
├── 📁 presentation/        # 🌐 Controllers e rotas HTTP
│   ├── controllers/        # Manipuladores de requisições HTTP
│   └── routes/             # Definição das rotas da API
└── 📁 shared/              # 🛠️ Código compartilhado entre camadas
    ├── constants/          # Configurações e constantes globais
    ├── exceptions/         # Classes de erro customizadas
    ├── interfaces/         # Interfaces compartilhadas
    ├── middleware/         # Middlewares do Express
    └── utils/              # Utilitários (Logger, asyncHandler, etc)
```

### 📋 **Leia mais sobre cada camada:**
- 📖 [Domain Layer](./docs/DOMAIN.md) - Entidades e regras de negócio
- � [Application Layer](./docs/APPLICATION.md) - Casos de uso e orquestração  
- 📖 [Infrastructure Layer](./docs/INFRASTRUCTURE.md) - Serviços externos
- 📖 [Presentation Layer](./docs/PRESENTATION.md) - Controllers e rotas
- 📖 [Shared Layer](./docs/SHARED.md) - Utilitários compartilhados

## 🔧 Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **TypeScript** | ^5.0.0 | Tipagem estática e melhor DX |
| **Express** | ^4.18.2 | Framework web minimalista |
| **tsup** | ^8.5.0 | Build tool rápido com watch mode |
| **Axios** | ^1.10.0 | Cliente HTTP para Steam API |
| **CORS** | ^2.8.5 | Permitir requisições cross-origin |

## 🎯 Funcionalidades Implementadas

### ✅ **Sistema de Logging Avançado**
- 🎨 **Logs coloridos** com data/hora
- 🔍 **Diferentes níveis**: INFO, WARN, ERROR, DEBUG, SUCCESS
- 📝 **Log automático** de requisições HTTP
- 🎭 **Regex customizado** para colorização

### ✅ **Tratamento de Erros Robusto**
- 🔄 **asyncHandler** - Captura automática de erros async
- 🛡️ **Middleware de erro** centralizado
- 📋 **Respostas padronizadas** para diferentes tipos de erro
- 🚨 **Stack trace** em desenvolvimento

### ✅ **Integração com Steam API**
- 📰 **Busca de notícias** do Phasmophobia
- ⏱️ **Timeout configurável** (10s)
- 🔄 **Retry automático** e tratamento de falhas
- 🎯 **Transformação de dados** para formato da aplicação

### ✅ **Clean Architecture**
- 🏛️ **Separação clara** de responsabilidades
- 🔗 **Injeção de dependência** simples
- 🧪 **Testabilidade** alta
- 📦 **Modularidade** e reutilização

## 🚦 Como Funciona o Fluxo de Dados

```
🌐 Cliente HTTP
    ↓ (GET /news?limit=5)
🎯 Controller (NewsController)
    ↓ (executa caso de uso)
🧠 Use Case (GetPhasmophobiaNewsUseCase) 
    ↓ (valida e orquestra)
🔌 Service (SteamApiService)
    ↓ (chama Steam API)
📡 Steam API externa
    ↓ (retorna dados)
🔄 Transformação (Use Case)
    ↓ (formato da aplicação)
📤 Resposta JSON (Controller)
```

## 🐛 Tratamento de Erros

### **Erros Automaticamente Tratados:**
- ❌ **Validação**: `limit` fora do range (1-20)
- ❌ **Steam API**: Timeout, indisponibilidade, CORS
- ❌ **Rede**: Problemas de conectividade
- ❌ **JSON**: Formato inválido
- ❌ **404**: Rotas não encontradas

### **Exemplo de Resposta de Erro:**
```json
{
  "status": "ERROR",
  "timestamp": "2025-07-16T21:30:00.000Z", 
  "error": "Limit must be between 1 and 20"
}
```

## 📊 Monitoramento e Logs

### **Logs Disponíveis:**
```bash
# Requisições HTTP
🌐 16/07/2025 21:30:00 GET /news 200

# Casos de uso  
ℹ️ [INFO] 16/07/2025 21:30:00: Executing GetPhasmophobiaNews use case
✅ [SUCCESS] 16/07/2025 21:30:00: News transformation completed

# Erros
❌ [ERROR] 16/07/2025 21:30:00: Steam API is currently unavailable
```

## 🔮 Próximos Passos

- [ ] 📊 Adicionar contagem de jogadores online
- [ ] 🗃️ Implementar cache Redis
- [ ] 📈 Adicionar métricas e health checks avançados
- [ ] 🧪 Implementar testes unitários e de integração
- [ ] 🔐 Adicionar autenticação e rate limiting
- [ ] 📱 Documentação OpenAPI/Swagger

## 📞 Suporte

Para dúvidas sobre a arquitetura, consulte os arquivos de documentação em `./docs/` ou abra uma issue no repositório.

---
**Desenvolvido com ❤️ usando Clean Architecture**
