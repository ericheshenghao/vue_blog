<template>
<div style="padding-top:30px;margin-bottom: 3px;">
    <div>
      © 2017–2019
      <i class="el-icon-star-on" id="heart"></i>
      <span style="padding-left: 1px;">Mosaic</span>
    </div>
    <div>Powered by Vue | Theme is Mosaic</div>
    <div >CC BY-NC-SA 4.0</div>
    </div>
</template>
<style>
@keyframes heartAnimate {
    0%,100%{transform:scale(1);}
    10%,30%{transform:scale(0.9);}
    20%,40%,60%,80%{transform:scale(1.1);}
    50%,70%{transform:scale(1.1);}
}
#heart {
    animation: heartAnimate 1.33s ease-in-out infinite;
}
.el-icon-star-on {
    color: rgb(255, 113, 168);
}



</style>