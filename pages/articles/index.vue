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
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'

  export default {
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
        subtitle : 'すべての記事'
      }
    },
    head() {
      return {
        title: `${this.subtitle}｜notes by SHARESL`
      }
    }
  }
</script>