<template>
  <header class="l-header">
    <div class="l-header__inner">
      <Logo class="l-header__logo" />
      <Nav class="l-header__nav" />
    </div>
    <!-- /.l-header__inner -->
  </header>
  <!-- /.l-header -->
</template>

<style lang="scss" scoped>
.l-header{
  &__inner{

  }
  &__logo{
    position: fixed;
    top:30px;
    left:30px;
    z-index: 1000;
  }

  &__nav{
    position: fixed;
    top:30px;
    right:30px;
    z-index: 1000;

    a{
      box-shadow:$boxshadow6;
    }
  }
}
</style>

<script>
  import Logo from '~/components/Logo.vue'
  import Nav from '~/components/Nav.vue'

  export default {
    components: {
      Logo,
      Nav
    }
  }
</script>