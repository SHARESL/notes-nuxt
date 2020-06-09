require("dotenv").config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || 'netlify デモサイト｜notes by SHARESL',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    { hid: 'robots', name: 'robots', content: 'noindex,nofollow' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: 'apple-touch-icon-precomposed',
      sizes: "256x256",
      href: "/icon.png"
    }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  '~/assets/sass/style.scss',
  { src: '~/node_modules/highlight.js/styles/monokai-sublime.css', lang: 'css' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  '~/plugins/vue-scrollto',
  '~/plugins/vee-validate'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/dotenv',
  '@nuxtjs/axios',
  '@nuxtjs/style-resources',
  'nuxt-svg-loader'
  ],

  env: {
    BASE_API_URL: process.env.BASE_API_URL
  },

  axios: {
    baseURL: process.env.BASE_API_URL
  },

  styleResources: {
    scss: [
    '~/assets/sass/foundation/_variable.scss',
    '~/assets/sass/foundation/_mixin.scss',
    '~/assets/sass/foundation/_function.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: ["vee-validate/dist/rules"],
    extractCSS: true,
    postcss: {
      preset: {
        autoprefixer: { grid: 'autoplace' }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
