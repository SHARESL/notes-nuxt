<template>
  <div class="c-list">
    <h1 class="c-caption u-futura-pt-condensed">NEW</h1>
    <div class="c-list__inner">
      <Card v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
    <Button :url="buttonUrl" :text="buttonText" />
  </div>
  <!-- /.p-list -->
</template>
<script>
  import Card from '~/components/Card.vue'
  import Button from '~/components/Button.vue'

  export default {
    components : {
      Card,
      Button
    },
    data(){
      return{
        buttonUrl  : '/articles/',
        buttonText : ' VIEW ALL',
        posts      : [
        {
          id           : 1,
          eyecatch     : '/assets/images/article-1.jpg',
          title        : '1interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 1',
          author_image : '~/assets/images/author.png',
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
        {
          id           : 2,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '2interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 2',
          author_image : '~/assets/images/author.png',
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
        {
          id           : 3,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '3interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 3',
          author_image : '~/assets/images/author.png',
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
        ]
      }
    }
  }
</script>