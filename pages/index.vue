<template>
  <div class="p-top">
    <MainVisual :title="title" :subtitle="subtitle" :slug="slug" />
    <PickUp />
    <NewList />
  </div>
  <!-- /.p-top -->
</template>

<style lang="scss" scoped>
</style>

<script>
  import MainVisual from '~/components/MainVisual.vue'
  import PickUp from '~/components/PickUp.vue'
  import NewList from '~/components/NewList.vue'

  export default {
    data() {
      return {
        title    : 'SHARESL TECH BLOG',
        subtitle : 'SHARESLの開発者ブログ',
        slug     : 'top'
      }
    },
    components : {
      MainVisual,
      PickUp,
      NewList
    }
  }
</script>