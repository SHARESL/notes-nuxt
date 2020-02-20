<template>
  <div class="p-category">
    <MainVisual :title="title" :subtitle="subtitle" :slug="slug" />
    <div class="p-category__inner">
      <CategoryList :caption="subtitle" />
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
        title    : 'ARTICLES',
        subtitle : '「COLUMN」の記事一覧',
        slug     : 'articles'
      }
    },
    components : {
      MainVisual,
      CategoryList
    }
  }
</script>