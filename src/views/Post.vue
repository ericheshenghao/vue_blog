<template>
  <div :class="showcomment?'contanier':'contanier'" style="padding-top:0.1em;">
    <el-progress
      class="num"
      :show-text="false"
      :stroke-width="2.5"
      :color="gray"
      :percentage="percentage"
    ></el-progress>
    <div class="main">
      <article class="main-inner">
        <search-button></search-button>
        <h1 style="padding-bottom:1em" v-typing>{{title}}</h1>

        <comment :show="showcomment" :whichpara="whichpara" @showoff="hide"></comment>
        <component :is="dynamicComponent" style="position:relative" />

        <div>
          <like-button ref="likeBtn" :path="this.path"></like-button>
        </div>
        <div class="footer" style="display: flex;justify-content: space-between;">
          <div>
            <router-link v-for="(item,index) in tag" :key="index" :to="`/bloglist/${item}`">
              <i class="el-icon-s-promotion"></i>
              {{item}}
            </router-link>
          </div>
          <div>
            <router-link :to="{name:'bloglist',params:{name:'tech'}}">Tech</router-link>|
            <span>
              <router-link :to="{name:'bloglist',params:{name:'life'}}">Life</router-link>
            </span>
          </div>
        </div>

        <div class="post-nav">
          <!-- 左右切换按钮 -->
          <el-button type="text" icon="el-icon-arrow-left" @click="lastpost">Last</el-button>

          <el-button type="text" icon="el-icon-arrow-right" @click="nextpost">
            <span style="float: left;padding-right: 3px;">Next</span>
          </el-button>
          <!-- 左右切换按钮 -->
        </div>
      </article>
      <div id="vcomments"></div>
      <FootInner></FootInner>
      <!-- <typing></typing> -->

      <back-top></back-top>
    </div>

    <!-- <transition  
    id="footbar"
       enter-active-class="animated bounceInUp"
      leave-active-class="animated bounceOutDown"> -->
    <div  class="footbar showoff">
      <div style="line-height:50px;">
        <el-button icon="el-icon-caret-top" type="primary" @click="likeClick">赞同 {{count}}</el-button>
        <el-button icon="el-icon-caret-bottom" type="primary" @click="clk"></el-button>
        
        <el-button style="padding:0 10px;" icon="el-icon-s-opportunity" type="text" @click="clk">评论</el-button>
        <el-button style="padding:0 10px;" icon="el-icon-share" type="text" @click="clk">分享</el-button>
        <el-button style="padding:0 10px;" icon="el-icon-more" type="text" @click="clk"></el-button>
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import FootInner from "@/components/FootInner.vue";

// import moduleStore from "@/bloglist";

import mediumZoom from "medium-zoom";
// window.AV = require("leancloud-storage");
// import Valine from "valine";
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
  $("p img").each(function() {
    var title = $(this).attr("alt");
    $(this).after(
      '<div class="iname">' +
        '<span class="itag"><i class="fa fa-twitch"></i></span>' +
        title +
        "</div>"
    );
  });
};

// 代码前数字
const preCode = () => {
  $("pre code").each(function() {
    $(this).html(
      "<ul><li>" +
        $(this)
          .html()
          .replace(/\n/g, "</li><li>") +
        "\n</li></ul>"
    );
    // 给指定行增加样式
    try {
      var line = $(this)
        .attr("class")
        .match(/\d+/g);
      for (let i in line) {
        $(this)
          .children()
          .children()
          .eq(line[i] - 1)
          .addClass("selected");
      }
    } catch (err) {
      throw err;
    }
  });
  // 去掉最后一行的空行
  $("ul li:last-child").remove();
};

// const anchormove = () => {
//   $("h2>a,h3>a,h4>a").click(function() {
//     //根据a标签的href转换为id选择器，获取id元素所处的位置
//     try {
//       $("html,body").animate(
//         { scrollTop: $($(this).attr("href")).offset().top },
//         1000
//       );
//     } catch (err) {
//       throw err;
//     }
//   });
// };

export default {
  props: ["name"],

  // 添加title 写到方法里面
  metaInfo() {
    return {
      title: this.$route.params.name ? this.$route.params.name : "Mosaic",
      titleTemplate: "%s - Yay!",
      meta: [
        {
          name: "keyWords",
          content: this.note
        }
      ],
      htmlAttrs: {
        lang: "en",
        amp: true
      }
    };
  },
  components: { FootInner },
  mounted() {
    highlightCode();
    mediumzoom();
    preCode();
    this.createValine();
    // 试试给图片添加图名
    addname();

    this.addcomment();
    this.text();
  },
  updated() {
    // mediumzoom();
    // addname();
  },

  created() {
    const markdown = require(`../assets/blog/${this.name}.md`);
    this.metaData.tags = markdown.attributes.tags;
    this.tag = markdown.attributes.tags.split("|");
    this.title = markdown.attributes.title;
    this.note = markdown.attributes.note;
    this.dynamicComponent = markdown.vue.component;
    window.commentClick = this.commentClick;
    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.dynamicComponent = () => import(`~/articles/${this.fileName}.md`).then(({ vue }) => vue.component

    this.createValine();
  },
  methods: {
    likeClick(){
     this.$refs.likeBtn.btclick()
     setTimeout(() => {
        this.count = this.$refs.likeBtn.count;
      }, 300);
    },
    clk() {},
    text() {
      setTimeout(() => {
        this.count = this.$refs.likeBtn.count;
      }, 100);
    },
    // 添加段落评论
    addcomment() {
      var paragraph = [];
      var i = 0;
      $("blockquote p").each(function() {
        var container = $(this).html();

        paragraph.push(container);

        $(this).before(
          `<button class='commentBtn' onclick='commentClick(${i})'><i class='fa fa-comment-o'></i></button>`
        );
        i++;
      });
      this.paragraph = paragraph;
    },

    hide() {
      this.showcomment = !this.showcomment;
    },
    commentClick(e) {
      this.whichpara = [];
      this.showcomment = !this.showcomment;
      this.whichpara.push({ para: this.paragraph[e], index: e });
    },

    nextpost() {},
    // 下一篇文章
    lastpost() {},

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
      whichpara: [],
      paragraph: [],
      showcomment: false,
      title: null,
      dynamicComponent: null,
      metaData: [],
      index: "",
      count: "",
      // 最大文章的序列号

      path: "/post/" + this.$route.params.name,
      percentage: 0,
      gray: "#66b1ff"
    };
  }
};
</script>

<style lang="scss" scoped>
.footbar {
  width: 100vw;
  height: 50px;
  // background-color: black;
  box-shadow: 0px 0.5px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed;
  bottom: 0;
  z-index: 0;
  background-color: white;
  
}
.main {
  padding: 2em 1em 0em 1em;
}

.main-inner {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
  line-height: 2.218;

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
.mask {
  position: absolute;
  z-index: 10;
  width: 100vw;
  height: auto;
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>