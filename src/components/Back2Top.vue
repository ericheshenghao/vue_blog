<template>
  <button id="backbt" class="backtop" @click="btnTop">
    <i class="fa fa-angle-double-up"></i>
  </button>
</template>

<script>
export default {
  methods: {
    btnTop() {
      $("html,body").animate({ scrollTop: "0px" }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>

.backtop {
  //   display: none;
  text-align: center;
  position: fixed;
  width: 42px;
  height: 42px;
  top: 92%;
  right: 2%;
  font-size: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: transparent;
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>