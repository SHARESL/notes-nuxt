<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'

  export default {
    data() {
      return {
        title           : 'ARTICLES',
        subtitle        : 'すべての記事'
      }
    },
    components : {
      Title,
      CategoryList
    }
  }
</script>