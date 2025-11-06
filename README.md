# Case Fin-X - Otimização de Consulta dos Agendamentos Cirúrgicos

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como case técnico para a Fin-X, com o objetivo de criar uma listagem otimizada de solicitações cirúrgicas, melhorando a usabilidade e performance em relação às telas anteriores.

## 🚀 Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript progressivo
- **Vite** - Build tool e dev server
- **ESLint** - Linter para garantir qualidade de código
- **Prettier** - Formatador de código

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

### Desenvolvimento

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

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o ESLint e corrige problemas automaticamente
- `npm run format` - Formata o código com Prettier

## 📁 Estrutura do Projeto

```
case-fin-x/
├── public/          # Arquivos estáticos
├── src/
│   ├── assets/      # Recursos (imagens, fontes, etc)
│   ├── components/  # Componentes Vue reutilizáveis
│   ├── App.vue      # Componente raiz
│   ├── main.js      # Ponto de entrada da aplicação
│   └── style.css    # Estilos globais
├── .eslintrc.cjs    # Configuração do ESLint
├── .prettierrc.json # Configuração do Prettier
├── vite.config.js   # Configuração do Vite
└── package.json     # Dependências do projeto
```

## ✅ Checklist de Setup

- [x] Projeto Vue.js 3 inicializado com Vite
- [x] ESLint configurado
- [x] Prettier configurado
- [x] .gitignore configurado
- [x] Scripts de lint e format adicionados
- [x] Estrutura de pastas organizada

## 📝 Próximos Passos

1. Implementar listagem de agendamentos cirúrgicos
2. Adicionar filtros por médico e paciente
3. Implementar paginação
4. Implementar ordenação por data
5. Criar mock da API com json-server
6. Melhorar UX/UI seguindo o design da Fin-X

## 🔗 Links Úteis

- [Documentação Vue.js](https://vuejs.org/)
- [Documentação Vite](https://vitejs.dev/)
- [Site Fin-X](https://finxapp.com.br/)
