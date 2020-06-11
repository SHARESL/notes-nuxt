<template>
  <div class="p-member">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-member__inner">
      <div class="p-member__item" v-for="member in members" :key="member.id">
        <Author :post="member" />
      </div>
      <!-- /.p-member__item -->
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import Author from '~/components/Author.vue'
  import { mapGetters } from 'vuex'

  export default {
    components : {
      Title,
      Author
    },
    async fetch({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveMembers', payload.members);
        return;
      }
      if(store.getters.allPosts){
        return;
      }
      await store.dispatch('fetchAllPost');
      await store.dispatch('fetchMembers');
    },
    data() {
      return {
        title    : 'MEMBERS',
        subtitle : 'メンバー紹介'
      }
    },
    head() {
      return {
        title: `${this.subtitle}`
      }
    },
    computed: {
      ...mapGetters(['members']),
    },
  }
</script>