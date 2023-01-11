// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
     app: {
          head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'lexica-img-gen',
            meta: [
              // <meta name="description" content="lexica-img-gen">
              { name: 'description', content: 'lexica-img-gen.' }
            ],
          }
        },

     modules: ['@nuxtjs/tailwindcss','nuxt-icon','@nuxtjs/supabase','@nuxt/image-edge']
})
