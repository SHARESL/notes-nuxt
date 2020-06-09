<template>
  <aside class="c-author" v-if="post">
    <div class="c-author__avatar">
      <nuxt-link :to="{ name : 'member-name', params: { name : post.author_data.slug}}">
        <img
        :src="post.author_data.avatar"
        :alt="post.author_data.name"
        >
      </nuxt-link>
    </div>
    <!-- /.c-author__avatar -->
    <div class="c-author__detail">
      <nuxt-link :to="{ name : 'member-name', params: { name : post.author_data.slug}}" class="c-author__name u-futura-pt-condensed">{{post.author_data.name}}</nuxt-link>
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
      post : {
        type     : Object,
        require  : true
      }
    }
  }
</script>