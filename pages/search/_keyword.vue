<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList :hideNav="true" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import { mapActions } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async fetch({ params, error, payload, store }) {
      if (payload){
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        return
      }
      else{
        if(!store.getters.members){
          await store.dispatch('fetchMembers');
        }
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
        }
        if(!store.getters.allCategories){
          await store.dispatch('fetchCategories');
        }
        if(!store.getters.allTags){
          await store.dispatch('fetchTags');
        }
      }
    },
    data() {
      return {
        title    : 'SEARCH RESULT'
      }
    },
    head() {
      const trim = this.$route.params.keyword.replace(/\+/g, " ");
      return {
        title : `「${trim}」の検索結果｜notes by SHARESL`,
        meta  : [
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow' }
        ]
      }
    },
    computed : {
      subtitle(){
        const trim = this.$route.params.keyword.replace(/\+/g, " ");
        return `「${trim}」の検索結果`;
      }
    },
    methods: {
      ...mapActions(['closeMenu'])
    }
  }
</script>