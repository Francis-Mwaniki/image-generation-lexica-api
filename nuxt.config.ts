// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    
     ssr: false,
     modules: ['@nuxtjs/tailwindcss','nuxt-icon','@nuxtjs/supabase','@nuxt/image-edge'],
     css: ["~/assets/css/main.css", "~/assets/css/global.css"]
})
