---
date: 2026-05-08
topic: production-tooling-setup
---

# Production Tooling Setup (Lint, Format, Commit Hygiene, CI)

## Summary

Bring this React + Vite + TypeScript project to a production-grade developer-tooling baseline: enforce code formatting (Prettier), strengthen linting (ESLint with a11y and import-order rules), enforce conventional commits (commitlint), and gate everything via Husky pre-commit/commit-msg hooks plus a GitHub Actions CI workflow.

---

## Problem Frame

The repo is freshly scaffolded from Vite. ESLint is configured at a minimal level (TS + react-hooks + react-refresh), Prettier is not installed, and there are no git hooks or CI checks. As soon as more than one contributor — human or agent — touches the codebase, formatting drift, accidental lint regressions, and inconsistent commit history become near-certain. Every later cleanup is more expensive than enforcing the baseline now while the code surface is still small.

---

## Requirements

**Formatting (Prettier)**
- R1. Install Prettier and add a `.prettierrc.json` with: `singleQuote: true`, `semi: true`, `printWidth: 100`, `tabWidth: 2`, `trailingComma: 'all'`, `arrowParens: 'always'`.
- R2. Add a `.prettierignore` covering `dist/`, `node_modules/`, `package-lock.json`, and any generated/cache directories.
- R3. Re-format the existing source tree once so the baseline is clean.

**ESLint (production-grade)**
- R4. Keep the existing flat-config base (`@eslint/js`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) and confirm it lints `src/` cleanly.
- R5. Add `eslint-plugin-jsx-a11y` with its recommended config to surface accessibility issues at lint time.
- R6. Add `eslint-plugin-import` with rules that enforce a deterministic import order (builtins → external → internal → relative) and forbid duplicate / circular imports.
- R7. Add `eslint-config-prettier` (or its flat-config equivalent) so ESLint never disagrees with Prettier on stylistic concerns.

**Commit hygiene (commitlint)**
- R8. Install `@commitlint/cli` and `@commitlint/config-conventional`; commit messages must conform to Conventional Commits (`type(scope?): subject`).
- R9. A commit-msg git hook runs commitlint and rejects non-conforming messages locally before they enter history.

**Git hooks (Husky + lint-staged)**
- R10. Husky is installed and initialized via a `prepare` npm script so hooks bootstrap on `npm install` for any contributor.
- R11. A pre-commit hook runs lint-staged, which executes `prettier --write` and `eslint --fix` only on staged `*.{ts,tsx,js,jsx,json,md,css}` files.
- R12. A separate pre-commit (or pre-push) step runs `tsc --noEmit` against the full project so type errors never reach `main`.

**npm scripts**
- R13. Add `format` (`prettier --write .`), `format:check` (`prettier --check .`), `lint` (already exists), `lint:fix` (`eslint . --fix`), `typecheck` (`tsc --noEmit`), and `prepare` (`husky`).

**Continuous Integration (GitHub Actions)**
- R14. A workflow at `.github/workflows/ci.yml` runs on pushes and pull requests targeting `main`.
- R15. CI installs deps with a locked install, then runs in order: `typecheck`, `lint`, `format:check`, `build`. Any step failing fails the job.
- R16. The workflow uses an LTS Node version (≥ 20) with dependency caching keyed on `package-lock.json`.

---

## Acceptance Examples

- AE1. **Covers R1–R3, R7, R11.** Given a contributor edits `src/App.tsx` with mixed quotes and missing trailing commas, when they `git commit`, then lint-staged auto-runs Prettier + ESLint --fix on the staged file and the commit succeeds with the file formatted.
- AE2. **Covers R8, R9.** Given a contributor types `git commit -m "fixed stuff"`, when the commit-msg hook fires, then commitlint rejects the message with a non-zero exit and the commit is aborted; `git commit -m "fix(routing): handle 404 fallback"` is accepted.
- AE3. **Covers R12, R15.** Given a `tsc` error is introduced in `src/main.tsx`, when the contributor commits, then the local typecheck step fails. Even if it bypasses local hooks, the `ci.yml` typecheck step fails the PR check.
- AE4. **Covers R5.** Given a `<img>` tag is added without an `alt` attribute, when `npm run lint` runs, then `jsx-a11y/alt-text` reports an error.

---

## Success Criteria

- A fresh `git clone` + `npm install` produces a working state where pre-commit hooks, commit-msg hooks, format/lint/typecheck scripts, and CI all behave as specified — no manual setup steps required.
- `npm run lint`, `npm run format:check`, `npm run typecheck`, and `npm run build` all exit 0 against the current `main` after the setup commit lands.
- A non-conforming commit message or unformatted file cannot reach `main` without the contributor having explicitly bypassed `--no-verify` *and* the CI job, which is observable in the PR.
- The downstream `ce-plan` step can pick this doc up and produce an implementation plan without re-deciding tool choices, package versions to target, or hook layout.

---

## Scope Boundaries

- No `.editorconfig` for now (Prettier handles whitespace; revisit if non-VS Code editors join).
- No `semantic-release` / `changesets` — this is a learning project, not a published package.
- No `Renovate` / `Dependabot` automation in this iteration.
- No additional ESLint plugins beyond the four named (e.g. no `eslint-plugin-unicorn`, `sonarjs`, `security`) — keep the rule set focused.
- No Stylelint / CSS linting — current CSS surface is trivial.
- No test runner setup (Vitest, Jest, Testing Library) — separate brainstorm.
- No branch-protection / required-checks configuration on GitHub — that's a repo-admin concern, not a code change.

---

## Key Decisions

- **Husky over `simple-git-hooks` / `lefthook`.** Husky is the de-facto standard in the React/TS ecosystem, well-documented, and integrates cleanly with lint-staged. The marginal install cost is acceptable.
- **Conventional Commits via `@commitlint/config-conventional`, no custom rules.** Standard config is enough for a single-developer repo and keeps the history compatible with downstream tooling (changelog generators, release-please, etc.) if those are ever adopted.
- **Prettier as the source of truth for stylistic rules; ESLint defers via `eslint-config-prettier`.** Prevents the classic "fight between two formatters" failure mode.
- **Type-checking runs as a separate step (not via ESLint's `parserOptions.project`).** Keeps lint fast and isolates type errors to a dedicated, easy-to-read script.
- **CI runs typecheck → lint → format:check → build, in that order.** Fastest-failing checks first.

---

## Dependencies / Assumptions

- Node ≥ 20 LTS is acceptable for this repo's contributors and CI runners.
- The repo will be hosted on GitHub (CI workflow is GitHub Actions specific).
- Library versions will be resolved at implementation time via Context7 to avoid stale-training-data choices; current major versions to target are: ESLint 9.x flat config (already in use as 10.x in package.json — verify), Prettier 3.x, Husky 9.x, commitlint 19.x, lint-staged 15.x. Final pinned versions are a planning decision.
- The current `eslint.config.js` flat-config will be extended, not replaced.

---

## Outstanding Questions

### Deferred to Planning

- [Affects R6][Technical] Exact `eslint-plugin-import` rule set — `import/order` group ordering, alphabetization within groups, and whether to enable `import/no-cycle` (slower) or stop at `import/no-duplicates`.
- [Affects R10–R12][Technical] Whether `tsc --noEmit` runs in the pre-commit hook (slower, blocks commits on unrelated files) or in pre-push (faster commits, slightly later feedback). Default to pre-push if commit feedback feels slow.
- [Affects R15][Needs research] Whether to add a separate "build artifacts upload" step in CI for preview deploys — depends on whether deploys are in scope for the project.
- [Affects R14–R16][Technical] Whether to also add an `actions/setup-node` matrix (Node 20 + 22) or pin to a single LTS. Single LTS is fine for a learning project; matrix can come later.
