<template>
  <header class="l-header">
    <div class="l-header__inner">
      <Logo class="l-header__logo" />
      <HeaderNav class="l-header__nav" />
    </div>
    <!-- /.l-header__inner -->
  </header>
  <!-- /.l-header -->
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import HeaderNav from '~/components/HeaderNav.vue'

  export default {
    components: {
      Logo,
      HeaderNav
    }
  }
</script>