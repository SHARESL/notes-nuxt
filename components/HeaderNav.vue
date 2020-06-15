<template>
  <div class="l-header__nav" :class="toggleMenuClass">
    <div class="l-header__nav-inner">
      <nuxt-link to="/articles">ALL</nuxt-link>
      <nuxt-link to="/tips">TIPS</nuxt-link>
      <nuxt-link to="/try">TRY</nuxt-link>
      <nuxt-link to="/column">COLUMN</nuxt-link>
    </div>
    <!-- /.l-header__nav-inner -->
    <button class="l-header__nav-btn" type="button" v-touch:tap="toggleMenu">
      <span class="l-header__nav-btn-icon"></span>
    </button>
  </div>
  <!-- /.l-header__nav -->
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed : {
      ...mapGetters(['isMenuOpen']),
      toggleMenuClass(){
        return {
          'is-menu-open' : this.isMenuOpen
        }
      }
    },
    methods : {
      ...mapActions(['toggleMenu'])
    }
  }
</script>