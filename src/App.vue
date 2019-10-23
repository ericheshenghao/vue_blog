<template>
  <div id="app" class="app" v-bind:class="{ 'active': theme}">
    <myheader></myheader>

    <div id="content" style="display:flow-root;min-height:85.8vh;">
      <!-- 按钮 -->

      <myswitch @getMsg="getMsg"></myswitch>

      <!-- 导航栏 -->

      <sidebar></sidebar>

      <!-- 这部分为路由，切换页面会变化 -->

      <router-view />

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
}

.footnote-backref {
  text-decoration: none;

  padding: 0px 0 0 3px;

  margin-top: 28px;

  top: 7px;

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
}

@color-hover: #2a6df4;

.app.active {
  @color-hover: red !important;

  background-color: @color-bg!important;

  color: rgb(229, 229, 229) !important;

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

  mark{
    color:white;
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

  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-image: linear-gradient(
    45deg,
    rgba(247, 149, 51, 0.4) 0px,
    rgba(202, 135, 121, 0.45) 15%,
    rgba(239, 78, 123, 0.5) 30%,
    rgba(161, 102, 171, 0.55) 44%,
    rgba(80, 115, 184, 0.6) 58%,
    rgba(16, 152, 173, 0.65) 72%,
    rgba(7, 179, 155, 0.7) 86%,
    rgba(109, 186, 130, 0.75) 100%
  );

  border-radius: 1em;
}

//图片缩放

p img {
  max-width: 80%;

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
  font-size: 100%;

  position: relative;

  left: -4px;
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
}

mark {
  background-color: rgba(0, 0, 0, 0);
  -webkit-text-emphasis: filled;
  -webkit-text-emphasis-position: under left;
  text-emphasis: filled;
  text-emphasis-position: under left;
}
code {
  font-family: "EB Garamond";
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
}

.selected {
  background-color: #000000 !important;

  z-index: 10;

  &:hover {
    animation: faded infinite 1s linear;
  }

  @keyframes faded {
    0% {
      box-shadow: 0 0px 4px #005cbc, 0 0 6px #ff4949;
    }

    50% {
      box-shadow: 0 0px 0.2px #005cbc, 0 0 0px #ff4949;
    }

    100% {
      box-shadow: 0 0px 4px #005cbc, 0 0 6px #ff4949;
    }
  }
}

.hljs {
  border-radius: 5px;

  font-size: 13.8px;

  display: block;

  margin-right: 0;

  font-weight: 200;

  color: #ffffff !important;

  white-space: pre-wrap;

  padding: 0.5em 0 !important;

  ul {
    margin: 0;

    padding-left: 29px;

    li {
      list-style: decimal-leading-zero;

      border-left: 1px solid #111 !important;

      padding: 5px !important;

      line-height: 14px;

      word-break: break-all;

      word-wrap: break-word;
    }
  }
}

.hljs ul li:nth-of-type(2n) {
  background-color: rgba(255, 255, 255, 0.015);
}
</style>