<template>
  <div class="about" style="margin-top:5em">
    <div > 
      <h1>Tag</h1>
      
    <block v-for="(item,index) in taglist" :key="index">
      <el-badge :value="2" class="item" type="message" style="margin-left:12px;margin-right:12px;">
        <el-button size="small" @click="tolist(item.type)">{{item.type==""?"review":item.type}}</el-button>
      </el-badge>
    </block>
    </div>
  </div>
</template>
<script>
import { taglist } from "../bloglist";
export default {
  data() {
    return {
      taglist: taglist
    };
  },
  computed(){
    length:{

    }
  },
  methods: {
    tolist(type) {
      this.$router.push(`bloglist/${type}`)
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