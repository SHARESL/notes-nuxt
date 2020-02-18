# notes-nuxt

> Nuxt.js + WordPress + netlify でテックブログを作成

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


# ディレクトリ構成
```
root
|
└ pages/
|   └ index.vue
|   └ articles/
|      └ index.vue
|      └ _id.vue
|   └ about.vue
|   └ member/
|      └ index.vue
|      └ _slug.vue
└ components/
|   └ Logo.vue
|   └ Nav.vue
|   └ Menu.vue
|   └ Search.vue
|   └ Breadcrumb.vue
|   └ Tags.vue
|   └ Categories.vue
|   └ ShareButtons.vue
|   └ Member.vue
|   └ BlogList.vue
└ layouts/
    └ Header.vue
    └ Footer.vue
```
- お問い合わせは削る
- 全体的にブログリストをシンプルに表示させる構成に
- About・Member・Contactはナビから外す
- カテゴリーページを優先表示させる
