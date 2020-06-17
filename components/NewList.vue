<template>
  <div class="c-list">
    <h1 class="c-caption u-futura-pt-condensed">NEW</h1>
    <div class="c-list__inner">
      <Card class="c-list__item" v-if="posts" v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
    <Button class="c-list__btn" :url="buttonUrl" :text="buttonText" />
  </div>
  <!-- /.p-list -->
</template>
<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
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
        buttonText : ' VIEW ALL'
      }
    },
    computed: {
      ...mapGetters(['allPosts', 'pickup']),
      posts() {
        const posts = Vue.util.extend([], this.allPosts);
        const excludePickupPosts = posts.filter((post) => {
          return this.pickup.indexOf(post.id) == -1;
        });
        return excludePickupPosts.slice(0,6);
      }
    }
  }
</script>