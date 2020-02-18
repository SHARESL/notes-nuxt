<template>
  <div class="p-about">
    <MainVisual :title="'ABOUT'" :subtitle="'当サイトについて'" />
  </div>
  <!-- /.p-top -->
</template>

<style lang="scss" scoped>
</style>

<script>
  import MainVisual from '~/components/MainVisual.vue'

  export default {
    components : {
      MainVisual
    }
  }
</script>