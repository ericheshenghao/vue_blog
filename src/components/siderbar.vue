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
        style="position:absolute;margin-left: 16px;"
      ></el-button>
    </el-tooltip>
    <el-drawer
      title="何先森"
      :show-close="false"
      :visible.sync="drawer"
      :direction="direction"
      size="15em"
      style="text-align:center;"
    >
      <!-- <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>-->
      <span>
        <el-avatar
          src="http://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/13/d343e86c57ffdf6fad37aabc4b707579.jpg"
        ></el-avatar>
      </span>
      <br />
      <span style="line-height: 4em;;">If you want me,I want you.</span>
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
  methods: {}
};
</script>
<style lang="less" scoped>
div {
  float: left;
}

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