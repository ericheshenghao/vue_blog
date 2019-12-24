<template>
  <button  id="backbt" class="backtop " @click="btnTop">
    <i class="fa fa-angle-double-up"></i>
  </button>
</template>

<script>
export default {
  data(){
      return{
       
      }
    },
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
  bottom: 29px;
  right: 2%;
  font-size: 18px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: transparent;
  z-index: 1;
  @media (max-width: 36em) {
  //   width: 35px;
  // height: 35px;
  // bottom: 32.5px;
  // right: 3%;
 display: none;
  }
  &:hover {
    // cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}
</style>