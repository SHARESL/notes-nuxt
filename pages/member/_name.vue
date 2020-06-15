<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__author">
      <Author :post="member" />
    </div>
    <!-- /.p-category__author -->
    <div class="p-category__inner">
      <CategoryList :hideNav="true" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<style lang="scss" scoped>
.p-category{
  &__author{
    max-width:690px;
    margin:auto;
  }
}
</style>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import Author from '~/components/Author.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList,
      Author
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async fetch({ params, error, payload, store }) {
      if (payload){
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        await store.commit('saveCurrentMember', payload.currentMember);
        return
      }
      else{
        if(!params.name){
          await error({ statusCode: 404, message: 'Page not found' });
          return;
        }
        if(store.getters.members){
          await store.commit('saveCurrentMemberBySlug', params.name);
        }
        if(!store.getters.members && !store.getters.currentMember){
          await store.dispatch('fetchMembers', params.name);
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
        title    : 'ARTICLES'
      }
    },
    head() {
      const member = this.$store.getters.currentMember;
      if(!member){
        return;
      }
      return {
        title : `${member.author_name}の書いた記事｜notes by SHARESL`,
        meta  : [
        { hid: 'description', name: 'description', content: member.fields.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${member.author_name}の書いた記事｜notes by SHARESL` },
        { hid: 'og:description', property: 'og:description', content:member.fields.description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/member/${this.$route.params.name}` },
        { hid: 'og:image', property: 'og:image', content: member.fields.ogp_img },
        ]
      }
    },
    computed: {
      ...mapGetters({
        member:'currentMember'
      }),
      subtitle(){
        if(this.member){
          return `${this.member.author_name}の書いた記事`
        }
      }
    },
    methods: {
      ...mapActions(['closeMenu'])
    }
  }
</script>