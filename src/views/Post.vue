<template>
  <div class="contanier" style="padding-top:0.1em;">
    <el-progress class="num" :show-text="false" :stroke-width="2.5" :color="gray" :percentage="percentage">
    </el-progress>
    <div class="main">
      <!-- <div class="num">{{percentage}}</div> -->
      <article class="main-inner">
        <mymarkdown :is="root"></mymarkdown>
        <div class="footer" style="display: flex;justify-content: space-between;">
          <div>#</div>
          <div>
            <router-link to="/techlist">Tech</router-link>|
            <span>
              <router-link to="/lifelist">Life</router-link>
            </span>
          </div>
        </div>
        <div class="post-nav">
          <!-- 左右切换按钮 -->
          <el-button type="text" icon="el-icon-arrow-left" @click="lastpost">{{lastname}}</el-button>

          <el-button type="text" icon="el-icon-arrow-right" @click="nextpost">
            <span style="float: left;padding-right: 3px;">{{nextname}}</span>
          </el-button>
          <!-- 左右切换按钮 -->
        </div>
      </article>

      <div id="vcomments"></div>
      <FootInner></FootInner>
      <!-- <el-backtop type="text"></el-backtop> -->
      <button id="backbt"  class="backtop" v-on:click="btnTop">
      <i class="fa fa-angle-double-up"></i>
    </button>
    </div>
  </div>
</template>
<script>
  import FootInner from "@/components/FootInner.vue";
  import { bloglist, techlen, lifelist, lifelen } from "@/bloglist";
  import mediumZoom from "medium-zoom";
  window.AV = require("leancloud-storage");
  import Valine from "valine";
  // import hljs from "highlight.js";
  // import "highlight.js/styles/tomorrow-night.css";
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
  };
  // 图片添加图名
  const addname = () => {
    $("p img").each(function () {
      var title = $(this).attr("alt");
      $(this).after(
        '<div class="iname">' +
        '<span class="itag"><i class="fa fa-twitch  "></i></span>' +
        title +
        "</div>"
      );
    });
  };

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
      // 给指定行增加样式
      // try {
      //   var line = $(this).attr("class").match(/\d+/g)
      //   for (let i in line) {
      //     $(this).children().children().eq(line[i] - 1).addClass("selected")
      //   }
      // } catch (err) {
      //   throw err
      // }
    });
    // 去掉最后一行的空行
    $("ul li:last-child").remove();
  };

  const anchormove = () => {
    $('h2>a,h3>a,h4>a').click(function () {
      //根据a标签的href转换为id选择器，获取id元素所处的位置
      try { $('html,body').animate({ scrollTop: ($($(this).attr('href')).offset().top) }, 1000); }
      catch (err) {
        throw err
      }
    });
  }

  //批量注册

  const context = require.context("@/assets/tech", true, /\.md$/);
  const lifetext = require.context("@/assets/life", true, /\.md$/);
  const moduleStore = {
    FootInner
  };
  context.keys().forEach(key => {
    
    // const fileName = key.split('.+(?=\.)');
    var index = key .lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]



    const fileModule = context(key).default;
    moduleStore[fileName] = {
      ...fileModule,
      namespaced: true
    };
  });
  lifetext.keys().forEach(key => {
    var index = key.lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]
    const fileModule = lifetext(key).default;
    moduleStore[fileName] = {
      ...fileModule,
      namespaced: true
    };
  });


    


  // 滚动条监听
  $(document).ready(function () {
    $(document).scroll(function () {//开始监听滚动条
      //获取当前滚动条高度
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        $("#backbt").show()
    } else {
         $("#backbt").hide()
    }
      var max = $(document).height();
      var top = $(document).scrollTop();
      var viewH = $(window).height();
      //用于调试 弹出当前滚动条高度
      var percentage = (top) / (max-viewH) * 100 + "%";
      $(".el-progress-bar__inner").css("width", percentage);
    })
  })

  export default {
    components: moduleStore,
    watch: {

    },

    mounted() {
      highlightCode();
      mediumzoom();
      preCode();
      this.createValine();
      // 试试给图片添加图名
      addname();
      anchormove();
    },

    updated() {
      highlightCode();
      mediumzoom();
      preCode();
      this.createValine();
      addname();
      anchormove();
    },

    created() {
      if (this.list == "tech") {
        for (var i in bloglist) {
          if (bloglist[i].content == this.root) {
            this.index = i;
            break;
          }
        }
      } else {
        for (var j in lifelist) {
          if (lifelist[j].content == this.root) {
            this.index = j;
            break;
          }
        }
      }

      // 保证刷新后也知道在什么类目下
      for (var k in bloglist) {
        if (bloglist[k].content == this.root) {
          this.list = "tech";
          break;
        } else {
          this.list = "life";
        }
      }
    },
    methods: {
      // 上一篇文章
      btnTop(){
        $('html,body').animate({scrollTop: '0px'}, 1000);
      },
      nextpost() {
        if (this.list == "tech") {
          if (this.index < this.techlen - 1) {
            ++this.index;
            if (this.index < this.techlen) {
              this.root = bloglist[this.index].content;
              this.path = "/post/" + bloglist[this.index].content;
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
          } 
        }

        if (this.list == "life") {
          if (this.index < this.lifelen - 1) {
            ++this.index;
            if (this.index < this.lifelen) {
              this.root = lifelist[this.index].content;
              this.path = "/post/" + lifelist[this.index].content;
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }
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
          } 
        }

        if (this.list == "life") {
          if (this.index > 0) {
            --this.index;
            this.root = lifelist[this.index].content;
            this.path = "/post/" + lifelist[this.index].content;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          } 
        }
      },
      createValine() {
        new Valine({
          el: "#vcomments",
          appId: "wpHpwFpwArdiE7U4B55lsffv-gzGzoHsz",
          appKey: "j1IynKzfj5rsmmzap7ro2aKd",
          notify: true,
          verify: false,
          region: "cn",
          avatar: "retro",
          path: this.path,
          placeholder: "留下邮箱才可以收到回复哦"
        });
      }
    },

    data() {
      return {
        // 用来切换组件的数据
        root: this.$route.params.name,
        list: this.$route.params.list,
        // 文章的序列号
        lastname: "Last",
        nextname: "Next",
        index: "",
        // 最大文章的序列号
        bloglist,
        lifelist,
        lifelen,
        techlen,
        path: "/post/" + this.$route.params.name,
        percentage: 0,
        gray: '#66b1ff',
      };
    }
  };
</script>
<style lang="less" scoped>
  .backtop{
    display: none;
    position: fixed;
    top: 95%;
    right:2%;
    font-size: 20px;
    /* height: 50px;
    width: 50px;
    border-radius: 50px;*/
    background-color: rgba(0, 0, 0, 0); 
     border: none;
    transition: all .5s ease;
    &:hover{
      cursor:pointer;
      color: white;
      text-shadow: 0 2px 4px #005cbc, 0 0 6px #ff4949;
    }
    &:focus{
      outline: none;
    }
  }



  .main {
    padding: 2em 1em 0em 1em;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
 
  .main-inner {
    text-align: justify;
    width: 36em;
    margin: 0 auto;
    /* font-size: 16px; */
    line-height: 1.618;

    @media (max-width: 38em) {
      width: auto;
    }
  }

  .el-button {
    border: 0px solid white;
  }

  .post-nav {
    display: flex;
    justify-content: space-between;
    padding-top: 4em;
    border-top: 1px dashed rgba(0, 0, 0, 0.2);
  }

  .footer {
    margin: 4em 0;

  }

  .footer a {
    text-decoration: none;
    padding: 0 5px;
  }
</style>