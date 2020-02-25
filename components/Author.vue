<template>
  <aside class="c-author">
    <div class="c-author__avatar">
      <nuxt-link :to="{ name : 'member-name', params: { name : author.slug}}">
        <img src="~/assets/images/author.png">
      </nuxt-link>
    </div>
    <!-- /.c-author__avatar -->
    <div class="c-author__detail">
      <nuxt-link :to="{ name : 'member-name', params: { name : author.slug}}" class="c-author__name u-futura-pt-condensed">{{author.name}}</nuxt-link>
      <p class="c-author__job">Front-End Engineer</p>
      <p class="c-author__text">元魚屋の文系フロントエンドエンジニア。<br>得意なのはCSSとWordPress。</p>
    </div>
    <!-- /.c-author__detail -->
  </aside>
  <!-- /.c-author -->
</template>

<script>
  export default {
    props: {
      author : {
        type     : Object,
        require  : false,
        'default': () => ({})
      }
    }
  }
</script>