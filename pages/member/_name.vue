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
  import { mapGetters } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList,
      Author
    },
    async fetch({ params, error, payload, store, $axios }) {
      if (payload){
        await store.commit('saveCurrentMember', payload.currentMember);
        await store.commit('saveAllPosts', payload.allPosts);
        return
      }
      if(!params.name){
        await error({ statusCode: 404, message: 'Page not found' });
        return;
      }
      if(!store.getters.allPosts){
        await store.dispatch('fetchAllPost');
      }
      if(!store.getters.currentMember){
        await store.dispatch('fetchMembers', params.name);
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
    }
  }
</script>