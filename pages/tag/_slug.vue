<template>
  <div class="p-category">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-category__inner">
      <CategoryList :caption="subtitle" :hideNav="true" />
    </div>
    <!-- /.p-category__inner -->
  </div>
  <!-- /.p-category -->
</template>

<script>
  import Vue from 'vue'
  import Title from '~/components/Title.vue'
  import CategoryList from '~/components/CategoryList.vue'
  import { mapGetters } from 'vuex'

  export default {
    components : {
      Title,
      CategoryList
    },
    data() {
      return {
        title    : 'ARTICLES',
        tag      : null
      }
    },
    head() {
      return {
        title: `${this.subtitle}タグの記事｜notes by SHARESL`
      }
    },
    async fetch({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload);
        return;
      }
      if(store.getters.allPosts){
        return;
      }
      await store.dispatch('fetchAllPost');
    },
    computed : {
      ...mapGetters(['allPosts']),
      post(){
        //タグがついた記事を検索
        const posts = Vue.util.extend([], this.allPosts);
        return posts.find( (post) => {
          //タグ情報を保存
          this.tag = post.tags.find((tag) => {
            return tag.slug === this.$route.params.slug;
          })
          return this.tag;
        })
      },
      subtitle() {
        //タグ名を反映
        if(this.post && this.tag){
          return `# ${this.tag.name}`
        }
      }
    }
  }
</script>