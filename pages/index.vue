<template>
  <div class="p-top">
    <MainVisual />
    <div id="main">
      <PickUp />
      <NewList />
    </div>
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
      }
    },
    components : {
      MainVisual,
      PickUp,
      NewList
    }
  }
</script>