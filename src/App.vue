<template>
  <div id="app" class="app" :class="{ 'active': theme}">
    <myheader :theme="theme"></myheader>

    <div id="content" style="display:flow-root;min-height:85.8vh;">
      <!-- 按钮 -->

      <myswitch @getMsg="getMsg"></myswitch>

      <!-- 导航栏 -->

      <sidebar></sidebar>

      <!-- 这部分为路由，切换页面会变化 -->

      <router-view :key="$router.path" />
      <stick-bar></stick-bar>
      <!-- 这部分为路由，切换页面会变化 -->
    </div>
  </div>
</template>


<script>
import myheader from "./components/header.vue";

import myswitch from "./components/switch.vue";

import sidebar from "./components/siderbar.vue";

export default {
  mounted() {},

  updated() {},

  methods: {
    getMsg(data) {
      this.theme = data;
    }
  },

  data() {
    return {
      theme: ""
    };
  },

  components: {
    myheader,

    myswitch,

    sidebar
  }
};
</script>





<style lang="less">
table {
  background-color: snow;
}
li > a {
  text-decoration: none;
  &:hover {
    color: #409eff;
  }
}

@color-bg: #1a1a1a;

@color-contrast-high: rgb(229, 229, 229);

.el-progress {
  position: fixed !important;

  width: 100vw;

  top: 0px;
}

.el-progress-bar__outer {
  background-color: rgba(0, 0, 0, 0) !important;
}

// 脚注的对齐方式

ol li p {
  text-align: left;
  word-break: break-word;
}

.footnote-backref {
  text-decoration: none;

  padding: 0px 0 0 3px;

  margin-top: 28px;

  top: 3px;

  position: relative;

  font-size: 120%;
}

// 评论模块样式

input:-internal-autofill-selected {
  background-color: rgba(255, 255, 255, 1) !important;
}

#vcomments {
  width: 36em;

  display: inline-table;

  padding-top: 4em;

  margin-bottom: 4em;

  @media (max-width: 38em) {
    width: auto;
  }

  .vwrap {
    border: 0px solid white;

    transition: all 0.5s linear;
  }

  .vwrap:hover {
    box-shadow: 0 2px 4px #005cbc, 0 0 6px #ff4949;

    transition: all 0.5s ease;

    transform: translate(1px, 2px);
  }
}

a {
  color: @color-bg;
  text-underline-position: under !important;
}

@color-hover: #2a6df4;

.app.active {
  @color-hover: red !important;

  background-color: @color-bg!important;

  color: rgb(229, 229, 229) !important;
  .backtop {
    background-color: transparent;
  }
  .comment {
    background-color: #1a1a1a;
    box-shadow: 0 2px 12px 0 rgba(255, 255, 255, 0.4);
  }

  article .commentBtn {
    color: white;
  }
  a {
    color: @color-contrast-high;
  }

  ul li {
    border-bottom-color: @color-contrast-high;
  }

  // 评论样式的切换

  .v * {
    color: rgb(229, 229, 229);
  }

  .v .vbtn {
    background-color: #1a1a1a;
  }

  .post-nav {
    border-top: 1px dashed rgb(229, 229, 229, 0);
  }

  .iname {
    color: white;
  }

  p code {
    background-color: #4b4b4b;
  }

  blockquote {
    color: white;
  }

  mark {
    color: white;
  }
  .backtop {
    color: white;
  }
}

sup {
  right: -3px !important;

  height: 17px !important;
}

.el-notification .el-icon-info {
  color: #409eff !important;
}

section p {
  line-height: 2;
  text-justify: distribute;
}

h1 {
  font-family: "Cinzel Decorative", "Noto Serif SC", serif;

  font-size: 1.8em;

  font-weight: 600;

  text-align: center;

  margin-block-start: 0;

  margin-block-end: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 1.618em 0 1em;
  line-height: 1.618;
}

// 锚点样式

h2:hover,
h3:hover,
h4:hover {
  .header-anchor {
    color: @color-hover;

    opacity: 1;

    text-decoration: none;

    transition: all 0.5s;
  }
}

.header-anchor {
  position: absolute;

  transform: translate(-125%);

  opacity: 0.2;

  text-decoration: none;

  transition: all 1s;

  line-height: 1.4;
}

::-webkit-scrollbar {
  width: 6px;

  height: 5px;
  @media (max-width: 36em) {
    width: 6px;
    height: 0px;
  }
}

::-webkit-scrollbar-thumb {
  background-color: #d5d5d5;
  border-radius: 1em;
}

//图片缩放

p img {
  max-width: 100%;

  margin: 1em auto 1em auto;

  display: block;

  border: 2px solid #f3f3f3;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  @media (max-width: 36em) {
    width: auto;
  }
}

// 图名及标签

.iname {
  text-align: center;

  font-size: 85%;

  color: #5a5a5a;
}

.itag {
  font-size: 86%;
  top: -1.5px;
  position: relative;

  left: -6px;
}

/* app模块里用的都是宋体,html标签的样式穿透不进来 */

#app {
  font-family: "EB Garamond", "Noto Serif SC", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;

  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;

  text-align: center;

  transition: 0.5s;

  margin-right: calc(100% - 100vw);
}

blockquote {
  margin: 1em 0;
  padding: 0 1em;
  color: #6c6a6a;
  border-left: 3px solid #cccccc;
  p {
    padding-left: 5px;
    @media (max-width: 36em) {
      padding-left: 15px;
    }
  }
}

mark {
  background-color: rgba(0, 0, 0, 0);
  -webkit-text-emphasis: filled;
  -webkit-text-emphasis-position: under left;
  text-emphasis: filled;
  text-emphasis-position: under left;
}
code {
  font-family: Source Code Pro;
}

//行内代码块
section p:nth-child(2) {
  margin-top: 4em;
}

p code {
  font-family: "EB Garamond";

  background-color: #eeeeee;

  border-radius: 5px;

  padding: 0 5px 3px 5px;

  margin: 0 3px;

  color: rgb(255, 85, 0);
  font-size: 16px;
}

.selected {
  background-color: #000000 !important;
}

.hljs {
  display: grid !important;
  border-radius: 5px;

  font-size: 0.9em;

  margin-right: 0;

  font-weight: 200;

  color: #ffffff !important;

  padding: 0.5em 0 !important;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.7);

  ul {
    margin: 0;
    padding-left: 40px;

    li {
      list-style: decimal;

      padding: 5px !important;

      line-height: 14px;
      font-size: 13px;
    }
  }
}

.hljs-comment,
.hljs-quote {
  color: #9ea2aa !important;
}

.hljs ul li:nth-of-type(2n) {
  background-color: rgba(255, 255, 255, 0.015);
}

table {
  word-break: break-all;
  word-wrap: break-word;
  width: 100%;
  @media (max-width: 36em) {
    width: auto;
  }
}

strong {
  border-bottom: 5px solid #8989ff;
  border-bottom-style: double;
  padding-left: 2px;
  padding-right: 2px;
  font-weight: normal;
}

.table-of-contents {
  position: absolute;

  // right: -103%;
  right: -53%;
  width: 250px;
  font-size: 13px;

  height: 310px;
  overflow: auto;

  padding: 0.618rem;

  border-radius: 5px;
  list-style-type: none;

  ol {
    list-style-type: circle;
    // margin-block-start: 0em;
    padding-inline-start: 25px;
  
  }

  // background-color: white;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  @media (max-width: 70em) {
    display: none;
  }
}
.scroll {
  position: absolute;
  right: -53%;
  // right: 0;
  top: 0%;
}
</style>