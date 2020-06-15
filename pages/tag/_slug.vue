<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList :caption="subtitle" :hideNav="true" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import { mapGetters, mapActions } from 'vuex'

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
    async fetch({ params, store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveCurrentTag', payload.currentTag);
        await store.commit('saveMembers', payload.members);
        return;
      }
      else {
        if(!params.slug){
          await error({ statusCode: 404, message: 'Page not found' });
          return;
        }
        if(store.getters.allTags){
          await store.commit('saveCurrentTagBySlug', params.slug);
        }
        if(!store.getters.allTags && !store.getters.currentTag){
          await store.dispatch('fetchTags', params.slug);
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
      }
    },
    data() {
      return {
        title    : 'ARTICLES'
      }
    },
    head() {
      const tag = this.$store.getters.currentTag;
      if(!tag){
        return;
      }
      const description = `# ${tag.name}タグのブログ記事一覧です。notes by SHARESLは大阪のWeb制作会社・株式会社SHARESLの開発者ブログです。制作者が日々考えていることのアウトプットやメモとして残しておきたい備忘録としての記事を更新していきます。`;
      return {
        title: `# ${tag.name}タグの記事｜notes by SHARESL`,
        meta  : [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `# ${tag.name}タグの記事｜notes by SHARESL` },
        { hid: 'og:description', property: 'og:description', description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/tag/${this.$route.params.slug}` },
        { hid: 'og:image', property: 'og:image', content: process.env.BASE_OGP }
        ]
      }
    },
    computed : {
      ...mapGetters({
        tag : 'currentTag'
      }),
      subtitle() {
        //タグ名を反映
        if(this.tag){
          return `# ${this.tag.name}`
        }
      }
    },
    methods: {
      ...mapActions(['closeMenu'])
    }
  }
</script>