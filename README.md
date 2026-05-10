# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Development

### Setup

```bash
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required because `eslint-plugin-jsx-a11y@^6` still declares its peer range against ESLint `<= 9` while this project runs ESLint 10. The plugin's rule logic works fine on ESLint 10; the flag bypasses npm's strict peer-dep check. Drop the flag once jsx-a11y publishes an ESLint 10-compatible release.

`npm install` runs the `prepare` script, which bootstraps Husky's `.husky/_` git-hooks directory automatically. No manual setup is needed.

### Scripts

| Command                | What it does                                         |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                            |
| `npm run build`        | Type-check (`tsc -b`) and produce a production build |
| `npm run preview`      | Preview the production build locally                 |
| `npm run lint`         | Run ESLint over the repo                             |
| `npm run lint:fix`     | Run ESLint with `--fix`                              |
| `npm run format`       | Format the repo with Prettier                        |
| `npm run format:check` | Check Prettier formatting without writing            |
| `npm run typecheck`    | Project-references type check (`tsc -b --noEmit`)    |

### Styling

Styling uses [Tailwind CSS v4](https://tailwindcss.com) via the official `@tailwindcss/vite` plugin. There is no PostCSS config and no `tailwind.config.js`; the v4 Vite plugin auto-scans the project for class names.

- Entry stylesheet: `src/index.css` containing a single `@import 'tailwindcss';`
- The stylesheet is imported once from `src/main.tsx`, so it ships with every page
- To add styles, write utility classes directly in `className` (e.g. `<h1 className="text-4xl font-bold text-blue-600">`)

### Git hooks

A pre-commit hook runs `lint-staged` on staged files:

- `*.{ts,tsx,js,jsx}` → `eslint --fix` then `prettier --write`
- `*.{json,md,css,html,yml,yaml}` → `prettier --write`
- A whole-project `tsc -b --noEmit` step runs in addition; if a type error exists anywhere in the repo (including in unstaged files), the commit will be blocked. Use `git commit --no-verify` to bypass the hooks when intentional, but the same checks run in CI on every PR.

A commit-msg hook runs `commitlint` against `@commitlint/config-conventional`, so messages must follow `type(scope?): subject` (e.g. `feat(routing): handle 404 fallback`).

### Recovering interrupted commits

If `git commit` is interrupted mid-hook (Ctrl-C, OOM, or a system sleep), `lint-staged` may leave your unstaged changes in a labeled stash entry. To recover:

```bash
git stash list
# Look for "On <branch>: lint-staged automatic backup"
git stash apply stash@{N}
```

Avoid `git reset --hard` or `git checkout .` after an interrupted run until you have inspected the stash list.

### Continuous integration

GitHub Actions workflow `.github/workflows/ci.yml` runs on push and pull-request events targeting `main`. It executes `typecheck → lint → format:check → build` on Node 20 LTS.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
