<template>
    <div id="nav" style="margin-top:5em;">
      <router-link to="/" style="text-decoration: none;">首页</router-link>
      <el-divider direction="vertical"></el-divider>
<router-link to="/about" style="text-decoration: none;">About</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>
<style lang="less" scoped>
 #nav {
    padding: 0px;

    a {
      font-weight: bold;
      &.router-link-exact-active {
        color: yellowgreen;
        transition: 1s;
      }
    }
  }
  .el-divider--vertical{
    margin-bottom: 0.2em;
    height:15px;;
  }
</style>