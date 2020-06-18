<template>
  <div class="p-post" v-if="post">
    <div class="p-post__inner">
      <h1 class="p-post__title">{{post.title}}</h1>
      <div class="p-post__row">
        <div class="p-post__date u-futura-pt-condensed">
          <time :datetime="post.datetime">{{post.datetime_formatted}}</time>
        </div>
        <!-- /.p-post__date -->
        <nuxt-link :to="{name : post.category_slug}" class="p-post__category u-futura-pt">{{post.category}}</nuxt-link>
        <nuxt-link :to="{ name : 'member-name', params: { name : post.author_slug}}" class="p-post__author">
          <img
          :src="post.avatar_src"
          :alt="post.author_name"
          >
          <p class="p-post__author__name u-futura-pt-condensed">{{post.author_name}}</p>
        </nuxt-link>
        <!-- /.c-post__author -->
      </div>
      <!-- /.p-post__row -->
      <div class="p-post__visual">
        <img
        :src="post.image_src_full"
        :alt="post.title">
      </div>
      <!-- /.p-post__visual -->
      <div class="p-post__contents" v-html="post.content" ref="post_contents"></div>
      <!-- /.p-post__contents -->
      <ShareButton :title="post.title" />
      <Author :post="post" />
      <div class="c-pager" v-if="post.prev || post.next">
        <div class="c-pager__item" v-if="post.prev">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__prev" :to="{ name: 'articles-id', params: { id : post.prev}}">PREV</nuxt-link>
          </div>
          <!-- /.c-pager__link -->
          <Card :post="prev" class="prev" />
        </div>
        <!-- /.c-pager__item -->
        <div class="c-pager__item" v-if="post.next">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__next" :to="{ name: 'articles-id', params: { id : post.next}}">NEXT</nuxt-link>
          </div>
          <!-- /.c-pager__link -->
          <Card :post="next" class="next" />
        </div>
        <!-- /.c-pager__item  -->
      </div>
      <!-- /.c-pager -->
    </div>
    <!-- /.p-post__inner -->
  </div>
  <!-- /.p-post -->
</template>

<script>
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import xml from 'highlight.js/lib/languages/xml';
  import scss from 'highlight.js/lib/languages/scss';
  import css from 'highlight.js/lib/languages/css';
  import shell from 'highlight.js/lib/languages/shell';
  import bash from 'highlight.js/lib/languages/bash';

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('scss', scss);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('bash', bash);

  import Vue from 'vue'
  import Card from '~/components/Card.vue'
  import ShareButton from '~/components/ShareButton.vue'
  import Author from '~/components/Author.vue'
  import { mapGetters, mapActions } from 'vuex'
  import Meta from '~/mixins/meta'

  export default {
    components: {
      Card,
      ShareButton,
      Author
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    //mixins: [Meta],
    async fetch({ params, error, payload, store, $axios }) {
      if (payload){
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveCurrentPost', payload.currentPost);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        return;
      }
      else {
        if(!params.id){
          await error({ statusCode: 404, message: 'Post not found' });
          return;
        }
        if(store.getters.allPosts){
          await store.commit('saveCurrentPostById', params.id);
        }
        if(!store.getters.allPosts && !store.getters.currentPost){
          await store.dispatch('fetchAllPost', params.id);
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
    head() {
      const article = this.$store.getters.currentPost;
      if(!article){
        return
      }
      const description = article.description ? article.description : process.env.BASE_DESC;
      return {
        title : article.title,
        meta  : [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${article.title}｜notes by SHARESL` },
        { hid: 'og:description', property: 'og:description', content:description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/articles/${article.id}` },
        { hid: 'og:image', property: 'og:image', content: article.ogp_img },
        ]
      }
    },
    computed: {
      ...mapGetters({
        allPosts : 'allPosts',
        post     : 'currentPost'
      }),
      //次の記事
      prev(){
        const posts = Vue.util.extend([], this.allPosts);
        return posts.find( (post) => {
          return post.id === this.post.prev
        });
      },
      //前の記事
      next(){
        const posts = Vue.util.extend([], this.allPosts);
        return posts.find( (post) => {
          return post.id === this.post.next
        });
      }
    },
    mounted(){
      this.replaceTocLink();
      this.highlightCode();
    },
    methods : {
      ...mapActions(['closeMenu']),
      //シンタックスハイライト
      highlightCode(){
        if(!('post_contents' in this.$refs)){
          return
        }
        const codeblock = this.$refs.post_contents.querySelectorAll('pre code');
        if(!codeblock){
          return;
        }
        [...codeblock].forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
      //目次のリンクをハッシュ以下のみに置き換え
      replaceTocLink(){
        if(!('post_contents' in this.$refs)){
          return
        }
        const toc = this.$refs.post_contents.querySelectorAll('#ez-toc-container a');
        if(!toc){
          return;
        }
        [...toc].forEach((link) => {
          const hash = link.hash;
          link.setAttribute('href', hash);
        });
      }
    }
  }
</script>