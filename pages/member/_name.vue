<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__author">
      <Author :author="author" />
    </div>
    <!-- /.p-category__author -->
    <div class="p-category__inner">
      <CategoryList :hide-nav="false" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<style lang="scss" scoped>
.p-category{
  &__author{
    max-width:690px;
    margin:auto;
  }
}
</style>

<script>
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import Author from '~/components/Author.vue'

  export default {
    data() {
      return {
        title    : 'ARTICLES',
        subtitle : `${this.$route.params.name}の書いた記事`,
        author   : {
          name  : 'INOUE',
          image : '~/assets/images/author.png',
          slug  : this.$route.params.name
        }
      }
    },
    components : {
      Title,
      CategoryList,
      Author
    }
  }
</script>