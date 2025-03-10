// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: 'src/',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss'
  ],
  runtimeConfig: {
    kodMobiApi: {
      token: process.env.NUXT_KOD_MOBI_API_TOKEN,
      baseUrl: process.env.NUXT_KOD_MOBI_API_BASE_URL
    }
  }
})