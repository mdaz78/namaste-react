---
title: 'feat: Production tooling setup (Prettier, ESLint hardening, Husky, lint-staged, commitlint, CI)'
type: feat
status: completed
date: 2026-05-08
origin: docs/brainstorms/2026-05-08-production-tooling-setup-requirements.md
---

# feat: Production tooling setup (Prettier, ESLint hardening, Husky, lint-staged, commitlint, CI)

## Summary

Land a production-grade developer-tooling baseline in seven sequential, atomic-commit-sized units: install Prettier and reformat the tree, harden ESLint with a11y + import-order rules and `eslint-config-prettier`, add `format`/`format:check`/`lint:fix`/`typecheck` npm scripts, bootstrap Husky v9, wire lint-staged into a pre-commit hook, wire commitlint into a commit-msg hook, and add a GitHub Actions CI workflow.

---

## Problem Frame

Repo currently has only a minimal ESLint flat config; Prettier, Husky, lint-staged, commitlint, and CI are absent (see origin: `docs/brainstorms/2026-05-08-production-tooling-setup-requirements.md`). The plan codifies the _order_ and _integration glue_ between these tools, since the painful failure modes — Prettier vs. ESLint disagreements, Husky hooks not bootstrapping for new contributors, `tsc --noEmit` silently ignoring `tsconfig.json` under lint-staged — all live in the seams between packages.

---

## Requirements

- R1. Prettier installed; `.prettierrc.json` with `singleQuote: true, semi: true, printWidth: 100, tabWidth: 2, trailingComma: 'all', arrowParens: 'always'`; `.prettierignore` covers `dist/`, `node_modules/`, `package-lock.json`. _(origin R1, R2, R3)_
- R2. ESLint flat config retains current base and adds `eslint-plugin-jsx-a11y`, `eslint-plugin-import` (or `eslint-plugin-import-x` if needed for flat-config compat — see Open Questions), and `eslint-config-prettier/flat` last in the extends chain so Prettier wins on stylistic rules. _(origin R4–R7)_
- R3. Commitlint installed (`@commitlint/cli` + `@commitlint/config-conventional`); `commitlint.config.js` extends conventional. _(origin R8)_
- R4. Husky v9 installed; `prepare` script set so `.husky/` and hooks bootstrap on `npm install` for any contributor. _(origin R10)_
- R5. `.husky/pre-commit` runs lint-staged; lint-staged config runs `prettier --write` and `eslint --fix` on staged source files **and** runs project-wide `tsc --noEmit` via a function-form entry. _(origin R11, R12)_
- R6. `.husky/commit-msg` runs `npx --no -- commitlint --edit $1` and rejects non-conforming messages. _(origin R9)_
- R7. `package.json` exposes `format`, `format:check`, `lint`, `lint:fix`, `typecheck`, `prepare`. _(origin R13)_
- R8. `.github/workflows/ci.yml` runs on push and pull*request to `main`, installs deps with `npm ci`, then runs `typecheck → lint → format:check → build`. Uses Node 20 LTS with npm cache keyed on `package-lock.json`. *(origin R14–R16)\_

---

## Scope Boundaries

- No `.editorconfig`.
- No `semantic-release`, `changesets`, Renovate, or Dependabot.
- No additional ESLint plugins beyond the four named (`@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`, plus the new `jsx-a11y`, `import`, and `eslint-config-prettier`).
- No Stylelint / CSS linting.
- No test runner setup.
- No GitHub branch-protection / required-status-check configuration (admin concern, not a code change).

### Deferred to Follow-Up Work

- Pinning `actions/setup-node` to a Node-version matrix (20 + 22): doable later if cross-version coverage becomes valuable.

---

## Context & Research

### Relevant Code and Patterns

- `eslint.config.js` — current flat config using `defineConfig` and `globalIgnores`. Extend in place; do not migrate to legacy `.eslintrc`.
- `package.json` — current scripts (`dev`, `build`, `lint`, `preview`); current `lint` script is `eslint .` and is preserved.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — `tsc --noEmit` from the project root must traverse these via project references; this is why lint-staged's function form matters (otherwise lint-staged appends staged file paths and tsc ignores tsconfig).
- `src/App.tsx`, `src/main.tsx` — only two source files today; reformatting noise will be tiny.

### Institutional Learnings

- No `docs/solutions/` entries to apply.

### External References

- Husky v9 init flow and hook-file format: https://typicode.github.io/husky/get-started.html (Context7: `/typicode/husky`).
- Commitlint + Husky v9 commit-msg hook: `echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg` (Context7: `/conventional-changelog/commitlint`).
- lint-staged + tsc gotcha: use `() => 'tsc --noEmit'` function form so file paths aren't appended (Context7: `/lint-staged/lint-staged`).
- Prettier 3 default integration with ESLint flat config: import `eslint-config-prettier/flat` and place last in `extends`.

---

## Key Technical Decisions

- **Husky over `simple-git-hooks` / `lefthook`** — de-facto React/TS standard, simplest v9 init, integrates cleanly with lint-staged. _(carried from origin)_
- **`@commitlint/config-conventional` with no custom rules** — sufficient for this repo; preserves compatibility with downstream tooling like changelog generators if ever adopted. _(carried from origin)_
- **Prettier owns stylistic rules; ESLint defers via `eslint-config-prettier/flat`** — flat-config friendly preset, prevents the "two formatters fighting" failure mode.
- **`tsc --noEmit` runs from lint-staged in the pre-commit hook (not pre-push) using the function form** — fast feedback for a small repo; the function form is the documented way to avoid lint-staged appending staged paths and breaking `tsconfig` resolution.
- **CI order: typecheck → lint → format:check → build** — fastest-failing checks first.
- **Single Node 20 LTS in CI, not a matrix** — minimum viable for a learning project; matrix is a follow-up.

---

## Open Questions

### Resolved During Planning

- **Pre-commit vs. pre-push for tsc:** Resolved as pre-commit via lint-staged function form. Repo is small; commit-time feedback is preferred.
- **Where lint-staged config lives:** Use `package.json` `"lint-staged"` key for discoverability; falls back to `.lintstagedrc.json` if config grows.
- **Where Prettier config lives:** Use `.prettierrc.json` (separate file) so editor integrations pick it up without parsing `package.json`.

### Deferred to Implementation

- **`eslint-plugin-import` vs. `eslint-plugin-import-x`** _(Affects R2)_: At install time, attempt `eslint-plugin-import` first. If its flat-config exports do not work with current ESLint 10.x, fall back to `eslint-plugin-import-x` (drop-in fork with first-class flat-config support). Decision is reversible and only affects the two extends lines.
- **`import/order` exact group ordering and alphabetization options** _(Affects R2)_: Start with `groups: ['builtin','external','internal','parent','sibling','index']`, `newlines-between: 'always'`, `alphabetize: { order: 'asc' }`. Refine after seeing it run on real code.
- **Whether to enable `import/no-cycle`** _(Affects R2)_: Skip in this iteration; rule is slow and tiny codebase has zero cycles. Can enable later.
- **Exact tool versions** _(Affects all units)_: Resolve at install time using each package's `latest` dist-tag, with one upper-bound exception — pin to majors that match current ESLint 10.x compatibility (`typescript-eslint` 8.x is verified compatible; new plugins must support flat config).

---

## High-Level Technical Design

> _This illustrates the intended dependency shape and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce._

```text
git commit -m "feat: foo"
  │
  ├─► .husky/pre-commit
  │     └─► npx lint-staged
  │           ├─► eslint --fix       (on staged *.{ts,tsx,js,jsx})
  │           ├─► prettier --write   (on staged *.{ts,tsx,json,md,css,...})
  │           └─► () => 'tsc -b --noEmit'   (whole project, file args suppressed)
  │
  └─► .husky/commit-msg
        └─► npx --no -- commitlint --edit $1
              └─► commitlint.config.js  → @commitlint/config-conventional

push / PR to main
  │
  └─► .github/workflows/ci.yml  (Node 20 + npm cache)
        └─► npm ci → npm run typecheck → lint → format:check → build
```

ESLint stack (flat config, evaluated in order):

```text
@eslint/js recommended
  → typescript-eslint recommended
  → react-hooks flat recommended
  → react-refresh vite
  → jsx-a11y flat recommended
  → import (or import-x) order/no-duplicates rules
  → eslint-config-prettier/flat   ← always last; disables stylistic conflicts
```

---

## Implementation Units

### U1. Install Prettier and reformat baseline

**Goal:** Add Prettier 3 with the agreed config and reformat the existing source tree once so subsequent commits have zero formatting diff noise.

**Requirements:** R1

**Dependencies:** none

**Files:**

- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Modify: `package.json` (add `prettier` to `devDependencies`)
- Modify (reformatting only): `src/App.tsx`, `src/main.tsx`, `eslint.config.js`, `vite.config.ts`, `index.html`, `tsconfig*.json`, `package.json`, `README.md`

**Approach:**

- Install `prettier` (latest 3.x) as a dev dependency.
- `.prettierrc.json` contents: the six options from origin R1 (single quote, semi, printWidth 100, tabWidth 2, trailingComma all, arrowParens always).
- `.prettierignore` lines: `dist/`, `node_modules/`, `package-lock.json`, `.husky/`, `coverage/`, `*.min.*`.
- Run `npx prettier --write .` once to reformat the tree as a separate commit so the diff is reviewable.

**Patterns to follow:**

- None in repo; `.prettierrc.json` over `.prettierrc.js` because the config is static and JSON is universally tooling-friendly.

**Test scenarios:**

- Verification — running `npx prettier --check .` exits 0 immediately after the formatting commit.
- Verification — `.prettierignore` excludes `dist/` (proven by `npx prettier --check dist || true` not erroring on dist contents — manual spot check).
- Test expectation: none — pure tooling/config; verified via operational check above.

**Verification:**

- `npx prettier --check .` exits 0 on the post-reformat tree.
- The reformat commit touches only whitespace/quotes/trailing commas; reviewer can scan it quickly.

---

### U2. Harden ESLint flat config (a11y + import + Prettier integration)

**Goal:** Extend the existing flat config with `eslint-plugin-jsx-a11y`, an import-order plugin, and `eslint-config-prettier/flat`. Confirm `npm run lint` exits 0 against `src/`.

**Requirements:** R2

**Dependencies:** U1 (Prettier needs to exist before `eslint-config-prettier` is meaningful)

**Files:**

- Modify: `eslint.config.js`
- Modify: `package.json` (add `eslint-plugin-jsx-a11y`, `eslint-plugin-import` _or_ `eslint-plugin-import-x`, `eslint-config-prettier`)

**Approach:**

- Install plugins. Try `eslint-plugin-import` first; if the flat-config export does not exist or errors against ESLint 10, install `eslint-plugin-import-x` and use that.
- Extend `eslint.config.js`:
  - Add `jsxA11y.flatConfigs.recommended` (or equivalent flat preset name from the current jsx-a11y release) to the `extends` array.
  - Add the import plugin's flat preset and an `import/order` rule with the groups listed in Open Questions.
  - As the LAST item in `extends`, add `eslint-config-prettier/flat` (default export) so it disables conflicting stylistic rules from every preceding preset.
- Keep `globalIgnores(['dist'])` and `languageOptions.globals: globals.browser` intact.

**Patterns to follow:**

- Existing `eslint.config.js` `defineConfig([...])` shape — do not regress to legacy config.

**Test scenarios:**

- Happy path — `npm run lint` exits 0 after changes.
- Edge case — adding an `<img>` tag without `alt` to a scratch `.tsx` file produces a `jsx-a11y/alt-text` error; remove the scratch file before committing.
- Edge case — importing the same module twice in a scratch file triggers `import/no-duplicates`; remove scratch before committing.
- Test expectation: none beyond the manual scratch-file probes above — config-only change.

**Verification:**

- `npm run lint` exits 0.
- ESLint reports no rule conflicts with Prettier (no rules from `@stylistic`, `quotes`, `semi`, `comma-dangle` etc. fire).

---

### U3. Add npm scripts and run baseline format/lint/typecheck

**Goal:** Add `format`, `format:check`, `lint:fix`, `typecheck` (and reserve `prepare` for U4); confirm all pass locally.

**Requirements:** R7

**Dependencies:** U1, U2

**Files:**

- Modify: `package.json`

**Approach:**

- Add scripts:
  - `format`: `prettier --write .`
  - `format:check`: `prettier --check .`
  - `lint:fix`: `eslint . --fix`
  - `typecheck`: `tsc -b --noEmit` (matches the current `build`'s `tsc -b` style and respects project references)
- Keep existing `dev`, `build`, `lint`, `preview` unchanged.
- Run all four scripts locally and confirm exit 0.

**Patterns to follow:**

- Matches typical Vite + TS + React `package.json` script idioms.

**Test scenarios:**

- Verification — `npm run format:check && npm run lint && npm run typecheck && npm run build` exits 0 in sequence.
- Test expectation: none — script wiring; verified via the run above.

**Verification:**

- All four new scripts exit 0 against current `main`.

---

### U4. Bootstrap Husky v9

**Goal:** Install Husky v9, run `npx husky init` to create `.husky/` and add the `prepare` script, then commit the resulting files.

**Requirements:** R4

**Dependencies:** U3 (so `prepare` lives next to the other scripts in a consistent edit)

**Files:**

- Create: `.husky/` (directory; `husky init` also creates a default `.husky/pre-commit` placeholder — replace its contents in U5, do not delete it)
- Modify: `package.json` (`prepare`: `husky` is added by the init command)

**Approach:**

- `npm install --save-dev husky`.
- `npx husky init` — creates `.husky/pre-commit` with a placeholder `npm test`. Leave the directory; rewrite the file in U5.
- Confirm `package.json` now has `"prepare": "husky"`.
- Commit `.husky/pre-commit` (placeholder) and `package.json` changes — keeps the commit small and atomic.

**Patterns to follow:**

- Husky v9 documentation flow: https://typicode.github.io/husky/get-started.html.

**Test scenarios:**

- Happy path — fresh `npm install` (in a clean clone) recreates `.husky/_/` and the hooks remain executable.
- Test expectation: none — bootstrap; verified by the smoke test above (deferred to U5/U6 e2e check).

**Verification:**

- `.husky/` exists, `package.json` has `"prepare": "husky"`, `git config core.hooksPath` resolves to `.husky/_`.

---

### U5. Wire lint-staged into pre-commit hook

**Goal:** Install lint-staged, define its config, and replace `.husky/pre-commit` with a `npx lint-staged` invocation. Include a project-wide `tsc --noEmit` step using the function form so tsconfig is honored.

**Requirements:** R5

**Dependencies:** U4

**Files:**

- Create: `lint-staged.config.js` (preferred over `package.json` so the function form works cleanly without quoting issues)
- Modify: `.husky/pre-commit`
- Modify: `package.json` (add `lint-staged` to `devDependencies`)

**Approach:**

- `npm install --save-dev lint-staged`.
- `lint-staged.config.js` (ESM, since `package.json` already has `"type": "module"`):
  - `'*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write']`
  - `'*.{json,md,css,html,yml,yaml}': ['prettier --write']`
  - `'*.{ts,tsx}': () => 'tsc -b --noEmit'` _(function form prevents file-args being appended; see lint-staged docs gotcha)_
- Replace `.husky/pre-commit` contents with: `npx lint-staged`.
- Manually test by editing a TS file with a missing trailing comma, staging it, and running `git commit -m "chore: probe"` — lint-staged should reformat in place and the commit should succeed.

**Patterns to follow:**

- lint-staged docs example pattern using a config file.

**Test scenarios:**

- Happy path — staging a `*.tsx` file with mixed quotes triggers `eslint --fix` + `prettier --write`; the commit succeeds with the file reformatted. **Covers AE1.**
- Edge case — staging a `*.md` file runs only `prettier --write` (not eslint), since the glob `'*.{ts,tsx,js,jsx}'` does not match.
- Error path — introducing a `tsc` error somewhere in `src/` and staging an unrelated file causes `tsc -b --noEmit` to fail, which fails the pre-commit hook. **Covers AE3 (local half).**
- Integration — `npx lint-staged` invokes successfully when there are no staged files (no-op exit 0).
- Test expectation: behavioral probes above, manually executed once during U5; no automated test files for hook behavior.

**Verification:**

- A commit with mixed-quote TS gets reformatted automatically and lands cleanly.
- A commit attempted while the project has a type error is rejected.

---

### U6. Wire commitlint into commit-msg hook

**Goal:** Install commitlint, configure `commitlint.config.js`, and add `.husky/commit-msg` running `npx --no -- commitlint --edit $1`.

**Requirements:** R3, R6

**Dependencies:** U4

**Files:**

- Create: `commitlint.config.js`
- Create: `.husky/commit-msg`
- Modify: `package.json` (add `@commitlint/cli`, `@commitlint/config-conventional`)

**Approach:**

- `npm install --save-dev @commitlint/cli @commitlint/config-conventional`.
- `commitlint.config.js`: `export default { extends: ['@commitlint/config-conventional'] };`
- `.husky/commit-msg` contents: a single line — `npx --no -- commitlint --edit $1`. (No shebang needed in Husky v9; the file is sourced directly.)
- Manually test:
  - `git commit -m "fixed stuff"` is rejected with type-enum violation.
  - `git commit -m "feat: probe commitlint"` is accepted.

**Patterns to follow:**

- commitlint local-setup docs (Context7 `/conventional-changelog/commitlint`).

**Test scenarios:**

- Happy path — `git commit -m "feat(routing): handle 404 fallback"` is accepted. **Covers AE2 (positive half).**
- Error path — `git commit -m "fixed stuff"` is rejected with a `type-enum` violation message. **Covers AE2 (negative half).**
- Edge case — empty subject (`git commit -m "feat:"`) is rejected by `subject-empty` rule from the conventional preset.
- Test expectation: behavioral probes above, manually executed once during U6.

**Verification:**

- Both the rejection and the acceptance probes behave as expected.
- `.husky/commit-msg` is committed alongside `commitlint.config.js`.

---

### U7. Add GitHub Actions CI workflow

**Goal:** Add `.github/workflows/ci.yml` running on push and pull_request to `main`, executing typecheck → lint → format:check → build with Node 20 and npm cache.

**Requirements:** R8

**Dependencies:** U3 (scripts must exist before CI can call them)

**Files:**

- Create: `.github/workflows/ci.yml`

**Approach:**

- Trigger on `push` to `main` and `pull_request` targeting `main`.
- Single job `verify` running on `ubuntu-latest`.
- Steps:
  1. `actions/checkout@v4`
  2. `actions/setup-node@v4` with `node-version: '20'` and `cache: 'npm'`
  3. `npm ci`
  4. `npm run typecheck`
  5. `npm run lint`
  6. `npm run format:check`
  7. `npm run build`
- Each step runs as a separate `run:` so failures pinpoint cleanly in the GitHub UI.
- No artifact upload, no deploy step (out of scope).

**Patterns to follow:**

- Standard GitHub Actions Node setup pattern; no repo-specific precedent to follow yet.

**Test scenarios:**

- Verification — push the branch and open a draft PR; CI run completes green for the unchanged `main` baseline. **Covers AE3 (CI half) and the workflow-end-to-end of AE4 (a11y violation introduced in a probe branch fails the lint step).**
- Test expectation: none locally — CI behavior is verified on GitHub.

**Verification:**

- A green CI run on `main` after this commit lands.
- Introducing a deliberate lint or format violation in a probe branch produces a red CI run.

---

## System-Wide Impact

- **Interaction graph:** `git commit` now triggers two hooks (`pre-commit` → lint-staged → prettier/eslint/tsc; `commit-msg` → commitlint). `git push` to `main` (or PR) triggers `.github/workflows/ci.yml`. No runtime application code is affected.
- **Error propagation:** Hook failures abort commits locally (exit non-zero). CI step failures fail the workflow run and block merges only if branch protection is later configured (out of scope here).
- **State lifecycle risks:** `lint-staged` is git-aware and uses a stash for partially-staged files; the function-form `tsc` step is the one place where misconfig (forgetting the function form) silently breaks tsconfig resolution — guarded by U5's manual probe.
- **API surface parity:** No app API changes. `package.json` script surface grows by four entries; the existing `lint` script is preserved.
- **Integration coverage:** The pre-commit + commit-msg + CI chain is exercised manually during U5/U6 and on the U7 probe push; no automated meta-test of the hook chain.
- **Unchanged invariants:** `vite dev`/`vite build` behavior, `tsconfig*.json` semantics, and existing source files (post-U1 reformat) remain functionally identical.

---

## Risks & Dependencies

| Risk                                                                                               | Mitigation                                                                                                                  |
| -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-import` flat-config support breaks against ESLint 10.x                              | Fall back to `eslint-plugin-import-x` (documented Open Question, no plan rewrite needed).                                   |
| Forgetting the function form for `tsc --noEmit` in lint-staged silently breaks tsconfig resolution | U5 explicitly uses the function form and includes a manual probe that introduces a type error to confirm the hook fails.    |
| `npx husky init` overwrites an existing `.husky/pre-commit` if rerun                               | Run `husky init` once in U4 and never again; subsequent edits are direct.                                                   |
| Contributor on Yarn or pnpm (no `prepare` script semantics on Yarn classic)                        | Repo currently uses npm; not in scope. Note in README only if the situation arises.                                         |
| Husky-installed hooks only fire after `npm install` runs the `prepare` script                      | New contributors cloning the repo must run `npm install` before their first commit; this is already the natural first step. |
| `.husky/commit-msg` `$1` quoting differs on Windows PowerShell                                     | Repo is developed on macOS; if a Windows contributor joins, switch to the documented PowerShell-escaped form.               |

---

## Documentation / Operational Notes

- README should gain a short "Development" section listing the four new npm scripts and noting that hooks self-bootstrap on `npm install`. Out of scope for this plan but a small follow-up.
- No deploy or rollout steps — purely repo-local tooling.

---

## Sources & References

- **Origin document:** docs/brainstorms/2026-05-08-production-tooling-setup-requirements.md
- Husky docs (Context7 `/typicode/husky`): https://typicode.github.io/husky/
- commitlint docs (Context7 `/conventional-changelog/commitlint`): https://commitlint.js.org/
- lint-staged docs (Context7 `/lint-staged/lint-staged`): https://github.com/lint-staged/lint-staged
- Existing eslint flat config: `eslint.config.js`
