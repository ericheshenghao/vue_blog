<template>
  <el-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949"
    :validate-event="false"
    style="padding-top:1em;padding-right:2em;float: right;"
  ></el-switch>
</template>
<script>
export default {
  data() {
    return {
      activeColor: "red",
      fontSize: 30,
      value: true
    };
  }
};
</script>
<style lang="less" scoped>
</style>