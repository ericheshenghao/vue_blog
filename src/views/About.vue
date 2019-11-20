<template>
  <div class="about" style="padding:2em 0 0 0;">

    <h1>About</h1>
   
  <h2>Nothing</h2>
  </div>
</template>
<script>
export default {
};
</script>
<style lang="less" scoped>
video {
  width: 10em;
  margin: 1em 0 0 0;
  transition: all 0.8s ease;
  border-radius: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 6px rgba(0, 0, 0, 0.05);
  &:hover {
    transform: translate3d(0px, 2px, 10px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 0 6px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    outline: none;
  }
}
</style>