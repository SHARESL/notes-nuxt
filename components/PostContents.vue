<template>
  <div class="p-post__contents" v-html="content"></div>
</template>

<script>
  import hljs from 'highlight.js/lib/core';
  import javascript from 'highlight.js/lib/languages/javascript';
  import xml from 'highlight.js/lib/languages/xml';
  import scss from 'highlight.js/lib/languages/scss';
  import css from 'highlight.js/lib/languages/css';
  import shell from 'highlight.js/lib/languages/shell';
  import bash from 'highlight.js/lib/languages/bash';

  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('scss', scss);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('bash', bash);

  export default {
    props: {
      content: String
    },
    methods: {
      runScript () {
        const scripts = this.$el.querySelectorAll('script')
        scripts.forEach(script => {
          const parentNode = script.parentNode
          let alternativeNode
          if (script.src.indexOf('https://gist.github.com/') !== -1) {
            const customStyle = `<link rel="stylesheet" href="${process.env.baseUrl}/css/monokai.css">`;
            alternativeNode = document.createElement('iframe')
            alternativeNode.src = URL.createObjectURL(new Blob([`<!DOCTYPE html>${customStyle}<title></title>${script.outerHTML}`], {type: 'text/html'}))
            alternativeNode.onload = () => {
              alternativeNode.height = alternativeNode.contentDocument.body.scrollHeight + 50
            }
          } else {
            alternativeNode = document.createElement('script')
            alternativeNode.src = script.src
          }
          parentNode.replaceChild(alternativeNode, script)
        })
      },
      //シンタックスハイライト
      highlightCode(){
        const codeblock = this.$el.querySelectorAll('pre code');
        if(!codeblock){
          return;
        }
        [...codeblock].forEach((block) => {
          hljs.highlightBlock(block);
        });
      },
      addWpCodeBlockLabel() {
        const wp_codeblock = this.$el.querySelectorAll('.wp-block-code');
        if(!wp_codeblock){
          return;
        }
        [...wp_codeblock].forEach((wpblock) => {
          const highlightClass = Array.from(wpblock.classList).filter((className) => {
            return (className !== 'hljs') && (className !== 'wp-block-code');
          });
          if(highlightClass.length){
            wpblock.setAttribute('data-code', highlightClass[0]);
          }
        });
      },
      //目次のリンクをハッシュ以下のみに置き換え
      replaceTocLink(){
        const toc = this.$el.querySelectorAll('#ez-toc-container a');
        if(!toc){
          return;
        }
        [...toc].forEach((link) => {
          const hash = link.hash;
          link.setAttribute('href', hash);
        });
      }
    },
    mounted () {
      this.runScript();
      this.replaceTocLink();
      this.highlightCode();
      this.addWpCodeBlockLabel();
    },
    updated () {
      this.runScript();
      this.replaceTocLink();
      this.highlightCode();
      this.addWpCodeBlockLabel();
    }
  }
</script>