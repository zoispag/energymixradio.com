import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  { ignores: ["dist/**", "node_modules/**", "playwright-report/**", "test-results/**"] },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  skipFormatting,
];
