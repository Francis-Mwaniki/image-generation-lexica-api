// import { Theme } from "./theme"
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/image",
      '@nuxt/ui',
      '@nuxtjs/color-mode',
      'nuxt-icon', // https://github.com/nuxt-modules/icon
      

    ],
    // image: {
    //   domains: ['lexica.art']
    // },

    ui:{
      icons: 'all',
      safelistColors: ['orange'],
    },
    colorMode: {
      classSuffix: '', // This is so we play nice with TailwindCSS
    },
  
 
 
  css: ['~/styles/global.css', '~/styles/main.css'],
  
	
})
