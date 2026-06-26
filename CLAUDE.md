# CLAUDE.md

This repository is a React Native bare app (Community CLI) for a cashbook application.

## Project purpose

The app helps a user manage financial movements in a cashbook, including:

- income and expense entries
- description of the transaction
- amount
- payment method
- date and time
- monthly and annual reports

The product is organized around user-facing features and follows an MVVM-style architecture with feature-based folders.

## Architecture overview

The codebase should stay aligned with this structure:

- src/features/: feature-based modules
  - views/: React Native screens and presentational UI
  - viewmodels/: state and UI logic for the feature
  - models/: domain models, schemas, and repository interfaces
  - infrastructure/: concrete implementations for persistence or external services
- src/core/: shared app infrastructure
  - components/: reusable UI components
  - navigation/: navigation setup and route definitions
  - shared/: shared helpers and utilities
  - theme/: styled-components theme and visual tokens
  - utils/: generic utility functions
- src/context/: global providers such as auth and realm context

## Architectural rules

- Prefer feature-based organization over cross-cutting folders.
- Keep UI screens thin. Business logic should live in viewmodels or dedicated feature services.
- Do not place feature business logic directly inside screen components.
- Repositories and infrastructure implementations should isolate data access from the UI layer.
- Use TypeScript for all new code.
- Follow existing naming conventions:
  - PascalCase for components, screens, and types
  - camelCase for functions, variables, and hooks
  - Use English names for identifiers, comments, and new files whenever possible

## Feature structure

When adding a new feature, follow this pattern:

```text
src/features/YourFeature/
├── views/
│   └── YourFeatureScreen.tsx
├── viewmodels/
│   └── useYourFeatureViewModel.ts
├── models/
│   ├── YourFeature.ts
│   └── repositories/
│       └── YourFeatureRepository.ts
└── infrastructure/
    └── RealmYourFeatureRepository.ts
```

Example feature files:

- `views/TransactionScreen.tsx`
- `viewmodels/useTransactionViewModel.ts`
- `models/Transaction.ts`
- `models/repositories/TransactionRepository.ts`
- `infrastructure/RealmTransactionRepository.ts`
- Viewmodels should own UI state, input handling, validation, and business rules.
- Repositories should provide a clean abstraction for persistence and external data access.
- Infrastructure implementations should contain Realm, Firebase, API, or storage-specific code.
- Avoid mixing UI rendering logic with persistence logic.

## State and side effects

- Keep state updates predictable and localized to the relevant feature.
- Use hooks or viewmodels to manage asynchronous actions such as save, load, delete, and sync.
- Handle loading, error, and empty states explicitly.
- Prefer small, composable functions over large screen-level handlers.

## Data and persistence

- Realm is used for local persistence.
- Firebase Authentication is used for user authentication.
- UI layers should not directly access Realm or Firebase APIs. Use repositories and infrastructure adapters instead.
- Keep schema definitions and repository interfaces close to the feature model.
- When changing persistence behavior, preserve compatibility with existing schemas unless a migration is explicitly intended.

## Navigation

- Navigation should be centralized under src/core/navigation.
- New screens should be registered in the appropriate navigator.
- Keep route names consistent and descriptive.
- Prefer reusable navigation patterns over one-off screen logic.

## UI and styling

- Prefer styled-components/native for component styling.
- Reuse shared theme values from src/core/theme instead of hardcoding colors, spacing, and typography.
- Keep components reusable and composable.
- Avoid inline styles when a shared or styled component is available.

## Project-specific domain context

This app is a personal cashbook for financial movements. Core user flows include:

- creating income and expense transactions
- entering description, amount, payment method, date, and time
- viewing monthly and annual reports
- managing authentication and local persistence

When implementing features, keep the user experience centered on these flows.

## Coding conventions for AI agents

- Start by understanding the relevant feature folder before making changes.
- Keep changes small and focused on the requested task.
- Preserve existing patterns unless a clear improvement is needed.
- Avoid unrelated refactors or broad architectural changes.
- Prefer simple, readable solutions over over-engineering.
- When adding new functionality, ensure it fits the MVVM + feature-based structure already used in the app.
- If a new feature is needed, create it under src/features with the standard folder layout.
- If shared logic is needed across features, place it in src/core rather than duplicating it inside a feature.

## Validation and quality

- Keep changes consistent with the current project structure.
- Prefer TypeScript types over any usage of implicit any.
- Maintain readable component and function names.
- Verify that navigation, persistence, and authentication flows still work after changes.
- Run relevant checks such as linting and tests when available.

## Useful commands

- npm start
- npm run android
- npm run ios
- npm test
- npm run lint

## Notes for AI agents

When implementing a task:

1. Understand the relevant feature folder first.
2. Keep the change inside the appropriate feature unless it is truly shared infrastructure.
3. Follow the existing MVVM structure and repository pattern.
4. Prefer reusing shared components and utilities from src/core.
5. Maintain consistency with the app's current architecture and conventions.
6. Prefer minimal diffs and explicit, testable behavior.
