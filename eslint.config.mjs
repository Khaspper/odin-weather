import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
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
