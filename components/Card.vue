<template>
  <div class="c-card">
    <nuxt-link class="c-card__image" to="/articles/100">
      <img
      src="~assets/images/article-1.jpg"
      alt="">
    </nuxt-link>
    <div class="c-card__content">
      <h2 class="c-card__caption">
        <nuxt-link to="/articles/100">{{post.title}}</nuxt-link>
      </h2>
      <div class="c-card__tags">
        <nuxt-link v-for="tag in post.tags" to="/tag">{{tag}}</nuxt-link>
      </div>
      <!-- /.c-card__tags -->
      <div class="c-card__row">
        <div class="c-card__date u-futura-pt-condensed"><time>{{post.date}}</time></div>
        <nuxt-link  to="/author" class="c-card__author">
          <img src="~/assets/images/author.png">
          <p class="c-card__author__name u-futura-pt-condensed">{{post.author}}</p>
        </nuxt-link>
        <!-- /.c-card__author -->
      </div>
      <!-- /.c-card__row -->
    </div>
    <!-- /.c-card__content -->
  </div>
  <!-- /.c-card -->
</template>

<style lang="scss" scoped>
.c-card{
  position: relative;
  width: calc(33% - 6px);
  background: #fff;

  &__image{
    overflow: hidden;
    position: relative;
    border-radius:3px;
    backface-visibility: hidden;

    &::before{
      opacity: 0;
      visibility: hidden;
      content:"VIEW MORE";
      position: absolute;
      top:0;
      left:0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-family: $futura-pt-condensed;
      @include fz(30);
      font-weight: 600;
      letter-spacing: .3em;
      color:#fff;
      background: $gradient8;
      transition:.3s $ease-out-sine;
      transform: scale(1.2);
      backdrop-filter: blur(3px);
    }

    img{
      width: 100%;
      height:270px;
      object-fit: cover;
      font-family: 'object-fit: cover;';
      transition-duration: .3s;
    }

    &:hover{
      box-shadow: $boxshadow6;

      img{
        transform: scale(1.1);
      }

      &::before{
        opacity: 1;
        visibility: visible;
        transform: none;
        letter-spacing: .09em;
      }
    }
  }

  &__content{
    padding:15px;
  }

  &__caption{
    @include fz(21);
    font-weight: 600;
    line-height: 1.5;

    a{
      color:#000;

      &:hover{
        color:$link-color;
      }
    }
  }

  &__tags{
    display: flex;
    margin-top: 21px;

    a{
      padding:6px 12px;
      margin-right: 9px;
      font-weight: 600;
      border:1px solid currentColor;
      border-radius:30px;

      &:hover{
        color:#fff;
        border-color:$link-color;
        background: $link-color;
      }
    }
  }

  &__row{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  &__date{
    @include fz(15);
  }

  &__author{
    display: flex;
    align-items: center;
    flex-direction:row-reverse;
    color:#000;

    img{
      width: 36px;
      height:36px;
      border-radius:50%;
      object-fit: cover;
      font-family: 'object-fit: cover;';
      border:1px solid $link-color;
    }

    &__name{
      text-align: right;
      max-width:90px;
      margin-right: .5em;
      @include fz(12);
      font-weight: 600;
      line-height: 1.2;
    }

    &:hover{
      color:$link-color;
      img{
        box-shadow:0 0 0 3px $link-color;
      }
    }
  }
}
</style>

<script>
  export default {
    props: {
      post : {
        type     : Object,
        require  : false,
        'default': () => ({})
      }
    }
  }
</script>