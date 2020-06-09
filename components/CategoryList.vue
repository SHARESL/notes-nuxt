<template>
  <div class="c-list">
    <Nav class="c-list__nav" v-if="hideNav" />
    <div class="c-list__inner">
      <Card class="c-list__item" v-if="posts" v-for="post in posts[categorySlug]" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
  </div>
  <!-- /.p-list -->
</template>

<script>
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
        default   : true
      }
    },
    data(){
      return{
        buttonUrl  : '/articles/',
        buttonText : ' VIEW ALL'
      }
    },
    computed: {
      ...mapGetters({
        posts : 'categoryPosts'
      }),
      categorySlug() {
        return this.$route.name === 'articles' ? 'all' : this.$route.name;
      }
    }
  }
</script>