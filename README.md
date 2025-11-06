# Case Fin-X - Otimização de Consulta dos Agendamentos Cirúrgicos

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como case técnico para a Fin-X, com o objetivo de criar uma listagem otimizada de solicitações cirúrgicas, melhorando a usabilidade e performance em relação às telas anteriores.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript progressivo
- **Vue Router 4** - Sistema de roteamento oficial do Vue
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **ESLint** - Linter para garantir qualidade de código
- **Prettier** - Formatador de código
- **json-server** - Mock da API REST

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

### Mock da API

Primeiro, inicie o servidor mockado da API:

```bash
npm run server
```

O servidor estará disponível em `http://localhost:3001`

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
GET http://localhost:3001/api/agendamentos?paginaAtual=1&itensPorPagina=3

# Com filtro de data
GET http://localhost:3001/api/agendamentos?dataCriacao=2024-09-20T12:00:00Z

# Com paginação e filtro
GET http://localhost:3001/api/agendamentos?paginaAtual=1&itensPorPagina=3&dataCriacao=2024-09-20T12:00:00Z
```

### Desenvolvimento

Em um terminal separado, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

**Ou execute ambos simultaneamente:**

```bash
npm run dev:all
```

Isso iniciará o servidor mockado e o frontend ao mesmo tempo.

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento (frontend)
- `npm run server` - Inicia o servidor mockado da API (porta 3001)
- `npm run dev:all` - Inicia o servidor mockado e o frontend simultaneamente
- `npm run build` - Gera a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o ESLint e corrige problemas automaticamente
- `npm run format` - Formata o código com Prettier

## 📁 Estrutura do Projeto

```
case-fin-x/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/         # Recursos (imagens, fontes, etc)
│   ├── components/     # Componentes Vue reutilizáveis
│   │   └── AgendamentosList.vue
│   ├── composables/    # Composables Vue (lógica reutilizável)
│   │   └── useAgendamentos.js
│   ├── router/         # Configuração de rotas
│   │   └── index.js    # Definição de rotas e navigation guards
│   ├── services/       # Serviços de API
│   │   └── api.js
│   ├── utils/          # Funções utilitárias
│   │   └── dateUtils.js
│   ├── views/          # Views/páginas (rotas)
│   │   └── AgendamentosView.vue
│   ├── App.vue         # Componente raiz (usa router-view)
│   ├── main.js         # Ponto de entrada da aplicação
│   └── style.css       # Estilos globais
├── db.json             # Dados mockados da API
├── server.cjs          # Servidor mockado (json-server)
├── tailwind.config.js  # Configuração do Tailwind CSS
├── postcss.config.js   # Configuração do PostCSS
├── eslint.config.js    # Configuração do ESLint
├── .prettierrc.json    # Configuração do Prettier
├── vite.config.js      # Configuração do Vite
└── package.json        # Dependências do projeto
```

## 🛣️ Sistema de Rotas

O projeto utiliza **Vue Router 4** para gerenciamento de rotas, demonstrando:

- ✅ **Eficiência**: Uso de `createWebHistory` para URLs limpas
- ✅ **Navigation Guards**: `beforeEach` para atualização de título da página
- ✅ **Scroll Behavior**: Comportamento customizado de scroll ao navegar
- ✅ **Meta Fields**: Metadados nas rotas (título, autenticação, etc.)
- ✅ **Lazy Loading**: Estrutura preparada para code splitting
- ✅ **Programmatic Navigation**: Uso de `useRoute` e `useRouter` nos componentes

### Rotas Disponíveis:

- `/` - Redireciona para `/agendamentos`
- `/agendamentos` - Listagem de agendamentos cirúrgicos
- `/*` - Rota catch-all que redireciona para `/agendamentos` (404)

### Exemplo de Navegação Programática:

```javascript
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Navegar programaticamente
router.push('/agendamentos')

// Acessar informações da rota atual
console.log(route.name)      // Nome da rota
console.log(route.params)    // Parâmetros dinâmicos
console.log(route.query)     // Query parameters
```

## ✅ Checklist de Implementação

### Setup Inicial

- [x] Projeto Vue.js 3 inicializado com Vite
- [x] ESLint configurado
- [x] Prettier configurado
- [x] .gitignore configurado
- [x] Scripts de lint e format adicionados
- [x] Estrutura de pastas organizada

### Backend/Mock

- [x] Mock da API com json-server configurado
- [x] Endpoint `/api/agendamentos` com paginação e filtros
- [x] Servidor mockado funcionando na porta 3001

### Frontend

- [x] Tela de listagem de agendamentos implementada
- [x] Exibição de nome do médico
- [x] Exibição de nome e idade do paciente
- [x] Exibição de data de criação formatada
- [x] Paginação implementada na interface
- [x] Loading e estados de erro tratados
- [x] Proxy configurado no Vite para evitar CORS
- [x] Tailwind CSS configurado e integrado
- [x] Design responsivo com Tailwind
- [x] Cores da paleta Fin-X aplicadas no Tailwind

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

## 📝 Próximos Passos (Opcional)

1. Adicionar testes unitários
2. Implementar roteamento se necessário
3. Adicionar mais atributos de acessibilidade
4. Considerar internacionalização (i18n)

## 🔗 Links Úteis

- [Documentação Vue.js](https://vuejs.org/)
- [Documentação Vite](https://vitejs.dev/)
- [Site Fin-X](https://finxapp.com.br/)
