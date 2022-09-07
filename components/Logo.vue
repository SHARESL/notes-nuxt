<template>
  <div class="c-logo">
    <nuxt-link to="/" class="c-logo__link">
      <LogoSvg />
    </nuxt-link>
  </div>
</template>

<script>
  import LogoSvg from '~/assets/svg/logo.svg'
  export default {
    components: {
      LogoSvg
    }
  }
</script>
