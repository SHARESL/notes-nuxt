<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__search">
      <input class="p-category__search-input" type="text" name="s" v-model="searchText" placeholder="記事を検索" autocomplete="off">
      <button class="p-category__search-submit" type="submit">
        <span class="p-category__search-icon">
          <SearchIconSvg />
        </span>
        <!-- /.p-category__search-icon -->
      </button>
      <!-- /.p-category__search-btn -->
    </div>
    <!-- /.p-category__search -->
    <div class="p-category__inner">
      <client-only>
        <CategoryList :hideNav="true" />
      </client-only>
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import SearchIconSvg from '~/assets/svg/search.svg'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList,
      SearchIconSvg
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async asyncData({ params, error, payload, store }) {
      if (payload){
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        return
      }
      else{
        if(!store.getters.members){
          await store.dispatch('fetchMembers');
        }
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
        }
        if(!store.getters.allCategories){
          await store.dispatch('fetchCategories');
        }
        if(!store.getters.allTags){
          await store.dispatch('fetchTags');
        }
      }
    },
    data() {
      return {
        title    : 'SEARCH'
      }
    },
    head() {
      return {
        title : 'SEARCH',
        meta  : [
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow' }
        ]
      }
    },
    computed : {
      searchText : {
        get () {
          return this.$store.getters.searchText;
        },
        set (value) {
          this.$store.commit('saveSearchText', value);
        }
      },
      subtitle(){
        const searchText = this.$store.getters.searchText ? this.$store.getters.searchText.replace(/\+/g, " ") : null;
        const pagetitle = searchText ? `「${searchText}」の検索結果` : '記事検索';
        return pagetitle;
      }
    },
    methods: {
      ...mapActions(['closeMenu'])
    }
  }
</script>