<template>
  <div class="about" style="padding:2em 0 0 0">
    <div > 
      <h1>Tag</h1>
      
    <span v-for="(item,index) in taglist" :key="index">
      <el-badge :value="taglen(item)" class="item" type="primary" style="margin-left:12px;margin-right:12px;">
        <el-button size="small" @click="tolist(item.type)">{{item.type==""?"review":item.type}}</el-button>
      </el-badge>
    </span>
    </div>
  </div>
</template>
<script>
import { taglist } from "../bloglist";
export default {
  data(){
    return {
      taglist: taglist
    };
  },
  computed:{
  },
  methods: {
    tolist(type) {
      this.$router.push(`bloglist/${type}`)
    },
    taglen(item){
      return item.title.length
    }
  }
};
</script>
<style lang="less" >
.item {
  margin-top: 10px;

}
.about sup {
    right: 10px !important;
    height: 17px !important;
}
.about{
    margin: 0 auto;
    width: 40%;
  @media (max-width: 36em) {
    width: auto;
  }
}
</style>