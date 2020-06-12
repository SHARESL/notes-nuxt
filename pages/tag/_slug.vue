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
    async fetch({ store, route, payload }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload);
        return;
      }
      if(!store.getters.allPosts){
        await store.dispatch('fetchAllPost');
      }
    },
    data() {
      return {
        title    : 'ARTICLES',
        tag      : null
      }
    },
    head() {
      const allPosts = this.$store.getters.allPosts;
      if(!allPosts){
        return;
      }
      const tagPost = allPosts.find( (post) => {
        this.tag = post.tags.find((tag) => {
          return tag.slug === this.$route.params.slug;
        });
        return this.tag;
      });
      const description = `# ${this.tag.name}タグのブログ記事一覧です。notes by SHARESLは大阪のWeb制作会社・株式会社SHARESLの開発者ブログです。制作者が日々考えていることのアウトプットやメモとして残しておきたい備忘録としての記事を更新していきます。`;
      return {
        title: `# ${this.tag.name}タグの記事｜notes by SHARESL`,
        meta  : [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `# ${this.tag.name}タグの記事｜notes by SHARESL` },
        { hid: 'og:description', property: 'og:description', description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/tag/${this.$route.params.slug}` },
        { hid: 'og:image', property: 'og:image', content: '/img/ogp.png' }
        ]
      }
    },
    computed : {
      ...mapGetters(['allPosts']),
      subtitle() {
        //タグ名を反映
        if(this.tag){
          return `# ${this.tag.name}`
        }
      }
    }
  }
</script>