<template>
  <div class="c-card">
    <nuxt-link class="c-card__image" :to="{ name: 'articles-id', params: { id : post.id}}">
      <img
      src="~assets/images/article-1.jpg"
      alt="">
    </nuxt-link>
    <div class="c-card__content">
      <h2 class="c-card__caption">
        <nuxt-link :to="{ name: 'articles-id', params: { id : post.id}}">{{post.title}}</nuxt-link>
      </h2>
      <div class="c-card__tags">
        <nuxt-link v-for="tag in post.tags" :key="tag.id" :to="{ name: 'tag-slug', params: { slug : tag.slug}}">{{tag.name}}</nuxt-link>
      </div>
      <!-- /.c-card__tags -->
      <div class="c-card__row">
        <div class="c-card__date u-futura-pt-condensed"><time>{{post.date}}</time></div>
        <nuxt-link to="/author" class="c-card__author">
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