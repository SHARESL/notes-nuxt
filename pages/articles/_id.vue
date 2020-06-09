<template>
  <div class="p-post">
    <div class="p-post__inner">
      <h1 class="p-post__title">{{post.title.rendered}}</h1>
      <div class="p-post__row">
        <div class="p-post__date u-futura-pt-condensed">
          <time :datetime="post.date_gmt">{{post.date_formatted.released}}</time>
        </div>
        <!-- /.p-post__date -->
        <nuxt-link :to="{name : post.category[0].slug}" class="p-post__category u-futura-pt">{{post.category[0].name}}</nuxt-link>
        <nuxt-link :to="{ name : 'member-name', params: { name : post.author_data.slug}}" class="p-post__author">
          <img :src="post.author_data.avatar">
          <p class="p-post__author__name u-futura-pt-condensed">{{post.author_data.name}}</p>
        </nuxt-link>
        <!-- /.c-post__author -->
      </div>
      <!-- /.p-post__row -->
      <div class="p-post__visual">
        <img
        :src="post.featured_image.top_mv.src"
        :alt="post.title.rendered">
      </div>
      <!-- /.p-post__visual -->
      <div class="p-post__contents" v-html="post.content.rendered" ref="post_contents"></div>
      <!-- /.p-post__contents -->
      <aside class="c-share">
        <p class="c-share__caption u-futura-pt-condensed">SHARE</p>
        <div class="c-share__list">
          <a class="fb" href="./" target="_blank" rel="noopener">
            <span class="icon"><FacebookSvg/></span>
          </a>
          <a class="tw" href="./" target="_blank" rel="noopener">
            <span class="icon"><TwitterSvg/></span>
          </a>
          <a class="hatena hatena-bookmark-button" href="./" target="_blank" rel="noopener">
            <span class="icon"><HatenaSvg/></span>
          </a>
        </div>
        <!-- /.c-share__list -->
      </aside>
      <!-- /.c-share -->
      <Author :post="post" />
      <div class="c-pager">
        <div class="c-pager__item">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__prev" to="/articles">PREV</nuxt-link>
          </div>
          <!-- /.c-pager__link -->
          <Card :post="prev" />
        </div>
        <!-- /.c-pager__item -->
        <div class="c-pager__item">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__next" to="/articles">NEXT</nuxt-link>
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
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('scss', scss);

  import javascript from 'highlight.js/lib/languages/javascript';
  import xml from 'highlight.js/lib/languages/xml';
  import scss from 'highlight.js/lib/languages/scss';

  import FacebookSvg from '~/assets/svg/icon-facebook.svg'
  import TwitterSvg from '~/assets/svg/icon-twitter.svg'
  import HatenaSvg from '~/assets/svg/icon-hatebu.svg'
  import Card from '~/components/Card.vue'
  import Author from '~/components/Author.vue'

  export default {
    components: {
      FacebookSvg,
      TwitterSvg,
      HatenaSvg,
      Card,
      Author
    },
    async asyncData({ params, error, payload, $axios }) {
      if (payload)
      {
        return {
          post: payload
        }
      }
      if(!params.id){
        error({ statusCode: 404, message: 'Post not found' });
        return;
      }
      const res = await $axios.$get(`/wp/v2/posts/${params.id}`)
      .catch((err) => {
        console.error(err)
      });
      return {
        post: res
      };
    },
    data() {
      return {
        author       : {
          name  : 'INOUE',
          image : '~/assets/images/author.png',
          slug  : 'inoue'
        },
        prev          : null,
        next          : null
      }
    },
    head() {
      return {
        title: `${this.post.title.rendered}｜notes by SHARESL`
      }
    },
    mounted(){
      this.replaceTocLink();
      this.highlightCode();
    },
    methods : {
      highlightCode(){
        const codeblock = this.$refs.post_contents.querySelectorAll('pre code');
        [...codeblock].forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
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