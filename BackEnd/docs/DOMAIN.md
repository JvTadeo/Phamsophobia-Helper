# 🧬 Domain Layer - Entidades e Regras de Negócio

A camada **Domain** é o **coração** da aplicação. Aqui ficam as **entidades puras** e **regras de negócio** que são independentes de qualquer tecnologia externa.

## 📋 O que PODE ter aqui:

### ✅ **Entidades (entities/)**
- ✅ **Modelos de dados puros** (interfaces/classes)
- ✅ **Validações de negócio** básicas
- ✅ **Regras que NUNCA mudam** independente da tecnologia

### ✅ **Exemplos permitidos:**
```typescript
// ✅ Entidade pura - apenas dados e validações básicas
export interface PhasmophobiaNews {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  url: string;
}

// ✅ Entidade com validação de negócio
export interface Health {
  status: 'OK' | 'ERROR';
  timestamp: string;
  version: string;
  uptime: number;
}
```

## ❌ O que NÃO PODE ter aqui:

### ❌ **Proibições absolutas:**
- ❌ **Imports de bibliotecas externas** (axios, express, etc)
- ❌ **Chamadas para APIs** ou banco de dados
- ❌ **Lógica de apresentação** (HTTP, JSON, etc)
- ❌ **Dependências de frameworks**
- ❌ **Lógica de aplicação** complexa

### ❌ **Exemplos proibidos:**
```typescript
// ❌ NUNCA FAÇA ISSO NO DOMAIN!
import axios from 'axios'; // ❌ Dependência externa
import { Request } from 'express'; // ❌ Framework web

// ❌ Entidade com lógica de aplicação
export class NewsService {
  async fetchFromSteam() { // ❌ Lógica de aplicação
    // ❌ Isso pertence ao Application ou Infrastructure
  }
}
```

## 🎯 Regra de Ouro da Domain Layer:

> **"Se você remover Express, Axios, ou qualquer biblioteca externa, a Domain Layer deve continuar funcionando perfeitamente!"**

## 📁 Estrutura atual:

```
domain/
└── entities/
    ├── PhasmophobiaNews.ts    # ✅ Entidade para notícias
    └── Health.ts              # ✅ Entidade para health check
```

## 🔄 Dependências permitidas:

```
Domain → NADA! (independente de tudo)
```

## 💡 Dicas importantes:

1. **🧩 Pense nas entidades como "peças de LEGO"** - devem ser simples e reutilizáveis
2. **📝 Use apenas interfaces ou classes simples** sem lógica complexa  
3. **🔒 Regras de negócio aqui são IMUTÁVEIS** - não mudam com tecnologia
4. **🎪 Se precisa de axios/express, não é Domain!** - é Infrastructure ou Application

## ✅ Checklist antes de adicionar algo:

- [ ] É um modelo de dados puro?
- [ ] Não depende de bibliotecas externas?
- [ ] Representa uma regra de negócio fundamental?
- [ ] Seria útil mesmo mudando de Express para Fastify?
- [ ] Não tem lógica de aplicação complexa?

**Se respondeu "sim" para todas, pode adicionar na Domain! 🎉**
