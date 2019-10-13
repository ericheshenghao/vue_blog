<template>
  <div id="app">
    <myheader></myheader>
    <div id="content" style="display:flow-root;min-height:85vh;">
      <!-- 按钮 -->
      <myswitch></myswitch>
      <!-- 导航栏 -->

      <sidebar></sidebar>
      <!-- 这部分为路由，切换页面会变化 -->
      <router-view />
      <!-- 这部分为路由，切换页面会变化 -->
    </div>
  </div>
</template>

<style lang="less">
:root
{
    // background:black;
    
}
/* app模块里用的都是宋体,html标签的样式穿透不进来 */
#app {
  font-family: "EB Garamond", "Noto Serif SC", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;

  margin-right: calc(100% - 100vw);
}

blockquote {
  background-image: linear-gradient(
    90deg,
    rgba(247, 149, 51, 0.4) 0px,
    rgba(202, 135, 121, 0.45) 15%,
    rgba(239, 78, 123, 0.5) 30%,
    rgba(161, 102, 171, 0.55) 44%,
    rgba(80, 115, 184, 0.6) 58%,
    rgba(16, 152, 173, 0.65) 72%,
    rgba(7, 179, 155, 0.7) 86%,
    rgba(109, 186, 130, 0.75) 100%
  );
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-left: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  font-weight: 500;
  margin-left: 0;
  margin-right: 0;
}

code {
  font-family: "EB Garamond";
}

.hljs {
  border-radius: 5px;
  line-height: 1.4;
  padding: 10px;
  padding-left: 30px;
  font-size: 0.85rem;
}

h1 {
  font-family: "Cinzel Decorative", "Noto Serif SC", serif;
  font-size: 1.8em;
  font-weight: 600;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;
}
a {
  color: black;
}
</style>

<script>
import myheader from "./components/header.vue";
import myswitch from "./components/switch.vue";
import sidebar from "./components/siderbar.vue";


export default {
  mounted() {
    
  },

  updated() {
    
  },

  data() {
    return {};
  },
  components: {
    myheader,
    myswitch,
    sidebar
  },
};
</script>