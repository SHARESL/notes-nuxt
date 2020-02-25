<template>
  <div class="c-list">
    <Nav class="c-list__nav" v-if="hideNav" />
    <div class="c-list__inner">
      <Card class="c-list__item" v-for="post in posts" :key="post.id" :post="post" />
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
    props : {
      hideNav : {
        type      : Boolean,
        require   : false,
        'default' : true
      }
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
        {
          id           : 2,
          eyecatch     : 'assets/images/article-1.jpg',
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
        },
        {
          id           : 3,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '3interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : {
            name  : 'INOUE 3',
            image : '~/assets/images/author.png',
            slug  : 'inoue-3'
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
        {
          id           : 4,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '4interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : {
            name  : 'INOUE 4',
            image : '~/assets/images/author.png',
            slug  : 'inoue-4'
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
        {
          id           : 5,
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '5interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : {
            name  : 'INOUE 5',
            image : '~/assets/images/author.png',
            slug  : 'inoue-5'
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
        ]
      }
    }
  }
</script>