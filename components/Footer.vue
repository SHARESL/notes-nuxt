<template>
  <footer class="l-footer">
    <div class="l-footer__inner">
      <nav class="l-footer__nav">
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

<style lang="scss" scoped>
.l-footer{
  padding:30px;
}

.l-footer__inner{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.l-footer__logo{
}

.l-footer__nav{
  display: flex;
  align-items: center;

  a{
    color:$dgray;

    + a{
      margin-left:30px;
    }

    &:hover{
      color:$purple;
    }
  }
}

.l-footer__copyright{
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
  color:$dgray;
}
</style>

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