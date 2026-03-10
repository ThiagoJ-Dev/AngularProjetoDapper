# 💰 AngularProjetoDapper

Aplicação **Frontend desenvolvida em Angular** para gerenciamento financeiro, consumindo uma API desenvolvida em **ASP.NET Core utilizando Dapper**.

O sistema permite visualizar informações financeiras, registrar transações e acompanhar dados através de um **dashboard interativo**.

---

# 📷 Visão Geral

O projeto possui uma interface moderna construída com Angular que se comunica com uma API backend para:

- Gerenciar transações financeiras
- Visualizar categorias de gastos
- Exibir relatórios e dashboards
- Criar e editar registros financeiros

---

# 🛠️ Tecnologias Utilizadas

### Frontend
- Angular
- TypeScript
- Angular Material
- HTML5
- CSS3

### Integração
- Consumo de API REST
- Comunicação com backend ASP.NET Core

---

# 📂 Estrutura do Projeto

```
src
 ├── app
 │   ├── dashboard-component
 │   ├── home-component
 │   ├── editar-criar-modal-component
 │   ├── models
 │   ├── services
 │   └── categoria.map.ts
 │
 ├── environments
 │
 └── index.html
```

### Componentes principais

| Componente | Função |
|------------|--------|
| DashboardComponent | Exibe o resumo financeiro |
| HomeComponent | Tela inicial da aplicação |
| EditarCriarModalComponent | Modal para criar ou editar transações |

---

# ⚙️ Pré-requisitos

Antes de rodar o projeto você precisa ter instalado:

- Node.js
- NPM
- Angular CLI

Instalar Angular CLI:

```bash
npm install -g @angular/cli
```

---

# 📥 Como Clonar o Projeto

Clone o repositório:

```bash
git clone https://github.com/ThiagoJ-Dev/AngularProjetoDapper.git
```

Entre na pasta do projeto:

```bash
cd AngularProjetoDapper
```

---

# 📦 Instalar Dependências

Execute o comando abaixo para instalar todas as dependências do projeto:

```bash
npm install
```

---

# ▶️ Executar o Projeto

Para iniciar o servidor de desenvolvimento execute:

```bash
ng serve
```

Depois abra no navegador:

```
http://localhost:4200
```

A aplicação será recarregada automaticamente sempre que você modificar algum arquivo.

---

# 🔧 Build do Projeto

Para gerar a versão de produção execute:

```bash
ng build
```

O build será gerado na pasta:

```
dist/
```

---

# 🧪 Testes

Para rodar os testes unitários:

```bash
ng test
```

---

# 📊 Funcionalidades do Sistema

✔️ Dashboard financeiro  
✔️ Visualização de categorias de despesas  
✔️ Criação de transações  
✔️ Edição de transações  
✔️ Integração com API backend  
✔️ Atualização dinâmica dos dados  

---

# 🔗 Integração com Backend

Este projeto consome uma API desenvolvida em:

- ASP.NET Core
- Dapper
- SQL Server

A API é responsável por:

- Gerenciamento das transações
- Processamento de dados financeiros
- Geração de relatórios

---
