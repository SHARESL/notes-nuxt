<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__author">
      <Author :post="post" />
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
        await store.commit('saveAllPosts', payload);
        return
      }
      if(!params.name){
        await error({ statusCode: 404, message: 'Page not found' });
        return;
      }
      if(store.getters.allPosts){
        return;
      }
      await store.dispatch('fetchAllPost');
      return;
    },
    data() {
      return {
        title    : 'ARTICLES'
      }
    },
    computed: {
      ...mapGetters(['allPosts']),
      subtitle(){
        if(this.post){
          return `${this.post.author_name}の書いた記事`
        }
      },
      post(){
        const posts = Vue.util.extend([], this.allPosts);
        const post = posts.find( (post) => {
          return post.author_slug === this.$route.params.name
        });
        return post;
      }
    },
    head() {
      return {
        title: `${this.subtitle}｜notes by SHARESL`
      }
    },
  }
</script>