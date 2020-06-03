<template>
  <div class="p-contact">
    <Title :title="title" :subtitle="subtitle"/>
    <div class="p-contact__inner">
      <client-only>
        <validation-observer ref="observer" v-slot="{ invalid, validated }" tag="form" class="p-contact__form" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="onSubmit" :class="sendingClass">
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
              <label for="useremail">メールアドレス</label>
            </div>
            <!-- /.p-contact__label -->
            <div class="p-contact__content">
              <validation-provider v-slot="{ errors }" rules="required|email|max:256" name="メールアドレス">
                <input type="text" id="useremail" name="useremail" v-model="useremail" autocomplete="email" required>
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
                <textarea id="message" name="message" v-model="message" required></textarea>
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
              <input type="text" name="bot-field" v-model="botField"/>
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
      </client-only>
    </div>
    <!-- /.p-contact__inner -->
  </div>
  <!-- /.p-contact -->
</template>

<script>
  import Title from '~/components/Title.vue'

  export default {
    components : {
      Title
    },
    data() {
      return {
        title           : 'CONTACT',
        subtitle        : 'お問い合わせ',
        username        : '',
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
    computed: {
      sendingClass(){
        return {
          'is-sending' : this.isSending,
          'is-error'   : this.isError
        };
      }
    },
    methods: {
      onSubmit() {
        if(this.isSending){
          return;
        }
        this.isSending = true;
        const params = new URLSearchParams();
        params.append('form-name', 'contact');
        params.append('username', this.username);
        params.append('useremail', this.useremail);
        params.append('message', this.message);
        if(this.botField){
          params.append('bot-field', this.botField);
        }
        this.axios
        .post('/', params)
        .then(() => {
          this.completeMessage = 'フォームを送信しました！';
          this.resetForm();
          this.isSubmit  = true;
        })
        .catch(err => {
          this.completeMessage = 'フォームの送信が失敗しました';
          this.isError   = true;
        })
        .finally(() => {
          this.toastTimer();
          this.isSending = false;
        });
      },

      resetForm() {
        this.username        = '';
        this.useremail       = '';
        this.message         = '';
        this.isError         = false;
        this.$refs.observer.reset();
      }
    }
  }
</script>