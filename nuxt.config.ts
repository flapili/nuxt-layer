export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@unocss/nuxt',
    'radix-vue/nuxt',
  ],

  nitro: {
    firebase: {
      gen: 2,
      nodeVersion: '22',
      httpsOptions: {
        region: 'europe-west1',
      },
    },
  },
})
