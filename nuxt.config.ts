// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    'nuxt-svgo'
  ],
  runtimeConfig: {
    kodMobiApi: {
      token: process.env.NUXT_KOD_MOBI_API_TOKEN,
      baseUrl: process.env.NUXT_KOD_MOBI_API_BASE_URL
    }
  },
  eslint: {
    lintOnStart: false
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    restructureDir: false,
    locales: [
      {
        code: 'ru',
        language: 'ru-RU',
        file: './locales/ru.json',
        name: 'Русский'
      },
      {
        code: 'en',
        language: 'en-US',
        file: './locales/en.json',
        name: 'English'
      }
    ]
  },
  css: [
    '~/assets/css/main.pcss'
  ]
})
