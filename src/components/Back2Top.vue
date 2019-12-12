<template>
  <button id="backbt" class="backtop" @click="btnTop">
    <i class="fa fa-angle-double-up"></i>
  </button>
</template>

<script>
export default {
  methods: {
    btnTop() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="less" scoped>

.backtop { 
  position: fixed;
  width: 42px;
  height: 42px;
  top: 92%;
  right: 2%;
  font-size: 18px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: transparent;

  &:hover {
    // cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>