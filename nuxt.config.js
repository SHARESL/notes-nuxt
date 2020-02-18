
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  '~/assets/sass/foundation/_reset.scss',
  '~/assets/sass/foundation/_font.scss',
  '~/assets/sass/foundation/_setting.scss',
  '~/assets/sass/common.scss',
  '~/assets/sass/object/utility/_utility.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  '@nuxtjs/style-resources',
  'nuxt-svg-loader'
  ],

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
