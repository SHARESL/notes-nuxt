<template>
  <div class="c-pickup">
    <h1 class="c-pickup__caption u-futura-pt-condensed">PICK UP</h1>
    <div class="c-pickup__list">
      <Card v-for="post in posts" :post="post" />
    </div>
    <!-- /.c-pickup__list -->
  </div>
  <!-- /.p-pickup -->
</template>

<style lang="scss" scoped>
.c-pickup{
  padding:30px;
  //background: $lgray2;

  &__caption{
    @include fz(36);

    &::after{
      content:"";
      display: inline-block;
      vertical-align: middle;
      width: 60px;
      height: 1px;
      margin-left: 15px;
      background: $link-color;
    }
  }

  &__list{
    display: flex;
    justify-content: space-between;
    margin-top: 9px;
  }
}
</style>

<script>
  import Card from '~/components/Card.vue'
  export default {
    components : {
      Card
    },
    data(){
      return{
        posts : [
        {
          eyecatch     : '/assets/images/article-1.jpg',
          title        : '1interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 1',
          author_image : '~/assets/images/author.png',
          tags         : ['imagesLoaded', 'JS']
        },
        {
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '2interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 2',
          author_image : '~/assets/images/author.png',
          tags         : ['imagesLoaded', 'JS']
        },
        {
          eyecatch     : 'assets/images/article-1.jpg',
          title        : '3interact.jsを使ってcanvas上で画像を位置移動させてみる',
          category     : 'TRY',
          date         : '2020.01.14',
          author       : 'INOUE 3',
          author_image : '~/assets/images/author.png',
          tags         : ['imagesLoaded', 'JS']
        }
        ]
      }
    }
  }
</script>