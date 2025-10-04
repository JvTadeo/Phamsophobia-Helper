# 🏛️ Clean Architecture - Visão Geral Completa

Este documento explica **como as camadas se relacionam** e **por que** usamos Clean Architecture no projeto Phasmophobia Helper.

## 🎯 O que é Clean Architecture?

Clean Architecture é um **padrão arquitetural** que organiza o código em **camadas independentes**, onde cada camada tem uma **responsabilidade específica** e **regras claras de dependência**.

### 🔄 Regra Fundamental de Dependência:

```
📱 Presentation → 🧠 Application → 🧬 Domain
     ↓              ↓              ↑
🔌 Infrastructure → 🛠️ Shared ←─────┘
```

- **Camadas internas** (Domain) não conhecem camadas externas
- **Camadas externas** podem depender de camadas internas
- **Shared** pode ser usado por todas as camadas

## 🏗️ Camadas Detalhadas

### 1. 🧬 **Domain (Coração)**
```typescript
// ✅ O que vai aqui
interface PhasmophobiaNews {
  id: string;
  title: string;
  content: string;
}
```
- **🎯 Propósito**: Entidades e regras de negócio puras
- **🔗 Depende de**: NADA (independente)
- **📋 Contém**: Interfaces, tipos, modelos de dados
- **❌ NÃO contém**: Lógica de aplicação, HTTP, banco de dados

### 2. 🧠 **Application (Cérebro)**
```typescript
// ✅ O que vai aqui
class GetPhasmophobiaNewsUseCase {
  async execute(limit: number): Promise<PhasmophobiaNews[]> {
    // Validação, orquestração, transformação
  }
}
```
- **🎯 Propósito**: Casos de uso e orquestração
- **🔗 Depende de**: Domain, Infrastructure, Shared
- **📋 Contém**: Use Cases, lógica de aplicação
- **❌ NÃO contém**: HTTP, banco específico, frameworks

### 3. 🔌 **Infrastructure (Mãos)**
```typescript
// ✅ O que vai aqui
class SteamApiService {
  async getPhasmophobiaNews(): Promise<RawSteamData[]> {
    // Chamada para API externa
  }
}
```
- **🎯 Propósito**: Integração com mundo exterior
- **🔗 Depende de**: Domain, Shared, bibliotecas externas
- **📋 Contém**: APIs, banco de dados, cache, email
- **❌ NÃO contém**: Lógica de negócio, validações de aplicação

### 4. 🌐 **Presentation (Boca)**
```typescript
// ✅ O que vai aqui
class NewsController {
  getNews = asyncHandler(async (req, res) => {
    // Recebe HTTP, chama Use Case, retorna JSON
  });
}
```
- **🎯 Propósito**: Interface HTTP com usuário
- **🔗 Depende de**: Application, Shared, Express
- **📋 Contém**: Controllers, rotas, middlewares HTTP
- **❌ NÃO contém**: Lógica de negócio, integrações diretas

### 5. 🛠️ **Shared (Ferramentas)**
```typescript
// ✅ O que vai aqui
class Logger {
  static info(message: string): void {
    // Logging reutilizável
  }
}
```
- **🎯 Propósito**: Utilitários compartilhados
- **🔗 Depende de**: Apenas bibliotecas externas
- **📋 Contém**: Logger, constantes, helpers, middlewares
- **❌ NÃO contém**: Lógica específica de domínio

## 🔄 Fluxo de uma Requisição

### **📱 Exemplo: GET /news?limit=5**

```
1. 🌐 Router → NewsController.getNews()
   📍 presentation/routes/index.ts
   
2. 🎯 Controller extrai parâmetros HTTP
   📍 presentation/controllers/NewsController.ts
   ↓ limit = 5
   
3. 🧠 Controller chama Use Case
   📍 application/use-cases/GetPhasmophobiaNewsUseCase.ts
   ↓ execute(5)
   
4. 🔍 Use Case valida parâmetros
   ↓ 1 <= 5 <= 20 ✅
   
5. 🔌 Use Case chama Infrastructure
   📍 infrastructure/services/SteamApiService.ts
   ↓ getPhasmophobiaNews(5)
   
6. 🌐 Service chama Steam API
   ↓ axios.get('https://api.steampowered.com/...')
   
7. 📊 Steam retorna dados brutos
   ↓ { appnews: { newsitems: [...] } }
   
8. 🔄 Use Case transforma dados
   ↓ Converte timestamp, organiza campos
   
9. 📤 Controller formata resposta HTTP
   ↓ { status: 'SUCCESS', data: [...], count: 5 }
   
10. ✅ Cliente recebe JSON
```

## 🎯 Benefícios da Clean Architecture

### ✅ **Testabilidade**
```typescript
// ✅ Fácil de testar - sem dependências externas
const useCase = new GetNewsUseCase(mockSteamService);
const result = await useCase.execute(5);
expect(result).toHaveLength(5);
```

### ✅ **Flexibilidade**
```typescript
// ✅ Trocar Steam por outra API é simples
class GameNewsService implements NewsService {
  // Mesma interface, implementação diferente
}
```

### ✅ **Manutenibilidade**
```typescript
// ✅ Cada camada tem responsabilidade clara
// Erro de validação? → Application
// Erro de API? → Infrastructure  
// Erro de HTTP? → Presentation
```

### ✅ **Reutilização**
```typescript
// ✅ Use Case pode ser usado em diferentes interfaces
// HTTP API, GraphQL, CLI, etc
const result = await getNewsUseCase.execute(10);
```

## 🚨 Erros Comuns e Como Evitar

### ❌ **Violação de Dependência**
```typescript
// ❌ ERRADO - Domain dependendo de Infrastructure
// domain/entities/News.ts
import axios from 'axios'; // ❌ Domain não pode conhecer axios

// ✅ CORRETO - Domain independente
export interface News {
  id: string;
  title: string;
}
```

### ❌ **Lógica no Lugar Errado**
```typescript
// ❌ ERRADO - Lógica de negócio no Controller
class NewsController {
  async getNews(req, res) {
    if (limit > 20) { // ❌ Validação deve estar no Use Case
      return res.status(400).json({...});
    }
  }
}

// ✅ CORRETO - Lógica no Use Case
class GetNewsUseCase {
  async execute(limit: number) {
    if (limit > 20) { // ✅ Validação no lugar certo
      throw new Error('Limit too high');
    }
  }
}
```

### ❌ **Misturar Responsabilidades**
```typescript
// ❌ ERRADO - Infrastructure com lógica de aplicação
class SteamService {
  async getNews(limit) {
    if (limit > 20) throw new Error('...'); // ❌ Validação não é responsabilidade
    
    const data = await axios.get('...');
    
    return data.map(item => ({ // ❌ Transformação não é responsabilidade
      publishedAt: new Date(item.date * 1000).toISOString()
    }));
  }
}

// ✅ CORRETO - Infrastructure só integra
class SteamService {
  async getRawNews(limit) {
    const response = await axios.get('...', { params: { count: limit } });
    return response.data.newsitems; // ✅ Só retorna dados brutos
  }
}
```

## 🧪 Como Adicionar Nova Funcionalidade

### **🎯 Exemplo: Adicionar contagem de jogadores**

#### 1. **🧬 Domain** - Criar entidade
```typescript
// domain/entities/PlayerCount.ts
export interface PlayerCount {
  currentPlayers: number;
  timestamp: string;
  popularity: 'HIGH' | 'MEDIUM' | 'LOW';
}
```

#### 2. **🔌 Infrastructure** - Criar serviço
```typescript
// infrastructure/services/SteamApiService.ts
async getCurrentPlayerCount(): Promise<number> {
  const response = await this.steamApi.get('/ISteamUserStats/...');
  return response.data.response.player_count;
}
```

#### 3. **🧠 Application** - Criar Use Case
```typescript
// application/use-cases/GetPlayerCountUseCase.ts
export class GetPlayerCountUseCase {
  async execute(): Promise<PlayerCount> {
    const count = await this.steamService.getCurrentPlayerCount();
    
    return {
      currentPlayers: count,
      timestamp: new Date().toISOString(),
      popularity: count > 10000 ? 'HIGH' : 'MEDIUM'
    };
  }
}
```

#### 4. **🌐 Presentation** - Criar endpoint
```typescript
// presentation/controllers/PlayerController.ts
export class PlayerController {
  getPlayerCount = asyncHandler(async (req, res) => {
    const result = await this.getPlayerCountUseCase.execute();
    res.json({ status: 'SUCCESS', data: result });
  });
}

// presentation/routes/index.ts
router.get('/players', playerController.getPlayerCount);
```

## 📚 Recursos para Aprofundamento

- 📖 [DOMAIN.md](./DOMAIN.md) - Entidades e regras de negócio
- 📖 [APPLICATION.md](./APPLICATION.md) - Use Cases e orquestração
- 📖 [INFRASTRUCTURE.md](./INFRASTRUCTURE.md) - Serviços externos
- 📖 [PRESENTATION.md](./PRESENTATION.md) - Controllers e rotas
- 📖 [SHARED.md](./SHARED.md) - Utilitários compartilhados

## 🎯 Resumo das Regras de Ouro

1. **🧬 Domain**: Independente de tudo, só regras de negócio puras
2. **🧠 Application**: Orquestra e aplica regras da aplicação
3. **🔌 Infrastructure**: Conecta com mundo exterior, dados brutos
4. **🌐 Presentation**: Interface HTTP, extrai/formata dados
5. **🛠️ Shared**: Ferramentas reutilizáveis, não específicas

---
**🏛️ Clean Architecture: Código organizado, testável e flexível!**
