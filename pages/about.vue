<template>
  <div class="p-about">
    <Title :title="title" :subtitle="subtitle"/>
    <section class="p-about__block">
      <h2 class="c-caption c-caption--ja">このブログについて</h2>
      <p class="p-about__summary c-summary">notes by sharesl（以下「当ブログ」）は、株式会社SHARESLが運営している開発者ブログです。<br>開発者が日々考えていることのアウトプットやメモとして残しておきたい備忘録としての記事を更新していきます。<br>最新技術やトレンドの記事というよりは、WEBサイト制作の実務の中で気づいたことをまとめて後で見返せるノートのような役割を目的としています。</p>
    </section>
    <!-- /.p-about__block -->
    <section class="p-about__block">
      <h2 class="c-caption c-caption--ja">運営会社</h2>
      <table class="p-about__table">
        <tbody>
          <tr>
            <th>会社名</th>
            <td>株式会社SHARESL（シェアスル）</td>
          </tr>
          <tr>
            <th>設立</th>
            <td>2015年5月1日</td>
          </tr>
          <tr>
            <th>代表取締役</th>
            <td>兼石 裕司</td>
          </tr>
          <tr>
            <th>事業内容</th>
            <td>
              インターネットサービス<br>
              プリント・撮影関連事業<br>
              イベント運営
            </td>
          </tr>
          <tr>
            <th>設立</th>
            <td>2015年5月1日</td>
          </tr>
          <tr>
            <th>所在地</th>
            <td>大阪市中央区心斎橋筋1-3-12</td>
          </tr>
          <tr>
            <th>連絡先</th>
            <td>hello@sharesl.net</td>
          </tr>
        </tbody>
      </table>
      <!-- /.p-about__table -->
    </section>
    <!-- /.p-about__block -->
    <section class="p-about__block">
      <h2 class="c-caption c-caption--ja">免責事項</h2>
      <p class="p-about__summary c-summary">当ブログは正当で確実な情報をまとめたものではありませんので、掲載された情報で生じた問題については一切の責任を追いません。<br>また、コメントやお問い合わせ等で個人的なカスタマイズのご質問は基本的にはご対応いたしません。カスタマイズを含めてお仕事としてご依頼される場合はお問い合わせから株式会社SHARESLを通してご連絡ください。<br>また、本免責事項等及び、当ブログに掲載されている情報は予告なしに変更、または削除されることがあります。ご了承ください。</p>
    </section>
    <!-- /.p-about__block -->
    <section class="p-about__block">
      <h2 class="c-caption c-caption--ja">当サイトのアクセス解析ツールに関して</h2>
      <p class="p-about__summary c-summary">当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。<br>このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。<br>このトラフィックデータは匿名で収集されており、個人を特定するものではありません。<br><br>この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。 この規約に関して、詳しくは「<a href="https://www.google.com/analytics/terms/jp.html" target="_blank" rel="noreferrer noopener">Google アナリティクス利用規約</a>」をご覧ください。</p>
    </section>
    <!-- /.p-about__block -->
  </div>
  <!-- /.p-about -->
</template>

<script>
  import Title from '~/components/Title.vue'
  import { mapActions } from 'vuex'

  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.closeMenu();
      })
    },
    async asyncData({ store, payload, route }){
      if (payload)
      {
        await store.commit('saveAllPosts', payload.allPosts);
        await store.commit('saveAllCategories', payload.categories);
        await store.commit('saveAllTags', payload.allTags);
        await store.commit('saveMembers', payload.members);
        await store.commit('saveAllPages', payload.pages);
        await store.commit('saveCurrentPageBySlug', route.name);
        return;
      }
      else{
        if(store.getters.allPages){
          await store.commit('saveCurrentPageBySlug', route.name);
        }
        if(!store.getters.allPages && !store.getters.currentPage){
          await store.dispatch('fetchPages', route.name);
        }
        if(!store.getters.allPosts){
          await store.dispatch('fetchAllPost');
        }
        if(!store.getters.allCategories){
          await store.dispatch('fetchCategories');
        }
        if(!store.getters.members){
          await store.dispatch('fetchMembers');
        }
        if(!store.getters.allTags){
          await store.dispatch('fetchTags');
        }
      }
    },
    data() {
      return {
        title    : 'ABOUT',
        subtitle : '当サイトについて'
      }
    },
    head() {
      const page = this.$store.getters.currentPage;
      if(!page){
        return;
      }
      return {
        titleTemplate: null,
        title : page.title,
        meta  : [
        { hid: 'description', name: 'description', content: page.description },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: page.title },
        { hid: 'og:description', property: 'og:description', content:page.description },
        { hid: 'og:url', property: 'og:url', content: `${process.env.baseUrl}/${this.$route.name}` },
        { hid: 'og:image', property: 'og:image', content: page.ogp_img },
        ]
      }
    },
    components : {
      Title
    },
    methods : {
      ...mapActions(['closeMenu'])
    }
  }
</script>