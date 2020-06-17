<template>
  <div class="c-list">
    <Nav class="c-list__nav" v-if="!hideNav" />
    <div class="c-list__inner" :class="{empty : !posts.length}">
      <Card class="c-list__item" v-for="post in posts" :key="post.id" :post="post" />
      <p v-if="!posts.length" class="c-list__empty">記事が見つかりませんでした</p>
    </div>
    <!-- /.c-list__inner -->
  </div>
  <!-- /.p-list -->
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import Card from '~/components/Card.vue'
  import Nav  from '~/components/Nav.vue'

  export default {
    components : {
      Card,
      Nav
    },
    props : {
      hideNav : {
        type      : Boolean,
        require   : false,
        default   : false
      }
    },
    data(){
      return{
        routeName  : this.$route.name === 'articles' ? 'all' : this.$route.name,
        buttonUrl  : '/articles/',
        buttonText : ' VIEW ALL'
      }
    },
    computed: {
      ...mapGetters(['allPosts', 'searchText']),
      posts(){
        const posts = Vue.util.extend([], this.allPosts);
        //メンバー検索
        if(this.routeName === 'member-name' ){
          return posts.filter( (post) => {
            return post.author_slug === this.$route.params.name
          })
        }
        //タグ検索
        else if(this.routeName === 'tag-slug' ){
          return posts.filter( (post) => {
            const matchTag = post.tags.find((tag) => {
              return tag.slug === this.$route.params.slug;
            })
            return matchTag;
          })
        }
        //検索結果
        else if(this.routeName === 'search' ){
          if(!this.searchText){
            return posts;
          }
          else{
            //正規表現でタイトル・コンテンツ・カテゴリー・タグの文字列の一致を検索
            const searchTexts = this.searchText.split(' ');
            let searchReg = '^';
            searchTexts.forEach((str) => {
              searchReg += `(?=.*${str})`;
            });
            const reg = new RegExp(searchReg, 'i');
            return posts.filter( (post) => {
              const tagmatch = post.tags.find((tag) => {
                return tag.name.match(reg)
              });
              if(tagmatch){
                return tagmatch;
              }
              return post.title.match(reg) || post.content.match(reg) || post.category.match(reg);
            })
          }
        }
        //カテゴリー検索
        else if(this.routeName !== 'all'){
          return posts.filter( (post) => {
            return post.category_slug === this.$route.name
          })
        }
        else{
          return posts;
        }
      }
    }
  }
</script>