require("dotenv").config()
import axios from 'axios';

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

  generate: {
    interval: 1000,
    routes (callback) {
      axios.get(`${process.env.BASE_API_URL}/wp/v2/posts`)
      .then(response => {
        // WordPressの総記事数を取得
        const totalPosts = response.headers['x-wp-total']

        Promise.all([
          axios.get(`${process.env.BASE_API_URL}/wp/v2/posts?per_page=${totalPosts}`),
          axios.get(`${process.env.BASE_API_URL}/wp/v2/categories`)
          ])
        .then (axios.spread(function (posts, categories) {
          let routes1 = posts.data.map((post) => {
            return {
              route: `/articles/${post.id}`,
              payload: post
            }
          })

          let routes2 = categories.data.map((category) => {
            return `${category.slug}`
          })

          callback (null, routes1.concat(routes2))
        }))
      })
    }
  },

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
