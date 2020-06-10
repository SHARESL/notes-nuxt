<template>
  <div class="p-404">
    <div class="p-404__inner">
      <Title :title="title" :subtitle="subtitle"/>
      <div class="p-404__summary c-summary">
        <p>アクセスしようとしたページは削除されたか、<br>URLが変更されたため、<br>現在利用できません。</p>
        <div class="p-404__btn c-btn">
          <nuxt-link to="/">トップページ</nuxt-link>
        </div>
        <!-- /.c-btn -->
      </div>
      <!-- /.p-404__summary -->
    </div>
    <!-- /.p-404__inner -->
  </div>
  <!-- /.p-404 -->
</template>

<script>
  import Title from '~/components/Title.vue'
  export default {
    components : {
      Title
    },
    data() {
      return {
        title    : '404',
        subtitle : 'PAGE NOT FOUND'
      }
    },
    head() {
      return {
        title: `ページが見つかりませんでした｜notes by SHARESL`
      }
    },
    props: {
      error: {
        type: Object,
        default: null
      }
    },
  }
</script>