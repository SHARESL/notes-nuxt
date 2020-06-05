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
    async fetch({ store }){
      await store.dispatch('fetchNewPosts');
    },
    data() {
      return {
        title    : 'SHARESL TECH BLOG',
        subtitle : 'SHARESLの開発者ブログ',
      }
    },
    head() {
      return {
        title: `notes by SHARESL`
      }
    }
  }
</script>