# Sistema de Gerenciamento de Projetos de Extensão

## 📋 Descrição
Sistema web completo para gerenciar projetos de extensão acadêmica, desenvolvido com Node.js, Express, MySQL e Bootstrap.

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js v14+
- MySQL 8.0
- npm ou yarn

### Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente (.env):**
```
DB_HOST=127.0.0.1
DB_USER=*******
DB_PASSWORD=***************
DB_NAME=projetos_extensao
DB_PORT=3306
NODE_ENV=development
PORT=3000
```

3. **Iniciar servidor:**
```bash
npm start
```

4. **Acessar:**
- URL: http://localhost:3000/login
- Usuário: `admin`
- Senha: `admin123`

## 📱 Funcionalidades

### ✅ 16 Módulos CRUD Completos

#### Módulos Principais:
- **Pessoas** - Gerenciar pessoas do sistema
- **Projetos de Extensão** - Criar e gerenciar projetos
- **Avaliações Institucionais** - Registrar avaliações
- **Cursos** - Gerenciar cursos
- **Tipos de Pessoa** - Categorias de pessoas
- **Faixas Etárias** - Faixas etárias disponíveis
- **Escolaridades** - Níveis de escolaridade

#### Módulos de Configuração:
- **Tipos de Instituição** - Tipos/categorias de instituições
- **Instituições** - Cadastro de instituições
- **Tipos de Plano** - Categorias de planos
- **Públicos-Alvo** - Públicos-alvo dos projetos
- **Tipos de Ação** - Tipos de ação executada
- **Linhas Programáticas** - Linhas programáticas
- **Papéis do Projeto** - Papéis/funções no projeto
- **Locais de Execução** - Endereços de execução

## 🏗️ Arquitetura

```
projeto_extensao/
├── models/              # Modelos de banco de dados (16 arquivos)
├── controllers/         # Controladores (16 arquivos)
├── routes/              # Rotas/endpoints (9 arquivos)
├── views/
│   ├── forms/          # Formulários de cadastro (16 arquivos)
│   ├── consultas/      # Tabelas de listagem (16 arquivos)
│   ├── cabecalho.ejs   # Header comum
│   ├── rodape.ejs      # Footer comum
│   ├── login.ejs       # Página de login
│   └── dashboard.ejs   # Dashboard principal
├── middleware/
│   └── authMiddleware.js
├── public/
│   └── css/
│       └── styles.css
├── db.js               # Configuração do banco
├── server.js           # Arquivo principal
├── package.json
└── .env               # Variáveis de ambiente
```

## 🔐 Autenticação

- Sistema de login com session-based authentication
- Expiração de sessão: 24 horas
- Cookies HttpOnly para segurança
- Rota `/logout` para sair do sistema

## 🎨 Interface

- Bootstrap 5.3.3 para layout responsivo
- Bootstrap Icons para ícones temáticos
- Design moderno e intuitivo
- Dashborad com menu lateral navegável
- Tabelas responsivas com busca/filtro
- Formulários validados

## 📊 Banco de Dados

- MySQL 8.0
- Database: `projetos_extensao`
- 20+ tabelas relacionadas
- Suporte a múltiplos relacionamentos

## 🔌 Endpoints Disponíveis

### Autenticação
- `GET /login` - Página de login
- `POST /login` - Processar login
- `GET /logout` - Fazer logout
- `GET /logo` - Dashboard

### Para cada módulo (exemplo: `/pessoa`):
- `GET /pessoa` - Listar todos
- `POST /pessoa/filtro` - Buscar
- `GET /pessoa/forms/pessoa` - Formulário novo
- `POST /pessoa/cadastrar` - Criar novo
- `GET /pessoa/:id/edit` - Formulário editar
- `POST /pessoa/:id/edit` - Atualizar
- `POST /pessoa/:id/delete` - Excluir

### Módulos disponíveis:
```
/curso
/pessoa
/tipo_pessoa
/faixa_etaria
/escolaridade
/projeto_extensao
/avaliacao_institucional
/tipo_instituicao
/instituicao
/tipo_plano
/publico_alvo
/tipo_acao
/linha_programatica
/papel_projeto
/local_execucao
```

## 🛠️ Scripts npm

```bash
npm start          # Iniciar servidor em produção
npm run dev        # Iniciar com nodemon (desenvolvimento)
npm install        # Instalar dependências
```

## 📦 Dependências

- **express** - Framework web
- **mysql2/promise** - Driver MySQL assíncrono
- **ejs** - Template engine
- **dotenv** - Variáveis de ambiente
- **express-session** - Gerenciamento de sessão
- **nodemon** - Auto-reload em desenvolvimento

## 🎯 Como Usar

1. **Fazer Login:**
   - Acessar http://localhost:3000/login
   - Usar credenciais: admin / admin123

2. **Acessar Módulos:**
   - Clicar no menu lateral ou cards do dashboard
   - Cada módulo tem interface consistente

3. **Operações CRUD:**
   - **Listar:** Clique no módulo no menu
   - **Buscar:** Use o campo de busca/filtro
   - **Criar:** Clique em "Novo" ou "Nova"
   - **Editar:** Clique no ícone de lápis na tabela
   - **Excluir:** Clique no ícone de lixeira (com confirmação)

4. **Sair:**
   - Clique em "Sair" no menu lateral ou dashboard

## 🐛 Troubleshooting

### Servidor não inicia
- Verifique se MySQL está rodando
- Verifique credenciais no .env
- Verifique porta 3000 está disponível

### Banco de dados não conecta
- Verifique MySQL está rodando: `net start MySQL80`
- Verifique credenciais
- Verifique database `projetos_extensao` existe

### Erros de template
- Verifique arquivos .ejs em `views/`
- Verifique caminho de includes (`../cabecalho`, `../rodape`)

## 📝 Notas

- Todos os módulos seguem o mesmo padrão MVC
- Session timeout: 24 horas
- Confirmação antes de excluir registros
- Busca sensível (não case-sensitive)

## 👨‍💻 Desenvolvimento

Para contribuir:
1. Criar nova branch
2. Fazer alterações
3. Testar localmente
4. Fazer commit
5. Push e criar PR

## 📄 Licença

Projeto educacional - UNI•CET 2025

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação de cada módulo ou entre em contato com o desenvolvedor.

---

**Status:** ✅ Projeto 100% Funcional
**Última atualização:** 27/11/2025
