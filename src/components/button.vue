<template>
<div style="padding:30vw;display:flex;flex-direction:rows;justify-content:space-between;">
  <div class="circle-loading">20%</div>
  <div class="bubble-loading">20%</div>
  <div class="floating-btn"></div>
</div>
</template>
<style lang="less" scoped>
// 第一个
.circle-loading{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid rgb(184,187,191);
  border-radius: 100%;
  width:40px;
  height:40px;
  font-size: 12px;
  font-weight: bold;
  color:rgb(172,28,177);
  box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2),
  inset 0 1px 2px 1px rgba(0,0,0,0.2);  //内部阴影
  &::before{
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -24px;
    margin-top: -24px;
    display: block; 
    border: 4px solid transparent;
    border-top-color: rgb(172,28,191);
    border-radius: 100%;
    width: 40px;
    height: 40px;
    animation: rotate1 infinite 2s ease;
  }
}
@keyframes rotate1{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
// 第二个
.bubble-loading{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background-image: linear-gradient(45deg,rgb(14,14,46),rgb(64,64,113));
  font-size: 12px;
  font-weight: bold;
  color: white;
  box-shadow: 0 3px 2px 1px rgba(0, 0, 0, 0.2);
  }
  .bubble-loading::before,
  .bubble-loading::after{
    content: "";
    position: absolute;
    left:50%;
    top: 50%;
    margin-top: -20px;
    margin-left: -20px;
    width: 40px;
    height:40px;
    background:rgb(51, 149, 230);
    border-radius: 100%;
    z-index: -1;
    transform: translateY(-2px)
  }
.bubble-loading::before{
  animation: rotate2 infinite 2s linear;
}
.bubble-loading::after{
  animation: rotate2 infinite 2s linear;
}
@keyframes rotate2{
  0%{
    transform: rotate(0deg) translateY(-2px)
  }
  100%{
    transform: rotate(360deg) translateY(-2px);
  }
}
// 第三个
.floating-btn{
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background-image: linear-gradient(45deg,#52ffaf,#2196f3);
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.2)
}
.floating-btn::before,
.floating-btn::after{
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  display: block;
  margin-left: -9px;
  border-radius: 3px;
  width: 18px;
  height:3px;
  background-color: white;
  transition: all 0.2s ease;
}
.floating-btn::before{
   transform: translateY(12px);
   filter: drop-shadow(0 6px 0 white)
}
.floating-btn::after{
   transform: translateY(24px);
}
.floating-btn:hover::before{
  filter: none;
  transform: translateY(18px) rotate(-45deg);
}
.floating-btn:hover::after{
  transform: translateY(18px) rotate(45deg);
}
</style>