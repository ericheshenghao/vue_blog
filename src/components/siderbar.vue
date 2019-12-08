<template>
  <div>
    <el-tooltip
      class="item"
      effect="light"
      content="Send me your message📧"
      placement="bottom-start"
      
    >
      <el-button
        @click="drawer = true"
        type="text"
        icon="el-icon-message"
        style="position:absolute;margin-left: 16px;float: left;left:0;"
      ></el-button>
    </el-tooltip>
    <el-drawer
      title
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      size="15em"
      style="text-align:center;font-family:Noto Serif SC,serif,Dancing Script, EB Garamond;"
    >
    
      <span v-on="{mouseover:mouseover,mouseout:mouseout}">
        <el-avatar
          id="avatar"
          src="https://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/13/d343e86c57ffdf6fad37aabc4b707579.jpg"
        ></el-avatar>
      </span>
      <br />

      

      <div
        style="line-height:2em;display:flex;justify-content:center;padding-top:0.5em;flex-direction:column;"
      >
        
        <div>何先森</div>
        
        
        
      </div>
      <div class="iconlist">
        <a href="#">
          <i class="fa fa-weixin"></i>
        </a>
        <a href="https://github.com/ericheshenghao?tab=repositories">
          <i class="fa fa-github-alt"></i>
        </a>
        <a href="https://wpa.qq.com/msgrd?v=3&uin=943452349&site=qq&menu=yes">
          <i class="fa fa-qq"></i>
        </a>
        <a href="https://weibo.com/5496460358/profile?rightmod=1&wvr=6&mod=personinfo&is_all=1">
          <i class="fa fa-weibo"></i>
        </a>
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
      var s = document.getElementById("avatar");
      s.style.transform = "rotate(180deg)";
      s.style.transition = "1s";
    },
    mouseout() {
      document.getElementById("avatar").style.transform = "rotate(0deg)";
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
rgb(241, 227, 243)
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
  box-shadow: 0 2px 4px #005cbc, 0 0 6px #ff4949;
}
.iconlist {
 
  font-size: 17px;
  > a:hover {
    color: white;
    text-shadow: 0 2px 4px #005cbc, 0 0 6px #ff4949;
  }
  > a {
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 5px;
    transition: all 0.5s ease;
  }
}
</style>