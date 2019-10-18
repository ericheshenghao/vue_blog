<template>
  <div class="contanier" style="padding-top:0.1em;">
    <div class="main">
      <article class="main-inner">
        <mymarkdown :is="root"></mymarkdown>
        <div style="display: flex;justify-content: space-between;padding-top: 20px;">
          <!-- 左右切换按钮 -->
          <el-button type="text" icon="el-icon-arrow-left" @click="lastpost" circle>{{lastname}}</el-button>

          <el-button type="text" icon="el-icon-arrow-right" @click="nextpost" circle><span style="float: left;padding-right: 3px;">{{nextname}}</span></el-button>
          <!-- 左右切换按钮 -->
        </div>
      </article>

      <div id="vcomments">

      </div>
      <FootInner></FootInner>
      <el-backtop type="text"></el-backtop>
    </div>

  </div>

</template>
<script>
  import FootInner from "@/components/FootInner.vue";
  import { bloglist, techlen, lifelist, lifelen } from "@/bloglist";
  import mediumZoom from "medium-zoom";
  window.AV = require('leancloud-storage');
  import Valine from 'valine';
  import $ from "jquery";
  import hljs from "highlight.js";
  import "highlight.js/styles/tomorrow-night-eighties.css";
  // 代码高亮
  const highlightCode = () => {
    const preEl = document.querySelectorAll("pre code");

    preEl.forEach(el => {
      hljs.highlightBlock(el);
    });
  };

  // 图片预览
  const mediumzoom = () => {
    mediumZoom(document.querySelectorAll("p img"));
  }

  // 代码前数字    
  const preCode = () => {

    $("pre code").each(function () {
        $(this).html(
        "<ul><li>" +
        $(this)
          .html()
          .replace(/\n/g, "</li><li>") +
        "\n</li></ul>"
      );
    });
    // 去掉最后一行的空行
    $("ul li:last-child").remove();
  }

  //批量注册

  const context = require.context("@/assets/tech", true, /\.md$/);
  const lifetext = require.context("@/assets/life", true, /\.md$/);
  const moduleStore = {
    FootInner,
  };
  context.keys().forEach(key => {
    const fileName = key.split(".")[1].split("/")[1];
    const fileModule = context(key).default;
    moduleStore[fileName] = {
      ...fileModule,
      namespaced: true
    };
  });
  lifetext.keys().forEach(key => {
    const fileName = key.split(".")[1].split("/")[1];
    const fileModule = lifetext(key).default;
    moduleStore[fileName] = {
      ...fileModule,
      namespaced: true
    };
  });



  export default {

    components: moduleStore,


    mounted() {
      highlightCode();
      mediumzoom();
      preCode();
      this.createValine();
    },


    updated() {
      highlightCode();
      mediumzoom();
      preCode();
      this.createValine();
    },

    created() {
      if (this.list == "tech") {
        for (var i in bloglist) {
          if (bloglist[i].content == this.root) {
            this.index = i
            // if (i==0){
            // this.lastname = "creeper"
            // this.nextname = bloglist[++i].content
            // }else{
            // this.lastname = bloglist[i-1].content
            // this.nextname = bloglist[++i].content
            // }
            break
          }

        }
        
      } else {
        for (var j in lifelist) {
          if (lifelist[j].content == this.root) {
            this.index = j
            break
          }
        }
      }

      // 保证刷新后也知道在什么类目下
      for (var k in bloglist) {
        if (bloglist[k].content == this.root) {
          this.list = "tech"
          break
        } else { this.list = "life" }
      }

    },
    methods: {
      // 上一篇文章
      nextpost() {
        if (this.list == "tech") {
          if (this.index < this.techlen - 1) {
            ++this.index;
            if (this.index < this.techlen) {
              this.root = bloglist[this.index].content;
              this.path = "/post/" + bloglist[this.index].content
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          } else {
            this.$notify.info({
              title: "owwwwwww",
              message: "man🍭"
            });
          }
        }

        if (this.list == "life") {
          if (this.index < this.lifelen - 1) {
            ++this.index;
            if (this.index < this.lifelen) {
              this.root = lifelist[this.index].content;
              this.path = "/post/" + lifelist[this.index].content
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          } else {
            this.$notify.info({
              title: "owwwwwww",
              message: "man🍭"
            });
          }
        }
      },
      // 下一篇文章
      lastpost() {
        if (this.list == "tech") {
          if (this.index > 0) {
            --this.index;
            this.root = bloglist[this.index].content;
            this.path = "/post/" + bloglist[this.index].content;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

          } else {
            this.$notify.info({
              title: "owwwwwww",
              message: "man🍭"
            });
          }

        }

        if (this.list == "life") {
          if (this.index > 0) {
            --this.index;
            this.root = lifelist[this.index].content;
            this.path = "/post/" + lifelist[this.index].content
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          } else {
            this.$notify.info({
              title: "owwwwwww",
              message: "man🍭"
            });
          }
        }
      },
      createValine() {
        new Valine({
          el: '#vcomments',
          appId: 'wpHpwFpwArdiE7U4B55lsffv-gzGzoHsz',
          appKey: 'j1IynKzfj5rsmmzap7ro2aKd',
          notify: true,
          verify: false,
          region: 'cn',
          avatar: 'retro',
          path: this.path,
          placeholder: '留下邮箱才可以收到回复哦'
        })
      },
    },

    data() {
      return {
        // 用来切换组件的数据
        root: this.$route.params.name,
        list: this.$route.params.list,
        // 文章的序列号
        lastname:"Last",
        nextname:"Next",
        index: "",
        // 最大文章的序列号
        bloglist,
        lifelist,
        lifelen,
        techlen,
        path: "/post/" + this.$route.params.name
      };
    }
  };
</script>
<style lang="less" scoped>
  .main {
    padding: 2em 1em 0em 1em;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  .main-inner {
    text-align: justify;
    width: 36em;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.618;

    @media (max-width: 38em) {
      width: auto;
    }
  }

  .el-button {
    border: 0px solid white;
  }
</style>