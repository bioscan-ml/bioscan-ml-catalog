# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code)
when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server at localhost:5173 (hot reload)
npm run build        # TypeScript compile + Vite production build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Architecture

This is a React/TypeScript catalog app that aggregates BIOSCAN-ML resources
from GitHub and HuggingFace APIs.
It runs entirely client-side with no backend.

### Data Flow

Three custom hooks fetch data from external APIs on mount:

- `useGitHubItems` → GitHub repos from `bioscan-ml` org
- `useHuggingFaceModels` → Models from HuggingFace `bioscan-ml` author
- `useHuggingFaceDatasets` → Datasets from HuggingFace `bioscan-ml` author

`App.tsx` consumes these hooks and normalizes the data into a common shape
for the `Gallery` component.

### Search and Sort

The `Gallery` component uses Fuse.js for fuzzy search across item names and tags.
Sorting options: name (alphabetical), last updated, likes/stars.

### UI Components

Components in `src/components/ui/` are based on shadcn/ui patterns
(Radix UI + Tailwind CSS).
To add new components, use the shadcn CLI which copies them into the project
for customization.

### Path Aliases

`@/*` maps to `./src/*` (configured in tsconfig and vite.config).
