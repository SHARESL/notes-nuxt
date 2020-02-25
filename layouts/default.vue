<template>
  <div class="l-cover" v-cloak>
    <div class="l-cover__inner">
      <Header />
      <nuxt class="l-cover__main" />
      <Footer />
    </div>
    <!-- /.l-cover__inner -->
  </div>
  <!-- /.l-cover -->
</template>

<style lang="scss" scoped>
[v-cloak] {
  display:none;
}
</style>

<script>
  import Header from '~/components/Header'
  import Footer from '~/components/Footer'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>
