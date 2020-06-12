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
          <Card :post="prev" />
        </div>
        <!-- /.c-pager__item -->
        <div class="c-pager__item" v-if="post.next">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__next" :to="{ name: 'articles-id', params: { id : post.next}}">NEXT</nuxt-link>
          </div>
          <!-- /.c-pager__link -->
          <Card :post="next" />
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
  import { mapGetters } from 'vuex'
  import Meta from '~/mixins/meta'

  export default {
    components: {
      Card,
      ShareButton,
      Author
    },
    mixins: [Meta],
    async fetch({ params, error, payload, store, $axios }) {
      if (payload){
        await store.commit('saveAllPosts', payload);
        return
      }
      if(!params.id){
        await error({ statusCode: 404, message: 'Post not found' });
        return;
      }
      if(store.getters.allPosts){
        return;
      }
      await store.dispatch('fetchAllPost');
      return;
    },
    computed: {
      ...mapGetters(['allPosts']),
      //記事情報
      post(){
        const posts = Vue.util.extend([], this.allPosts);
        return posts.find( (post) => {
          return post.id === Number(this.$route.params.id)
        });
      },
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
      },
      //metaタグ
      meta(){
        return {
          title : this.post ? `${this.post.title}` : '',
          url   : this.post ? `${process.env.baseUrl}/articles/${this.post.id}` : ''
        }
      }
    },
    mounted(){
      this.replaceTocLink();
      this.highlightCode();
    },
    methods : {
      //シンタックスハイライト
      highlightCode(){
        const codeblock = this.$refs.post_contents.querySelectorAll('pre code');
        [...codeblock].forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
      //目次のリンクをハッシュ以下のみに置き換え
      replaceTocLink(){
        const toc = this.$refs.post_contents.querySelectorAll('#ez-toc-container a');
        [...toc].forEach((link) => {
          const hash = link.hash;
          link.setAttribute('href', hash);
        });
      }
    }
  }
</script>