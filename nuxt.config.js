require("dotenv").config()
import axios from 'axios';

const baseName = process.env.BASE_NAME || 'notes by SHARESL'
const baseDesc = process.env.BASE_DESC || 'notes by SHARESLは大阪のWeb制作会社・株式会社SHARESLの開発者ブログです。制作者が日々考えていることのアウトプットやメモとして残しておきたい備忘録としての記事を更新していきます。WEB制作の実務の中で気づいたことをまとめて後で見返せるノートのような役割を目的としています。'
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseOgp = process.env.BASE_OGP || `${baseUrl}/img/ogp.png`
const baseDir = process.env.BASE_DIR || '/'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: `%s｜${baseName}`,
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'robots', name: 'robots', content: 'noindex,nofollow' },
    { hid: 'description', name: 'description', content: baseDesc },
    { hid: 'og:site_name', property: 'og:site_name', content: baseName },
    { hid: 'og:type', property: 'og:type', content: 'website' },
    { hid: 'og:url', property: 'og:url', content: baseUrl },
    { hid: 'og:title', property: 'og:title', content: baseName },
    { hid: 'og:description', property: 'og:description', content: baseDesc },
    { hid: 'og:image', property: 'og:image', content: baseOgp },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@notesbysharesl' },
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
        axios.get(`${process.env.BASE_API_URL}/wp/v2/categories`),
        axios.get(`${process.env.BASE_API_URL}/wp/v2/tags?per_page=100`),
        axios.get(`${process.env.BASE_API_URL}/custom/v0/members`)
        ])
      .then (axios.spread( (allPosts, categories, tags, members) => {

        //記事詳細ページ
        const route_post = allPosts.data.map((post) => {
          return {
            route   : `/articles/${post.id}`,
            payload : {
              allPosts    : allPosts.data,
              currentPost : post,
              categories  : categories.data,
              allTags     : tags.data,
              members     : members.data
            }
          }
        })

        //カテゴリーページ
        const route_category = categories.data.map((category) => {
          return {
            route   : `/${category.slug}`,
            payload : {
              allPosts        : allPosts.data,
              categories      : categories.data,
              currentCategory : category,
              allTags         : tags.data,
              members         : members.data
            }
          }
        })

        //タグページ
        const route_tag = tags.data.map((tag) => {
          return {
            route   : `/tag/${tag.slug}`,
            payload : {
              allPosts    : allPosts.data,
              categories  : categories.data,
              allTags     : tags.data,
              currentTag  : tag,
              members     : members.data
            }
          }
        })

        //新着一覧
        const route_all = [{
          route   : '/articles',
          payload : {
            allPosts    : allPosts.data,
            categories  : categories.data,
            allTags     : tags.data,
            members     : members.data
          }
        }]

        //メンバー一覧
        const route_members = [{
          route   : '/member',
          payload : {
            allPosts    : allPosts.data,
            categories  : categories.data,
            allTags     : tags.data,
            members     : members.data
          }
        }]

        //メンバー詳細
        const route_member = members.data.map((member) => {
          return {
            route   : `/member/${member.author_slug}`,
            payload : {
              allPosts      : allPosts.data,
              categories    : categories.data,
              allTags       : tags.data,
              members       : members.data,
              currentMember : member,
            }
          }
        })

        //その他固定ページ
        const other_pages = ['/', '/contact', '/about'];
        const route_page = other_pages.map((page) => {
          return {
            route   : page,
            payload : {
              allPosts    : allPosts.data,
              categories  : categories.data,
              allTags     : tags.data,
              members     : members.data
            }
          }
        })

        callback (null, route_post.concat(
          route_category,
          route_tag,
          route_all,
          route_members,
          route_member,
          route_page,))
      }))
    },
  },

  env: {
    baseUrl      : baseUrl,
    BASE_API_URL : process.env.BASE_API_URL,
    BASE_DESC    : baseDesc,
    BASE_OGP     : baseOgp,
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
