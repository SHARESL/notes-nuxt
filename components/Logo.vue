<template>
  <div class="c-logo">
    <nuxt-link to="/" class="c-logo__link">
      <LogoSvg />
    </nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.c-logo{
  width: 100%;
  max-width:180px;
}
.c-logo__link{
  position: relative;
  height:0;
  padding-top: calc(43 / 245.58 * 100%);
}

</style>

<script>
  import LogoSvg from '~/assets/svg/logo.svg'
  export default {
    components: {
      LogoSvg
    }
  }
</script>