// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

import js from "@eslint/js";
import ts from "typescript-eslint";
import vue from "eslint-plugin-vue"
import tailwind from "eslint-plugin-tailwindcss";

export default createConfigForNuxt({
}).append(
  [
    js.configs.recommended,
    // ...ts.configs.recommended,
    ...vue.configs["flat/recommended"],
    ...tailwind.configs["flat/recommended"]
  ],
  {
    rules: {
      "linebreak-style": 0,
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "tailwindcss/no-custom-classname": "off",
      "vue/multi-word-component-names": "off",
      "no-multiple-empty-lines": "warn",
      "vue/no-v-html": "off",
      "vue/require-default-prop": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "no-useless-constructor": "off",
      "@typescript-eslint/consistent-type-imports": "warn",
      "import/named": "off",
      "max-len": ["warn", { code: 120 }],
      curly: "error",
      "brace-style": ["error", "1tbs"],
      "no-lonely-if": "error",
      "nonblock-statement-body-position": ["error", "below"],
      "space-before-function-paren": [
        "error",
        {
          anonymous: "always",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
      ],
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "vue/block-lang": [
        "error",
        {
          script: {
            lang: ["ts", "tsx"],
          },
        },
      ],
      "vue/no-multiple-template-root": "off",
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "always",
            normal: "always",
            component: "always",
          },
          svg: "always",
        },
      ],
      "@typescript-eslint/naming-convention": [
        2,
        {
          selector: "enum",
          format: ["PascalCase"],
        },
        {
          selector: "enumMember",
          format: ["UPPER_CASE"],
        },
      ],
      "@typescript-eslint/no-explicit-any": ["warn"],
      "vue/max-attributes-per-line": [
        "warn",
        {
          "singleline": {
            "max": 1
          },      
          "multiline": {
            "max": 1
          }
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['~/components/**/*.vue', '#build/components'],
              importNames: ['default'],
              message: 'Please import from "#components" instead.'
            },
            {
              group: ['@playwright/test'],
              importNames: ['test', 'expect'],
              message: 'Please import from "@@/playwright/fixtures/base" instead.'
            }
          ]
        }
      ],
      'import/no-named-as-default-member': 'off'
    }
  }
)
