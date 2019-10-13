<template>
  <div>
    <div style="padding-top:50px;">
      <router-link to="/lifelist">
      
          <el-badge :value='lifelen' class="item1" type="primary">
            <el-button size="small" :plain="true" style="font-size:15px;font-family:Dancing Script, serif">Life</el-button>
          </el-badge>

      </router-link>

      <router-link to="/techlist">
       
        <el-badge :value='techlen' class="item2">
          <el-button size="small" :plain="true" style="margin-top:2px;font-size:15px;font-family:Dancing Script, serif">Tech</el-button>
        </el-badge>

      </router-link>
    </div>
    
  </div>
</template>
<style lang="less" scoped>
div a {
  padding-right: 20px;
  padding-left: 20px;
}
div a div button {
  border: 0px ;
}
</style>
<script>
export default {
created() {
    var i = 0;
    var techtext = require.context("@/assets/tech/", true, /\.md$/);
    techtext.keys().forEach(() => {
      this.techlen = ++i;
    });
     var j = 0;
    var lifetext = require.context("@/assets/life/", true, /\.md$/);
    lifetext.keys().forEach(() => {
      this.lifelen = ++j;
    });
  },
  data(){
    return{
      techlen: '',
      lifelen: '',
    }
  },
}
</script>