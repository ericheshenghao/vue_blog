<template>
  <div>
    <div class="Btleft">
      <button type="primary animated pulse" @click="leftclick">
        <i class="el-icon-arrow-left"></i>
      </button>
    </div>
    <div class="Btright">
      <button type="primary" @click="rightclick">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    rightclick() {
      this.$router.go(1);
    },
    leftclick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style  lang="scss" scoped>
div .Btleft {
  display: flex;
  position: fixed;
  left: 3%;
  top: 47%;
  button {
    height: 40px;
    width: 40px;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: transparent;
    color: transparent;
    // transition: 0.5s;
    &:hover {
      color: rgb(59, 137, 255);
      background-color: white;
      border: 1px solid rgb(216, 216, 216);
    }
    &:focus {
      outline-width: 0;
    }
  }
}

div .Btright {
  position: fixed;
  right: 3%;
  top: 47%;
  button {
    height: 40px;
    width: 40px;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: transparent;
    color: transparent;
    transition: 0.5s;
    &:hover {
      color: rgb(59, 137, 255);
      background-color: white;
      border: 1px solid rgb(216, 216, 216);
    }
    &:focus {
      outline-width: 0;
    }
  }
}
</style>