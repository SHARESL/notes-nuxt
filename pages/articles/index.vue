<template>
  <div class="p-category">
    <MainVisual :title="title" :subtitle="subtitle" :slug="slug" />
    <div class="p-category__inner">
      <CategoryList />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import MainVisual from '~/components/MainVisual.vue'
  import CategoryList from '~/components/CategoryList.vue'

  export default {
    data() {
      return {
        title           : 'ARTICLES',
        subtitle        : 'すべての記事',
        slug            : 'articles',
        caption         : 'ALL'
      }
    },
    components : {
      MainVisual,
      CategoryList
    }
  }
</script>