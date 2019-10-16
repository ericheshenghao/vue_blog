<template>
  <div>
    <el-tooltip class="item" effect="light" content="Send me your message📧" placement="bottom-start">
      <el-button @click="drawer = true" type="text" icon="el-icon-message"
        style="position:absolute;margin-left: 16px;float: left;left:0;"></el-button>
    </el-tooltip>
    <el-drawer title="Myblog" :show-close="false" :visible.sync="drawer" :direction="direction" size="15em"
      style="text-align:center;font-family:Dancing Script, serif;">
      <span v-on="{mouseover:mouseover,mouseout:mouseout}">
        <el-avatar id="avatar"
          src="http://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/13/d343e86c57ffdf6fad37aabc4b707579.jpg">
        </el-avatar>
      </span>
      <br />
      <div style="display:flex;justify-content:center;padding-top:2em;">
        <div>保持清醒，保持愚钝。</div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: "ltr"
      };
    },
    methods: {
      mouseover() {
        var s=document.getElementById("avatar")
        s.style.transform="rotate(180deg)";
        s.style.transition="1s";
      },
      mouseout(){
        document.getElementById("avatar").style.transform="rotate(0deg)";
      }
    }
  };
</script>
<style lang="less" scoped>
  .el-button--info {
    color: black;
    background-color: white;
    border-color: white;
  }

  .el-button--info:focus,
  .el-button--info:hover {
    color: #409eff;
    background-color: white;
    border-color: white;
  }

  .el-button--info:focus,
  .el-button--info:hover {
    background-color: white;
    border-color: white;
  }

  .el-avatar {
    width: 80px;
    height: 80px;
  }
</style>