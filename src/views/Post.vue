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
      <!-- <div class="num">{{percentage}}</div> -->
      <article class="main-inner">
        <h1 style="padding-bottom:1em">{{title}}</h1>
        <component :is="dynamicComponent" />

        <div>
          <like-button :path="this.path"></like-button>
        </div>
        <div class="footer" style="display: flex;justify-content: space-between;">
          <div>
            <router-link v-for="(item,index) in tag" :key="index" :to="`/bloglist/${item}`">
              <i class="el-icon-s-promotion"></i> {{item}}
              
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
      <button id="backbt" class="backtop" v-on:click="btnTop">
        <i class="fa fa-angle-double-up"></i>
      </button>
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

// 滚动条监听
$(document).ready(function() {
  $(document).scroll(function() {
    //开始监听滚动条
    //获取当前滚动条高度

    var max = $(document).height();
    var top = $(document).scrollTop();
    var viewH = $(window).height();

    if (
      document.body.scrollTop > max - viewH - 400 ||
      document.documentElement.scrollTop > max - viewH - 400
    ) {
      $("#backbt").show();
    } else {
      $("#backbt").hide();
    }
    //用于调试 弹出当前滚动条高度
    var percentage = (top / (max - viewH)) * 100 + "%";
    $(".el-progress-bar__inner").css("width", percentage);
  });
});

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
  watch: {},

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

    addname();
    anchormove();
  },

  created() {
    const markdown = require(`../assets/blog/${this.name}.md`);
    this.metaData.tags = markdown.attributes.tags;
    this.tag = markdown.attributes.tags.split("|");
    this.title = markdown.attributes.title;
    this.dynamicComponent = markdown.vue.component;

    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.dynamicComponent = () => import(`~/articles/${this.fileName}.md`).then(({ vue }) => vue.component

    this.createValine();
  },
  methods: {
    btnTop() {
      $("html,body").animate({ scrollTop: "0px" }, 1000);
    },
    // 上一篇文章
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
.backtop {
  display: none;
  position: fixed;
  width: 42px;
  height: 42px;
  top: 92%;
  right: 4%;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: transparent;
  transition: all 0.5s ease;
  background-color: white;

  &:hover {
    cursor: pointer;
    color: white;
    text-shadow: 0 2px 4px #005cbc, 0 0 6px #ff4949;
  }

  &:focus {
    outline: none;
  }
}

.main {
  padding: 2em 1em 0em 1em;
}


.main-inner {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
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