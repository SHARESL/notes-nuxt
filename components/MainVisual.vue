<template>
  <div class="c-mv">
    <h1 class="c-mv__title u-futura-pt-condensed">
      <span class="c-mv__title__main">{{title}}</span>
      <span class="c-mv__title__sub">{{subtitle}}</span>
    </h1>
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
  text-align: center;

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

  &__title{
    position: relative;
    z-index: 10;
    color:#fff;

    &__main{
      @include fz(54);
      letter-spacing: .06em;
    }

    &__sub{
      display: block;
      @include fz(18);
      font-weight: 400;
      letter-spacing: .06em;
    }
  }

  &__image{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
    object-fit: cover;
  }
}
</style>

<script>
  export default {
    props:{
      title    : String,
      subtitle : String
    }
  }
</script>