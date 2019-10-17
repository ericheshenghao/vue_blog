<template>
  <div>
    <div style="padding-top:50px;">
      <router-link to="/lifelist">
      
          <el-badge :value='lifelen' class="item1" type="primary">
            <el-button size="small" type="text" style="font-size:15px;font-family:Dancing Script, serif">Life</el-button>
          </el-badge>

      </router-link>

      <router-link to="/techlist">
       
        <el-badge :value='techlen' class="item2">
          <el-button size="small" type="text" style="margin-top:2px;font-size:15px;font-family:Dancing Script, serif">Tech</el-button>
        </el-badge>

      </router-link>
    </div>
    
  </div>
</template>
<style lang="less" scoped>
div a {
  padding-right: 30px;
  padding-left: 30px;
}
div a div button {
  border: 0px ;
}

</style>
<script>
import {techlen,lifelen} from "@/bloglist"
export default {
created() {
  },
  data(){
    return{
      techlen,
      lifelen,
    }
  },
}
</script>