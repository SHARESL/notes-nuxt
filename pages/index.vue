<template>
  <div class="p-top">
    <MainVisual />
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
    components : {
      MainVisual,
      PickUp,
      NewList
    }
  }
</script>