<template>
  <div class="p-top">
    <MainVisual />
    <div id="main">
      <NewList />
    </div>
  </div>
  <!-- /.p-top -->
</template>

<script>
  import MainVisual from '~/components/MainVisual.vue'
  // import PickUp from '~/components/PickUp.vue'
  import NewList from '~/components/NewList.vue'

  export default {
    components : {
      MainVisual,
      // PickUp,
      NewList
    },
    async asyncData({ store, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload);
        return;
      }
      if(!store.getters.allPosts){
        await store.dispatch('fetchAllPost');
      }
    },
    data() {
      return {
        title    : 'SHARESL TECH BLOG',
        subtitle : 'SHARESLの開発者ブログ',
      }
    },
    head() {
      return {
        titleTemplate: null,
        title: `notes by SHARESL`
      }
    }
  }
</script>