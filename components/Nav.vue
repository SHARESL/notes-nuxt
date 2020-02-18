<template>
  <div class="c-nav">
    <nuxt-link to="/articles">ALL</nuxt-link>
    <nuxt-link to="/articles/tips/">TIPS</nuxt-link>
    <nuxt-link to="/articles/try/">TRY</nuxt-link>
    <nuxt-link to="/articles/column/">COLUMN</nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.c-nav{
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a{
    padding:12px 18px;
    @include fz(12);
    font-weight: 600;
    color:#fff;
    background: $purple;
    border-radius: 60px;
    box-shadow: $boxshadow5;

    & + a{
      margin-left:24px;
    }

    &:hover{
      transform: translateY(-2px);
      box-shadow: $boxshadow6;
    }
  }
}
</style>

<script>
  export default {

  }
</script>