<template>
  <div class="l-header__nav" :class="toggleMenuClass">
    <div class="l-header__nav-inner">
      <nuxt-link to="/articles/">ALL</nuxt-link>
      <nuxt-link to="/tips/">TIPS</nuxt-link>
      <nuxt-link to="/try/">TRY</nuxt-link>
      <nuxt-link to="/column/">COLUMN</nuxt-link>
    </div>
    <!-- /.l-header__nav-inner -->
    <div class="l-header__search">
      <button type="button" class="l-header__search-btn" @click="toggleSearchForm" :class="toggleSearchClass">
        <span class="l-header__search-icon">
          <SearchIconSvg />
        </span>
        <!-- /.l-header__search-icon -->
      </button>
      <!-- /.l-header__search-btn -->
    </div>
    <!-- /.l-header__search -->
    <transition name="search">
      <form class="l-header__form" @submit.prevent="onSearchFormSubmit" autocomplete="off" novalidate v-show="isSearchFormOpen">
        <div class="l-header__form-inner">
          <input class="l-header__form-input" type="text" name="s" v-model="searchText" placeholder="記事を検索" autocomplete="off">
          <button class="l-header__form-submit" type="submit">
            <span class="l-header__form-icon">
              <SearchIconSvg />
            </span>
            <!-- /.l-header__form-icon -->
          </button>
          <!-- /.l-header__search-btn -->
        </div>
        <!-- /.l-header__form-inner -->
      </form>
      <!-- /.l-header__form -->
    </transition>
    <button class="l-header__nav-btn" type="button" v-touch:tap="toggleMenu">
      <span class="l-header__nav-btn-icon"></span>
    </button>
  </div>
  <!-- /.l-header__nav -->
</template>

<style lang="scss" scoped>
.search-enter-active,
.search-leave-active {
  transition: .6s $ease-out-expo;
  will-change: transform;
  backface-visibility: hidden;
}

.search-enter,
.search-leave-to {
  transform:translateY(100%);
}
</style>

<script>
  import SearchIconSvg from '~/assets/svg/search.svg'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      SearchIconSvg
    },
    data() {
      return {
        isSearchFormOpen : false,
        searchText       : ''
      }
    },
    computed : {
      ...mapGetters(['isMenuOpen']),
      toggleMenuClass(){
        return {
          'is-menu-open' : this.isMenuOpen
        }
      },
      toggleSearchClass(){
        return {
          'is-search-open' : this.isSearchFormOpen
        }
      }
    },
    methods : {
      ...mapActions(['toggleMenu', 'saveSearchText', 'closeMenu']),
      toggleSearchForm() {
        this.closeMenu();
        this.isSearchFormOpen = !this.isSearchFormOpen;
      },
      closeSearchForm(){
        this.isSearchFormOpen = false;
      },
      onSearchFormSubmit(){
        this.saveSearchText({
          searchText : this.searchText
        });
        this.$router.push({ name: 'search' });
        this.scrollTop();
        this.closeMenu();
        this.closeSearchForm();
      },
      scrollTop(){
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }
</script>