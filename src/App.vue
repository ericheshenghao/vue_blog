<template>
  <div id="app">
    
    <myheader></myheader>
    
    <myswitch></myswitch>
  <!-- 导航栏 -->
  <div id="nav" style="margin-top:40px;">
      <router-link to="/" style="text-decoration: none;">首页</router-link>|
      <router-link to="/about" style="text-decoration: none;">About</router-link>
    </div>
    

    <!-- 这部分为路由，切换页面会变化 -->
    <router-view />
    <!-- 这部分为路由，切换页面会变化 -->
  </div>
</template>

<style lang="less">
  /* app模块里用的都是宋体,html标签的样式穿透不进来 */
  #app {
    font-family: "EB Garamond", "Noto Serif SC", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 0px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: yellowgreen;
        transition: 1s;
      }
    }
  }
</style>

<script>
  import myheader from "./components/header.vue"
  import myswitch from "./components/switch.vue"
  export default {
    components: {
      myheader,
      myswitch
    },
  }
</script>