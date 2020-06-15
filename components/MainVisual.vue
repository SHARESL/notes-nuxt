<template>
  <div class="c-mv">
    <div class="c-mv__inner">
      <h1 class="c-mv__title u-futura-pt-condensed">SHARESL TECH BLOG</h1>
      <p class="c-mv__summary c-summary">notes by SHARESLは<br class="u-sp">株式会社SHARESLの開発者ブログです。<br>主に開発者が日々考えていること、<br class="u-sp">メモとして残しておきたい備忘録として<br class="u-sp">記事を更新しています。</p>
      <nuxt-link class="c-mv__scroll u-futura-pt-condensed"v-scroll-to="'#main'" to>SCROLL</nuxt-link>
    </div>
    <!-- /.c-mv__inner -->
    <div class="c-mv__loader" ref="loader"></div>
  </div>
  <!-- /.c-mv -->
</template>

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