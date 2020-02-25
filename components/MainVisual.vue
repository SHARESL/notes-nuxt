<template>
  <div class="c-mv">
    <div class="c-mv__inner">
      <h1 class="c-mv__title u-futura-pt-condensed">SHARESL TECH BLOG</h1>
      <p class="c-mv__summary c-summary">notes by SHARESLは株式会社SHARESLの開発者ブログです。<br>主に開発者が日々考えていることのアウトプット、<br>メモとして残しておきたい備忘録として記事を更新しています。</p>
      <nuxt-link class="c-mv__scroll u-futura-pt-condensed"v-scroll-to="'#main'" to>SCROLL</nuxt-link>
    </div>
    <!-- /.c-mv__inner -->
    <div class="c-mv__loader" ref="loader"></div>
  </div>
  <!-- /.c-mv -->
</template>

<style lang="scss" scoped>
.c-mv{
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height:100vh;
  text-align: center;
  padding:90px;

  &__inner{
    position: relative;
    max-width:1080px;
  }

  &__title{
    @include fz(99);
    background: #000;
    background: $gradient7;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__summary{
    margin-top: 30px;
    font-weight: 600;
  }

  &__scroll{
    position: absolute;
    top:calc(100% + 60px);
    left:50%;
    z-index: 10;
    padding:30px 9px;
    @include fz(9);
    letter-spacing: .03em;
    color:$link-color;
    border:2px solid transparent;
    border-radius:60px;
    transform: translateX(-50%);

    &::after{
      content:"";
      display: block;
      width: 1px;
      height:60px;
      margin:15px auto 0;
      background: $link-color;
      @include animation(ScaleInOutY 1.5s $ease-in-out-expo infinite reverse);
    }

    &:hover{
      box-shadow:$boxshadow6;
      border-color:$link-color;
      backdrop-filter: blur(3px);
    }
  }

  &__loader{
    position: absolute;
    top:0;
    left:0;
    z-index: -1;
    width: 100%;
    height:100%;
  }
}
</style>

<script>
  import * as THREE from 'three'
  import DOTS from 'vanta/dist/vanta.dots.min'

  if (process.browser) {
    window.THREE = THREE;
  }

  export default {
    mounted(){
      const target = this.$refs.loader;
      DOTS({
        el              : target,
        THREE           : THREE,
        mouseControls   : true,
        touchControls   : true,
        minHeight       : 200.00,
        minWidth        : 200.00,
        scale           : 1.00,
        scaleMobile     : 1.00,
        color           : 0x653ceb,
        backgroundColor : 0xffffff,
        size            : 2.3,
        spacing         : 21,
        showLines       : false
      })
    }
  }
</script>