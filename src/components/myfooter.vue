<template>
  <div>
    <div>
      <router-link to="/Life">
        <el-tooltip class="item" effect="light" content="Your life should be mine😄" placement="top-end">
          <el-badge :value="4" class="item1" type="primary">
            <el-button size="small" @click="open2">Life</el-button>
          </el-badge>
        </el-tooltip>
      </router-link>

      <router-link to="/Tech">
       <el-tooltip class="item" effect="light" content="🔑Tech is every thing!" placement="top-start">
        <el-badge :value="6" class="item2">
          <el-button size="small" :plain="true" @click="open1" >Tech</el-button>
        </el-badge>
        </el-tooltip>
      </router-link>
    </div>
    <div>
      © 2017–2019
      <i class="el-icon-star-on" style="padding-top:40px"></i>Mosaic
    </div>
    <div>Powered by Vue | Theme is Mosaic</div>
    <div>CC BY-NC-SA 4.0</div>
  </div>
</template>
<style lang="less" scoped>
div a {
  padding-right: 20px;
  padding-left: 20px;
}
div a div button {
  border: 0px;
}
</style>
<script>
export default {
    methods:{
        open1() {
        this.$notify({
          title: 'Tech',
          message: '',
          type: 'success',
          position: 'bottom-right'
        });

      },
      open2() {
        this.$notify.info({
          title: 'Life',
          message: '',
          type: 'success',
          position: 'bottom-left'
        });

      },
    }
}
</script>