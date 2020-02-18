<template>
  <div class="l-cover">
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
.l-cover{
  position: relative;
  min-height:100vh;
  padding:15px;
  background: $lgray;

  &::before{
    pointer-events:none;
    content:"";
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
    display: block;
    width: 100%;
    height: 100%;
    border:15px solid $link-color;
    //border-image: $gradient7 1;
  }
}

.l-cover__inner{
  background: #fff;
}

.l-cover__main{
  min-height:100vh;
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
