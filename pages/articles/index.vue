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
    mixins     : [Meta],
    components : {
      Title,
      CategoryList
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
    },
    data() {
      return {
        title    : 'ARTICLES',
        subtitle : 'すべての記事',
        meta     : {
          title: 'すべての記事',
          description: 'すべての記事一覧ページです。notes by SHARESLは大阪のWeb制作会社・株式会社SHARESLの開発者ブログです。制作者が日々考えていることのアウトプットやメモとして残しておきたい備忘録としての記事を更新していきます。',
          type: 'article',
          url: `${process.env.baseUrl}/articles`
        }
      }
    }
  }
</script>