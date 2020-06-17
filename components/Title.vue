<template>
  <div class="c-title">
    <h1 class="c-title__inner">
      <span class="c-title__main u-futura-pt-condensed">{{title}}</span>
      <span class="c-title__sub">{{subtitle}}</span>
    </h1>
    <!-- /.c-title__inner -->
  </div>
  <!-- /.c-title -->
</template>

<script>
  export default {
    props :{
      title    : String,
      subtitle : String
    }
  }
</script>