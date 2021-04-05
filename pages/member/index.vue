<template>
  <div class="p-member">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-member__inner">
      <div class="p-member__item" v-for="member in members" :key="member.id">
        <Author :post="member" />
      </div>
      <!-- /.p-member__item -->
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import Author from '~/components/Author.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components : {
      Title,
      Author
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async asyncData({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        await store.commit('saveAllPages', payload.pages);
        await store.commit('saveCurrentPageBySlug', route.name);
        return;
      }
      else {
        if(store.getters.allPages){
          await store.commit('saveCurrentPageBySlug', route.name);
        }
        if(!store.getters.allPages && !store.getters.currentPage){
          await store.dispatch('fetchPages', route.name);
        }
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
        }
        if(!store.getters.allCategories){
          await store.dispatch('fetchCategories');
        }
        if(!store.getters.members){
          await store.dispatch('fetchMembers');
        }
        if(!store.getters.allTags){
          await store.dispatch('fetchTags');
        }
      }
    },
    data() {
      return {
        title    : 'MEMBERS',
        subtitle : 'メンバー紹介'
      }
    },
    head() {
      const page = this.$store.getters.currentPage;
      if(!page){
        return;
      }
      return {
        titleTemplate: null,
        title : page.title,
        meta  : [
        { hid: 'description', name: 'description', content: page.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: page.title },
        { hid: 'og:description', property: 'og:description', content:page.description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/${this.$route.name}` },
        { hid: 'og:image', property: 'og:image', content: page.ogp_img },
        ]
      }
    },
    computed: {
      ...mapGetters(['members']),
    },
    methods: {
      ...mapActions(['closeMenu'])
    }
  }
</script>