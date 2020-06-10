<template>
  <div class="c-list">
    <Nav class="c-list__nav" v-if="!hideNav" />
    <div class="c-list__inner">
      <Card class="c-list__item" v-if="posts" v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
  </div>
  <!-- /.p-list -->
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
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
        default   : false
      }
    },
    data(){
      return{
        routeName  : this.$route.name === 'articles' ? 'all' : this.$route.name,
        buttonUrl  : '/articles/',
        buttonText : ' VIEW ALL'
      }
    },
    computed: {
      ...mapGetters(['allPosts']),
      posts(){
        const posts = Vue.util.extend([], this.allPosts);
        if(this.routeName === 'member-name' ){
          return posts.filter( (post) => {
            return post.author_slug === this.$route.params.name
          })
        }
        else if(this.routeName !== 'all'){
          return posts.filter( (post) => {
            return post.category_slug === this.$route.name
          })
        }
        else{
          return posts;
        }
      }
    }
  }
</script>