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
  import { mapActions } from 'vuex'

  export default {
    mixins     : [Meta],
    components : {
      Title,
      CategoryList
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async asyncData({ store, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        return;
      }
      else{
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
        }
        if(!store.getters.allCategories){
          await store.dispatch('fetchCategories');
        }
        if(!store.getters.members){
          await store.dispatch('fetchMembers');
        }
        if(!store.getters.allTags){
          await store.dispatch('fetchTags');
        }
      }
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
    },
    methods : {
      ...mapActions(['closeMenu'])
    }
  }
</script>