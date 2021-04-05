<template>
  <div class="p-top">
    <MainVisual />
    <div id="main">
      <PickUp />
      <NewList />
    </div>
  </div>
  <!-- /.p-top -->
</template>

<script>
  import MainVisual from '~/components/MainVisual.vue'
  import PickUp from '~/components/PickUp.vue'
  import NewList from '~/components/NewList.vue'
  import { mapActions } from 'vuex'

  export default {
    components : {
      MainVisual,
      PickUp,
      NewList
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
        await store.commit('saveAllPages', payload.pages);
        await store.commit('saveCurrentPageBySlug', 'top');
        return;
      }
      else{
        if(store.getters.allPages){
          await store.commit('saveCurrentPageBySlug', 'top');
        }
        if(!store.getters.allPages && !store.getters.currentPage){
          await store.dispatch('fetchPages', 'top');
        }
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
        title    : 'SHARESL TECH BLOG',
        subtitle : 'SHARESLの開発者ブログ',
      }
    },
    head() {
      const page = this.$store.getters.currentPage;
      if(!page){
        return;
      }
      return {
        titleTemplate: null,
        title: page.title,
        meta  : [
        { hid: 'description', name: 'description', content: page.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: page.title },
        { hid: 'og:description', property: 'og:description', content:page.description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/` },
        { hid: 'og:image', property: 'og:image', content: page.ogp_img },
        ]
      }
    },
    methods : {
      ...mapActions(['closeMenu'])
    }
  }
</script>