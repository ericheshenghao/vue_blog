<template>
<div class="footinner">
    <div style="padding-right:10px">© 2017–2019
      <!-- <span style="padding-left: 1px;"></span> -->
    </div>
    <div style="display:flex;justify-content:center">
    <div>Powered by Vue <i class="el-icon-star-on" id="heart" style="text-shadow: 0px 2px 4px rgba(0,0,0,0.12), 0px 0px 6px rgba(0,0,0,0.04);"></i>
 Theme is</div>
    <div class="titleshake" style="padding-left:5px">Mosaic</div>
    </div>
    <div>CC BY-NC-SA 4.0</div>
    </div>
</template>
<style lang="less" scoped>

.footinner{
    padding-top:30px;
    margin-bottom: 3px;
    color:rgb(145, 143, 143);
    font-size: 90%;
}
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