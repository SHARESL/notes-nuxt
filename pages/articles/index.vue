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
    },
    async fetch({ store }){
      await store.dispatch('fetchCategoryPosts', {
        categorySlug : 'all',
        paged        : 1
      });
    }
  }
</script>