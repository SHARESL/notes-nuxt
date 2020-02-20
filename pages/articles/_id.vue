<template>
  <div class="p-post">
    <BlogPostVisual :title="title" :slug="slug"/>
    <div class="p-post__inner">
      <div class="p-post__date u-futura-pt-condensed">
        <time>2020.02.20</time>
      </div>
      <!-- /.p-post__date -->
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
    </div>
    <!-- /.p-post__inner -->
  </div>
  <!-- /.p-post -->
</template>

<style lang="scss" scoped>
.p-post{
  &__inner{
    max-width:690px;
    margin:auto;
    padding:30px 0 120px;
  }

  &__date{
    @include fz(15);
  }

  &__visual{
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;

    img{
      border-radius:3px;
    }
  }

  &__contents{
    margin-top: 30px;
    h2,
    h3,
    h4,
    h5,
    h6
    {
      margin-top: 60px;
      margin-bottom: 30px;
      font-weight: 600;
      line-height: 1.6;
    }

    h2{
      @include fz(30);
      border-bottom:1px solid $lgray;
    }

    h3{
      @include fz(27);
    }

    h4{
      @include fz(24);
    }

    h5{
      @include fz(21);
    }

    h6{
      @include fz(18);
    }

    p{
      margin-top: 30px;
      margin-bottom: 30px;
      @include fz(18);
      line-height: 1.9;
    }

    a{
      display:inline;
      &[target="_blank"]{
        display: flex;
        align-items: center;

        &::after{
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          margin-left: 3px;
          background: url('~assets/svg/outlink.svg?inline') no-repeat center center;
          background-size: contain;
        }
      }
    }
  }
}
</style>

<script>
  import BlogPostVisual from '~/components/BlogPostVisual.vue'

  export default {
    data() {
      return {
        title : 'Rellax.jsを使って簡単パララックス',
        slug  : 'top'
      }
    },
    components : {
      BlogPostVisual
    }
  }
</script>