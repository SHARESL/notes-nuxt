<template>
  <div class="c-mv">
    <h1 class="c-mv__title u-futura-pt-condensed">SHARESL TECH BLOG</h1>
    <img
    class="c-mv__image"
    src="~/assets/images/mv-pc.jpg">
  </div>
  <!-- /.c-mv -->
</template>

<style lang="scss" scoped>
.c-mv{
  position: relative;
  padding: 90px 30px;

  &::before{
    opacity: .7;
    content:"";
    position: absolute;
    top:0;
    left:0;
    z-index: 5;
    width: 100%;
    height:100%;
    background: $gradient7;
    backdrop-filter: blur(3px);
  }
}
.c-mv__title{
  position: relative;
  z-index: 10;
  @include fz(54);
  color:#fff;
}
.c-mv__image{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  object-fit: cover;
}
</style>

<script>
  export default {

  }
</script>