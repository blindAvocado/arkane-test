module.exports = {
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:tailwindcss/recommended"
  ],
  ignorePatterns: [".eslintrc.cjs"],
  plugins: ["tailwindcss", "vue"],
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
          // Запрещаем прямые импорты компонентов из папки components.
          // так же запрещаем импорты #build/components,
          // ide иногда подсказывает, но от туда импортировать нельзя
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
  },
};
