const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint");

module.exports = defineConfig([
  {
    ignores: ["webpack.*.js"], // ⬅️ ignore webpack config files
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    rules: {
      ...prettier.rules, // this disables formatting-related rules to avoid conflict with Prettier
    },
    extends: ["js/recommended", prettier],
  },
]);
