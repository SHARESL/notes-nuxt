<template>
  <div class="c-btn">
    <nuxt-link :to="url">{{text}}</nuxt-link>
  </div>
  <!-- /.c-btn -->
</template>

<style lang="scss" scoped>
.c-btn{
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width:150px;
    padding:24px 36px;
    @include fz(15);
    font-weight: 600;
    letter-spacing: .09em;
    color:#fff;
    background: $link-color;
    border:2px solid $link-color;
    border-radius: 60px;
    will-change: box-shadow, transform;
    backface-visibility: hidden;

    &:hover{
      color:$blue3;
      background: #fff;
      border-color:$blue3;
      transform: translateY(-2px);
      box-shadow: $boxshadow6;
    }
  }
}
</style>

<script>
  export default {
    props: {
      url : String,
      text : String
    }
  }
</script>