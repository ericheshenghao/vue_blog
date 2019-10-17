<template>
  <div
    id="header"
    style="height:15vh;flex-direction: row;display:flex;align-items: center;justify-content: center;"
  >
    <router-link to="/" style="text-decoration-line: none">
      <div class="brand">Mosaic</div>
    </router-link>
    <i class="el-icon-chat-dot-round" style="color:white;"></i>
  </div>
</template>
<style lang="less" scoped>
#header {
  position: relative;
  background-image: linear-gradient(
    90deg,
    rgb(247, 149, 51) 0px,
    rgb(243, 112, 85) 15%,
    rgb(239, 78, 123) 30%,
    rgb(161, 102, 171) 44%,
    rgb(80, 115, 184) 58%,
    rgb(16, 152, 173) 72%,
    rgb(7, 179, 155) 86%,
    rgb(109, 186, 130) 100%
  );
}
.brand {
  color: white;
  font-size: 60px;
  letter-spacing: 20px;
  padding-left:39px;
  font-family: "Dancing Script", serif;
}
a {
  text-decoration: none;
}
</style>