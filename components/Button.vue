<template>
  <div class="c-btn">
    <nuxt-link :to="url">{{text}}</nuxt-link>
  </div>
  <!-- /.c-btn -->
</template>

<script>
  export default {
    props: {
      url : String,
      text : String
    }
  }
</script>