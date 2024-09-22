export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiUrl: 'http://127.0.0.1:8000/api'
    }
  },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo']
})