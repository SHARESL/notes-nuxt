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
    fallback : true,
    interval : 100,
    routes (callback) {
      Promise.all([
        axios.get(`${process.env.BASE_API_URL}/custom/v0/all`),
        axios.get(`${process.env.BASE_API_URL}/wp/v2/categories`)
        ])
      .then (axios.spread( (allPosts, categories) => {

        //記事詳細ページ
        const route_post = allPosts.data.map((post) => {
          return {
            route   : `/articles/${post.id}`,
            payload : post
          }
        })

        //カテゴリーページ
        const route_category = categories.data.map((category) => {
          return {
            route   : `${category.slug}`,
            payload : allPosts.data
          }
        })

        //新着一覧
        const route_all = [{
          route   : '/articles',
          payload : allPosts.data
        }]

        //TOP新着記事一覧
        const route_top = [{
          route   : '/',
          payload : allPosts.data
        }]

        callback (null, route_post.concat(route_category, route_all, route_top))
      }))
    },
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
