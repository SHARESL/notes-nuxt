<template>
  <aside class="c-author" v-if="post">
    <div class="c-author__avatar">
      <nuxt-link :to="{ name : 'member-name', params: { name : post.author_slug}}">
        <img
        :src="post.avatar_src"
        :alt="post.author_name"
        >
      </nuxt-link>
    </div>
    <!-- /.c-author__avatar -->
    <div class="c-author__detail">
      <nuxt-link :to="{ name : 'member-name', params: { name : post.author_slug}}" class="c-author__name u-futura-pt-condensed">{{post.author_name}}</nuxt-link>
      <p class="c-author__job">{{post.author_job}}</p>
      <div class="c-author__text" v-html="post.author_description"></div>
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