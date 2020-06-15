<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList :caption="subtitle" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import { mapActions } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async fetch({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveCurrentCategory', payload.currentCategory);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        return;
      }
      else {
        if(store.getters.allCategories){
          await store.commit('saveCurrentCategoryBySlug', route.name);
        }
        if(!store.getters.allCategories && !store.getters.currentCategory){
          await store.dispatch('fetchCategories', route.name);
        }
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
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
        title    : 'ARTICLES',
        subtitle : '「TIPS」の記事一覧'
      }
    },
    head() {
      const category = this.$store.getters.currentCategory;
      if(!category){
        return;
      }
      return {
        title : this.subtitle,
        meta  : [
        { hid: 'description', name: 'description', content: category.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.subtitle },
        { hid: 'og:description', property: 'og:description', content:category.description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/${this.$route.name}` },
        { hid: 'og:image', property: 'og:image', content: category.fields.ogp_img },
        ]
      }
    },
    methods : {
      ...mapActions(['closeMenu'])
    }
  }
</script>