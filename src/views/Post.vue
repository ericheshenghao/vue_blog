<template>
  <div class="contanier" style="padding-top:0.1em;">
  
    <el-progress
      class="num"
      :show-text="false"
      :stroke-width="2.5"
      :color="gray"
      :percentage="percentage"
    ></el-progress>
    <div class="main">
      <article class="main-inner">
        <h1 style="padding-bottom:1em">{{title}}</h1>

          <comment :show="showcomment" :eachparagraph="eachparagraph"></comment>
        <component :is="dynamicComponent" />

        <div>
          <like-button :path="this.path"></like-button>
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
      <!-- <el-backtop type="text"></el-backtop> -->
      <back-top></back-top>
    </div>
  </div>
</template>

<script>
import FootInner from "@/components/FootInner.vue";
import { bloglist, techlen, lifelist, lifelen } from "@/bloglist";

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
        '<span class="itag"><i class="fa fa-twitch  "></i></span>' +
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

const anchormove = () => {
  $("h2>a,h3>a,h4>a").click(function() {
    //根据a标签的href转换为id选择器，获取id元素所处的位置
    try {
      $("html,body").animate(
        { scrollTop: $($(this).attr("href")).offset().top },
        1000
      );
    } catch (err) {
      throw err;
    }
  });
};

// 添加段落评论


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
          content: this.$route.params.name
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
    anchormove();
    this.addcomment();
    
    
  },
  updated() {
    mediumzoom();
    // addname();
    anchormove();
  },


  created() {
    const markdown = require(`../assets/blog/${this.name}.md`);
    this.metaData.tags = markdown.attributes.tags;
    this.tag = markdown.attributes.tags.split("|");
    this.title = markdown.attributes.title;
    this.dynamicComponent = markdown.vue.component;
    window.upload = this.upload;
    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.dynamicComponent = () => import(`~/articles/${this.fileName}.md`).then(({ vue }) => vue.component

    this.createValine();
  },
  methods: {
    addcomment() {
      var paragraph = [];
      var i = 0;
      $("blockquote p").each(function() {
        var container = $(this).html();

        paragraph.push(container);

        $(this).before(
          `<button class='commentBtn' onclick='upload(${i})'><i class='fa fa-comment-o'></i></button>`
        );
        i++;
      });
      this.paragraph = paragraph;
    },
    // 上一篇文章
    upload(e) {
      this.showcomment = !this.showcomment;
      this.eachparagraph = this.paragraph[e]
      
      // const uploadParagraph = this.paragraph[e];
      // const uploadUrl = this.$route.path;

      // const Paras = AV.Object.extend("parasComment");
      // const paras = new Paras();
      // paras.set("url", uploadUrl);
      // paras.set("p", uploadParagraph);
      // paras.set("comment","一条评论")
      // paras.save();
      // this.$message({
      //   message:"评论成功",
      //   type:"success"
      // })
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
      eachparagraph:"",
      paragraph: [],
      showcomment: false,
      title: null,
      dynamicComponent: null,
      metaData: [],
      index: "",
      // 最大文章的序列号
      lifelen,
      techlen,
      path: "/post/" + this.$route.params.name,
      percentage: 0,
      gray: "#66b1ff"
    };
  }
};
</script>

<style lang="less" scoped>
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
</style>