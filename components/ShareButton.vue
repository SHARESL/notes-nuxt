<template>
  <aside class="c-share">
    <p class="c-share__caption u-futura-pt-condensed">SHARE</p>
    <div class="c-share__list">
      <a class="fb" :href="facebookShareUrl" target="_blank" rel="noopener">
        <span class="icon"><FacebookSvg/></span>
      </a>
      <a class="tw" :href="twitterShareUrl" target="_blank" rel="noopener">
        <span class="icon"><TwitterSvg/></span>
      </a>
      <a class="hatena hatena-bookmark-button" :href="hatenaShareUrl" target="_blank" rel="noopener">
        <span class="icon"><HatenaSvg/></span>
      </a>
    </div>
    <!-- /.c-share__list -->
  </aside>
  <!-- /.c-share -->
</template>

<script>
  import FacebookSvg from '~/assets/svg/icon-facebook.svg'
  import TwitterSvg from '~/assets/svg/icon-twitter.svg'
  import HatenaSvg from '~/assets/svg/icon-hatebu.svg'

  export default {
    components: {
      FacebookSvg,
      TwitterSvg,
      HatenaSvg
    },
    props: {
      title : {
        type     : String,
        default  : 'notes by SHARESL'
      }
    },
    data() {
      return{
        url : null
      }
    },
    mounted(){
      this.url = encodeURIComponent(window.location.href);
    },
    computed : {
      facebookShareUrl(){
        if(!this.url){
          return
        }
        return `https://www.facebook.com/share.php?u=${this.url}`;
      },
      twitterShareUrl(){
        if(!this.url){
          return
        }
        return `https://twitter.com/share?url=${this.url}`;
      },
      hatenaShareUrl(){
        if(!this.url){
          return
        }
        return `http://b.hatena.ne.jp/add?mode=confirm&url=${this.url}&title=${encodeURIComponent(this.title)}`;
        //return `https://b.hatena.ne.jp/entry/panel/?url=${encodeURIComponent(this.url)}&btitle=${encodeURIComponent(this.title)}`;
      }
    }
  }
</script>