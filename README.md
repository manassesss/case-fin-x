# Case Fin-X - Otimização de Consulta dos Agendamentos Cirúrgicos

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como case técnico para a Fin-X, com o objetivo de criar uma listagem otimizada de solicitações cirúrgicas, melhorando a usabilidade e performance em relação às telas anteriores. A solução implementa paginação, filtros avançados e ordenação para facilitar a consulta de agendamentos cirúrgicos.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript progressivo com Composition API
- **Vue Router 4** - Sistema de roteamento oficial do Vue
- **Vite** - Build tool e dev server de alta performance
- **Tailwind CSS** - Framework CSS utilitário para design responsivo
- **ESLint** - Linter para garantir qualidade de código
- **Prettier** - Formatador de código
- **json-server** - Mock da API REST para desenvolvimento

## 📦 Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd case-fin-x
```

2. Instale as dependências:

```bash
npm install
```

## 🏃 Como Executar

### Opção 1: Executar tudo de uma vez (Recomendado)

```bash
npm run dev:all
```

Isso iniciará o servidor mockado da API e o frontend simultaneamente.

### Opção 2: Executar separadamente

**Terminal 1 - Servidor Mock da API:**

```bash
npm run server
```

O servidor estará disponível em `http://localhost:3001`

**Terminal 2 - Frontend:**

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📡 API Mock

**Endpoint:** `GET http://localhost:3001/api/agendamentos`

**Query Params:**

- `paginaAtual` (int) - Número da página atual
- `itensPorPagina` (int) - Quantidade de itens por página
- `dataCriacao` (string) - Filtro por data de criação (YYYY-MM-DD)
- `dataAgendamento` (string) - Filtro por data de agendamento (YYYY-MM-DD)
- `busca` (string) - Busca por nome de médico ou paciente
- `ordenacao` (string) - Ordenação: 'ASC' ou 'DESC' (padrão: 'DESC')

**Exemplos:**

```bash
# Listar todos os agendamentos
GET http://localhost:3001/api/agendamentos

# Com paginação
GET http://localhost:3001/api/agendamentos?paginaAtual=1&itensPorPagina=10

# Com filtros
GET http://localhost:3001/api/agendamentos?paginaAtual=1&itensPorPagina=10&busca=afonso&ordenacao=DESC

# Com filtro de data
GET http://localhost:3001/api/agendamentos?dataCriacao=2024-09-20&dataAgendamento=2024-10-05
```

## ✅ Funcionalidades Implementadas

### Funcionalidades Obrigatórias:
- ✅ Listagem de agendamentos cirúrgicos
- ✅ Exibição de dados do médico (nome + imagem/inicial)
- ✅ Exibição de dados do paciente (nome + idade)
- ✅ Exibição de data de criação e data de agendamento
- ✅ Filtro por médico ou paciente
- ✅ Paginação (topo e rodapé)
- ✅ Ordenação por data (ASC/DESC)
- ✅ Mock da API com json-server
- ✅ Chamadas GET dinâmicas

### Funcionalidades Extras:
- ✅ Filtro por data de criação (calendário)
- ✅ Filtro por data de agendamento (calendário)
- ✅ Design moderno e responsivo com Tailwind CSS
- ✅ Cores da paleta Fin-X aplicadas
- ✅ Estados de loading e erro bem tratados
- ✅ Botão "Limpar filtros"
- ✅ Contador de resultados ("X de Y")
- ✅ Imagens de médicos com fallback para inicial
- ✅ Logo da empresa no header
- ✅ Tabela responsiva
- ✅ Feedback visual em todas as interações
- ✅ Sistema de rotas com Vue Router

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento (frontend)
- `npm run server` - Inicia o servidor mockado da API (porta 3001)
- `npm run dev:all` - Inicia o servidor mockado e o frontend simultaneamente
- `npm run build` - Gera a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o ESLint e corrige problemas automaticamente
- `npm run format` - Formata o código com Prettier

## 🔗 Links Úteis

- [Documentação Vue.js](https://vuejs.org/)
- [Documentação Vue Router](https://router.vuejs.org/)
- [Documentação Vite](https://vitejs.dev/)
- [Documentação Tailwind CSS](https://tailwindcss.com/)
- [Site Fin-X](https://finxapp.com.br/)
