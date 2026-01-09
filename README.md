# BIOSCAN-ML Catalog

This is a simple web app to list public datasets, models and code from the [BIOSCAN-ML](https://bioscan-ml.github.io/) team. To minimize maintence, we collect this information using GitHub and HuggingFace APIs. Following endpoints are consumed:

- Datasets: https://huggingface.co/api/datasets?author=bioscan-ml&full=true
- Models: https://huggingface.co/api/models?author=bioscan-ml&full=true
- Code: https://api.github.com/orgs/bioscan-ml/repos?type=public

The project was inpired by the [Imageomics Catalog](https://imageomics.github.io/catalog/). For implementation we use TypeScript and React. The project was setup using [Vite](https://vitejs.dev/).

## System requirements

- [Node](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

The `.nvmrc` file in project root describes the recommended Node version for this project.

## Getting started

```bash
# Install dependencies
npm install

# Run app in development mode
npm run dev
```

The app will now be available in a browser on http://localhost:5173/. Hot reload will be enabled by default.

## Code style

We use [ESLint](https://eslint.org/) to detect what we consider as problems in the code. The project preferences are specified in `.eslint.config.js`.

```bash
# Run linter for all code
npm run lint
```

If you are using Visual Studio Code, the following extensions are recommended for code style:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## UI components

We use [shadcn/ui](https://ui.shadcn.com/) as a component reference. Components are built using [Radix UI](https://www.radix-ui.com/) and [Tailwind CSS](https://tailwindcss.com/).

To add a new component to the project, first checkout the list of [available components](https://ui.shadcn.com/docs/components). Then use the CLI to add a component to the project. This will create a new component in folder `/src/components/ui` and install any dependencies it might have. Since components are copied to the project, not installed as dependencies, they can be tweaked as needed.
