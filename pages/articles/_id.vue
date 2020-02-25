<template>
  <div class="p-post">
    <div class="p-post__inner">
      <h1 class="p-post__title">{{title}}</h1>
      <div class="p-post__row">
        <div class="p-post__date u-futura-pt-condensed">
          <time>{{date}}</time>
        </div>
        <!-- /.p-post__date -->
        <nuxt-link :to="{name : category_slug}" class="p-post__category u-futura-pt">{{category}}</nuxt-link>
        <nuxt-link :to="{ name : 'member-name', params: { name : author.slug}}" class="p-post__author">
          <img src="~/assets/images/author.png">
          <p class="p-post__author__name u-futura-pt-condensed">{{author.name}}</p>
        </nuxt-link>
        <!-- /.c-post__author -->
      </div>
      <!-- /.p-post__row -->
      <div class="p-post__visual">
        <img src="~/assets/images/article-1@2x.jpg">
      </div>
      <!-- /.p-post__visual -->
      <div class="p-post__contents">
        <h2>これはh2見出しですこれはh2見出しですこれはh2見出しですこれはh2見出しですこれはh2見出しですこれはh2見出しです。</h2>
        <p>今回は簡単にパララックスを実装できる「Rellax.js」の使い方をメモ。<br>
          <a href="https://dixonandmoe.com/rellax/" target="_blank" rel="noopener">公式サイトはこちら</a>
        </p>
        <h3>これはh3見出しですこれはh3見出しですこれはh3見出しですこれはh3見出しですこれはh3見出しです</h3>
        <p>テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプルテスト。サンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル</p>
        <h4>これはh4見出しです</h4>
        <p>テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプルテストサンプルテストサンプル</p>
        <h5>これはh5見出しです</h5>
        <p>テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル</p>
        <h6>これはh6見出しです</h6>
        <p>テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル。テストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプルテストサンプル</p>
      </div>
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
      <Author :author="author" />
      <div class="c-pager">
        <div class="c-pager__item">
          <div class="c-pager__link">
            <nuxt-link class="c-pager__prev" to="/articles">PREV</nuxt-link>
          </div>
          <!-- /.c-pager__link -->
          <Card :post="prev" />
        </div>
        <!-- /.c-pager__item  -->
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
    data() {
      return {
        title         : 'Rellax.jsを使って簡単パララックス',
        slug          : 'top',
        date          : '2020.02.20',
        author       : {
          name  : 'INOUE',
          image : '~/assets/images/author.png',
          slug  : 'inoue'
        },
        category      : 'TIPS',
        category_slug : 'tips',
        prev          : {
          id           : 1,
          eyecatch     : '/assets/images/article-1.jpg',
          title        : '1interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : {
            name  : 'INOUE 1',
            image : '~/assets/images/author.png',
            slug  : 'inoue-1'
          },
          tags         : [
          {
            id   : 1,
            name : 'imagesLoaded',
            slug : 'imagesloaded'
          },
          {
            id   : 2,
            name : 'JS',
            slug : 'js'
          }
          ]
        },
        next          :{
          id           : 2,
          eyecatch     : '/assets/images/article-1.jpg',
          title        : '2interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : {
            name  : 'INOUE 2',
            image : '~/assets/images/author.png',
            slug  : 'inoue-2'
          },
          tags         : [
          {
            id   : 1,
            name : 'imagesLoaded',
            slug : 'imagesloaded'
          },
          {
            id   : 2,
            name : 'JS',
            slug : 'js'
          }
          ]
        }
      }
    }
  }
</script>