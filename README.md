# Livro Caixa React Native

## Table of Contents

- [English](#english)
  - [Project Overview](#project-overview)
  - [Architecture](#architecture)
  - [Key Technologies](#key-technologies)
  - [Installation](#installation)
  - [Important Files](#important-files)
  - [Notes](#notes)
- [Português](#português)
  - [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Arquitetura](#arquitetura)
  - [Tecnologias Principais](#tecnologias-principais)
  - [Instalação](#instalação)
  - [Arquivos Importantes](#arquivos-importantes)
  - [Observações](#observações)

## English

### Project Overview

This repository contains a React Native bare app (Community CLI) for a personal cashbook application.

The app helps users manage financial movements by recording income and expense entries with:

- description
- amount
- payment type
- date and time

It also provides monthly and annual reports to review finances over time.

### Architecture

The project follows a feature-based MVVM architecture:

- `src/features/` contains feature modules.
- `src/core/` contains shared infrastructure, navigation, theme, and utilities.
- `src/context/` contains global providers such as authentication and Realm.

Each feature typically includes:

- `views/` for screens and presentational UI.
- `viewmodels/` for state, input handling, validation, and business logic.
- `models/` for domain entities, schemas, and repository contracts.
- `infrastructure/` for concrete persistence implementations.

### Key Technologies

- React Native 0.86.0 (bare workflow)
- TypeScript
- Realm for local persistence
- Firebase Authentication for user login state
- styled-components for styling and theme
- React Navigation for navigation flow

### Installation

Install dependencies:

```sh
npm install
```

Start the Metro bundler:

```sh
npm start
```

Run on Android:

```sh
npm run android
```

Run on iOS:

```sh
npm run ios
```

### Important Files

- `App.tsx` - app entry point and provider setup
- `src/core/navigation/Routes.tsx` - navigation flow based on authentication state
- `src/context/AuthContext.tsx` - global authentication state
- `src/context/RealmContext.tsx` - Realm initialization and repositories
- `CLAUDE.md` - coding guide for AI agents
- `PRESENTATION_SCRIPT.md` - presentation script in Portuguese

### Notes

This app emphasizes modularity, clear separation of concerns, and maintainable feature-driven structure. When adding new functionality, keep UI, domain, and persistence code isolated.

---

## Português

### Visão Geral do Projeto

Este repositório contém um aplicativo React Native bare workflow para um livro caixa pessoal.

O app ajuda o usuário a controlar movimentações financeiras registrando entradas e saídas com:

- descrição
- valor
- tipo de pagamento
- data e hora

Também fornece relatórios mensais e anuais para revisar as finanças ao longo do tempo.

### Arquitetura

O projeto segue uma arquitetura MVVM baseada em funcionalidades:

- `src/features/` contém os módulos de feature.
- `src/core/` contém infraestrutura compartilhada, navegação, tema e utilitários.
- `src/context/` contém provedores globais como autenticação e Realm.

Cada feature geralmente inclui:

- `views/` para telas e UI de apresentação.
- `viewmodels/` para estado, tratamento de entrada, validação e lógica de negócio.
- `models/` para entidades de domínio, esquemas e contratos de repositório.
- `infrastructure/` para implementações concretas de persistência.

### Tecnologias Principais

- React Native 0.86.0 (bare workflow)
- TypeScript
- Realm para persistência local
- Firebase Authentication para estado de login
- styled-components para estilo e tema
- React Navigation para fluxo de navegação

### Instalação

Instale as dependências:

```sh
npm install
```

Inicie o Metro bundler:

```sh
npm start
```

Execute no Android:

```sh
npm run android
```

Execute no iOS:

```sh
npm run ios
```

### Arquivos Importantes

- `App.tsx` - ponto de entrada do app e configuração de provedores
- `src/core/navigation/Routes.tsx` - fluxo de navegação com base no estado de autenticação
- `src/context/AuthContext.tsx` - estado global de autenticação
- `src/context/RealmContext.tsx` - inicialização do Realm e repositórios
- `CLAUDE.md` - guia de codificação para agentes de IA
- `PRESENTATION_SCRIPT.md` - roteiro de apresentação em português

### Observações

Este app prioriza modularidade, separação clara de responsabilidades e estrutura baseada em features. Ao adicionar novas funcionalidades, mantenha a interface, o domínio e a persistência separados.
