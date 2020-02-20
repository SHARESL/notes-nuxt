<template>
  <div class="c-list">
    <Nav class="c-list__nav" />
    <div class="c-list__inner">
      <Card v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
  </div>
  <!-- /.p-list -->
</template>

<script>
  import Card from '~/components/Card.vue'
  import Nav  from '~/components/Nav.vue'

  export default {
    components : {
      Card,
      Nav
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
        },
        {
          id           : 4,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '4interact.jsを使ってcanvas上で画像を位置移動させてみる',
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
        },
        {
          id           : 5,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '5interact.jsを使ってcanvas上で画像を位置移動させてみる',
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