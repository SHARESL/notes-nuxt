<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList :caption="subtitle" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Meta from '~/mixins/meta'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'

  export default {
    components : {
      Title,
      CategoryList
    },
    mixins: [Meta],
    data() {
      return {
        title    : 'ARTICLES',
        subtitle : '「COLUMN」の記事一覧',
        meta: {
          title: `「COLUMN」の記事一覧`,
          description: 'notes by SHARESLの「COLUMN」カテゴリのブログ記事一覧です。制作者が実務の中で思っていることや、テクニカルなことでは無いけど制作する上で大切にしていることなど、文章として残しておきたいものを書いているブログ記事の一覧を掲載しています。',
          type: 'article',
          url: `${process.env.baseUrl}/column`
        }
      }
    },
    async fetch({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload);
        return;
      }
      if(store.getters.allPosts){
        return;
      }
      await store.dispatch('fetchAllPost');
    }
  }
</script>