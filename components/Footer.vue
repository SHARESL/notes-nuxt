<template>
  <footer class="l-footer">
    <div class="l-footer__inner">
      <nav class="l-footer__nav">
        <nuxt-link to="/about/">当サイトについて</nuxt-link>
        <a href="https://sharesl.net/policy/" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
        <a href="https://sharesl.net/" target="_blank" rel="noopener noreferrer">運営会社</a>
      </nav>
      <!-- /.l-footer__nav -->
      <p class="l-footer__copyright">
        <small>© {{year}} SHARESL Inc.</small>
      </p>
    </div>
    <!-- /.l-footer__inner -->
  </footer>
  <!-- /.l-footer -->
</template>

<script>
  import Logo from '~/components/Logo.vue'

  export default {
    components: {
      Logo
    },
    data(){
      return{
        year : new Date().getFullYear()
      }
    }
  }
</script>