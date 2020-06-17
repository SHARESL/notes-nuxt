<template>
  <div class="c-list">
    <h1 class="c-caption u-futura-pt-condensed">PICK UP</h1>
    <div class="c-list__inner">
      <Card class="c-list__item" v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <!-- /.c-list__inner -->
  </div>
  <!-- /.p-list -->
</template>

<script>
  import Vue from 'vue'
  import Card from '~/components/Card.vue'
  import { mapGetters } from 'vuex'

  export default {
    components : {
      Card
    },
    computed: {
      ...mapGetters(['allPosts']),
      posts() {
        const posts = Vue.util.extend([], this.allPosts);
        const pickup = posts.filter((post) => {
          return post.pickup === true
        });
        const threePickupPosts = pickup.slice(0,3);
        const threePickupPostsIDs = threePickupPosts.map((post) => {
          return post.id
        });
        this.$store.commit('savePickup', threePickupPostsIDs);
        return threePickupPosts;
      }
    }
  }
</script>