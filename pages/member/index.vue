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
  import Meta from '~/mixins/meta'

  export default {
    mixins: [Meta],
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
      if(!store.getters.allPosts){
        await store.dispatch('fetchAllPost');
      }
      if(!store.getters.members){
        await store.dispatch('fetchMembers');
      }
    },
    data() {
      return {
        title    : 'MEMBERS',
        subtitle : 'メンバー紹介',
        meta: {
          title: 'MEMBERS',
          description: 'notes by SHARESLのメンバーページです。株式会社SHARESLで実際に実務に携わっているエンジニア・デザイナーなどの制作者たちの中で、記事を執筆しているメンバーの一覧です。',
          type: 'article',
          url: `${process.env.baseUrl}/member`
        }
      }
    },
    computed: {
      ...mapGetters(['members']),
    }
  }
</script>