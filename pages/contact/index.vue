<template>
  <div class="p-contact">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-contact__inner">
      <validation-observer ref="observer" v-slot="{ invalid, validated }" tag="form" class="p-contact__form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="onSubmit" :class="sendingClass" novalidate>
        <input type="hidden" name="form-name" value="contact">
        <div class="p-contact__item">
          <div class="p-contact__label">
            <label for="username">お名前</label>
          </div>
          <!-- /.p-contact__label -->

          <div class="p-contact__content">
            <validation-provider v-slot="{ errors }" rules="required|max:100" name="お名前">
              <input type="text" id="username" name="username" v-model="username" autocomplete="name">
              <transition name="error">
                <p v-show="errors.length" class="p-contact__error">{{ errors[0] }}</p>
              </transition>
            </validation-provider>
          </div>
          <!-- /.p-contact__content -->
        </div>
        <!-- /.p-contact__item -->
        <div class="p-contact__item">
          <div class="p-contact__label">
            <label for="katakana">フリガナ</label>
          </div>
          <!-- /.p-contact__label -->

          <div class="p-contact__content">
            <validation-provider v-slot="{ errors }" rules="required|katakana" name="フリガナ">
              <input type="text" id="katakana" name="katakana" v-model="katakana">
              <transition name="error">
                <p v-show="errors.length" class="p-contact__error">{{ errors[0] }}</p>
              </transition>
            </validation-provider>
          </div>
          <!-- /.p-contact__content -->
        </div>
        <!-- /.p-contact__item -->
        <div class="p-contact__item">
          <div class="p-contact__label">
            <label for="useremail">メールアドレス</label>
          </div>
          <!-- /.p-contact__label -->
          <div class="p-contact__content">
            <validation-provider v-slot="{ errors }" rules="required|email|max:256" name="メールアドレス">
              <input type="text" id="useremail" name="useremail" v-model="useremail" autocomplete="email">
              <transition name="error">
                <p v-show="errors.length" class="p-contact__error">{{ errors[0] }}</p>
              </transition>
            </validation-provider>
          </div>
          <!-- /.p-contact__content -->
        </div>
        <!-- /.p-contact__item -->
        <div class="p-contact__item">
          <div class="p-contact__label">
            <label for="message">ご質問・ご要望など</label>
          </div>
          <!-- /.p-contact__label -->
          <div class="p-contact__content">
            <validation-provider v-slot="{ errors }" rules="required|max:1000" name="ご質問・ご要望など">
              <textarea id="message" name="message" v-model="message"></textarea>
              <transition name="error">
                <p v-show="errors.length" class="p-contact__error">{{ errors[0] }}</p>
              </transition>
            </validation-provider>
          </div>
          <!-- /.p-contact__content -->
        </div>
        <!-- /.p-contact__item -->
        <div class="p-contact__item" v-show="false">
          <div class="p-contact__label">
            <label for="message">スパムでない場合は空欄</label>
          </div>
          <!-- /.p-contact__label -->
          <div class="p-contact__content">
            <input type="text" name="bot-field" v-model="botField">
          </div>
          <!-- /.p-contact__content -->
        </div>
        <!-- /.p-contact__item -->
        <div class="p-contact__submit c-btn">
          <button class="p-contact__btn" type="submit" :disabled="invalid || !validated">送信</button>
        </div>
        <!-- /.p-contact__submit -->
      </validation-observer>
      <!-- /.p-contact__form -->
    </div>
    <!-- /.p-contact__inner -->
    <transition name="toast">
      <div class="p-contact__toast" v-if="isSubmit || isSending" @click="hideToast" :class="sendingClass">{{completeMessage}}</div>
    </transition>
  </div>
  <!-- /.p-contact -->
</template>

<script>
  import Title from '~/components/Title.vue'
  import { mapActions } from 'vuex'

  export default {
    components : {
      Title
    },
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
        title           : 'CONTACT',
        subtitle        : 'お問い合わせ',
        username        : '',
        katakana        : '',
        useremail       : '',
        message         : '',
        botField        : '',
        isSubmit        : false,
        isSending       : false,
        isError         : false,
        completeMessage : '',
        timer           : null
      }
    },
    head() {
      const page = this.$store.getters.currentPage;
      if(!page){
        return;
      }
      return {
        titleTemplate : null,
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
    computed: {
      sendingClass(){
        return {
          'is-sending'  : this.isSending,
          'is-error'    : this.isError,
          'is-complete' : this.isSubmit
        };
      }
    },
    methods: {
      ...mapActions(['closeMenu']),
      onSubmit() {
        if(this.isSending){
          return;
        }
        this.isSending = true;
        this.completeMessage = '送信処理中…';
        const params = new URLSearchParams();
        params.append('form-name', 'contact');
        params.append('username', this.username);
        params.append('katakana', this.katakana);
        params.append('useremail', this.useremail);
        params.append('message', this.message);
        if(this.botField){
          params.append('bot-field', this.botField);
        }
        this.$axios
        .$post('/', params)
        .then(() => {
          this.completeMessage = 'お問い合わせを送信しました！';
          this.resetForm();
          this.isSubmit  = true;
        })
        .catch(err => {
          this.completeMessage = 'お問い合わせの送信が失敗しました';
          this.isError   = true;
        })
        .finally(() => {
          this.toastTimer();
          this.isSending = false;
        });
      },

      resetForm() {
        this.username        = '';
        this.katakana        = '';
        this.useremail       = '';
        this.message         = '';
        this.isError         = false;
        this.$refs.observer.reset();
      },

      hideToast(){
        this.isSubmit = false;
      },

      toastTimer() {
        if(!this.isSubmit){
          return;
        }
        this.timer = setTimeout(() => {
          this.hideToast();
          clearTimeout(this.timer);
        }, 8000);
      }
    }
  }
</script>
