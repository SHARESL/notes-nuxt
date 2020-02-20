<template>
  <div class="c-mv">
    <h1 class="c-mv__title">
      <span class="c-mv__title__main">{{title}}</span>
    </h1>
    <img
    class="c-mv__image"
    :src="mainVisualBy(slug)">
  </div>
  <!-- /.c-mv -->
</template>

<style lang="scss" scoped>
.c-mv{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height:380px;
  text-align: center;
  padding: 120px 30px;


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
    backdrop-filter: blur(3px) brightness(1.2) saturate(1.5);
  }

  &__title{
    position: relative;
    z-index: 10;
    line-height: 2.7;

    &__main{
      @include fz(30);
      font-weight: 900;
      background: #fff;
      box-shadow: 0 0 0 0.5em #fff;
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
    props :{
      slug     : String,
      title    : String
    },
    methods : {
      /*
      * 画像
      * @param {String} slug ページスラッグ
      */
      mainVisualBy(slug) {
        return require(`~/assets/images/mv-pc-${slug}.jpg`);
      }
    }
  }
</script>