// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: "Nuxt + LlamaIndex",
    }
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "nuxt-icon", '@vueuse/nuxt', 'radix-vue/nuxt']
})