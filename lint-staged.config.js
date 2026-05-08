/** @type {import('lint-staged').Configuration} */
export default {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,css,html,yml,yaml}': ['prettier --write'],
  // Function form is required: lint-staged appends staged file paths to plain
  // command strings, which makes `tsc -b` ignore tsconfig.json and typecheck
  // only the listed files. Returning a fixed command string suppresses the
  // file-arg append so tsc resolves the project references normally. `--noEmit`
  // is explicit (rather than relying on tsconfig flags) so the contract holds
  // even if a future tsconfig flips `noEmit` to enable declaration files.
  '*.{ts,tsx}': () => 'tsc -b --noEmit',
};
