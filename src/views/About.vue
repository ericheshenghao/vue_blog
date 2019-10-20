<template>
  <div class="about" style="padding-top:0.1em;">
    <myheadlink></myheadlink>
    <div>
      <video
        controls
        name="media"
        title="young_programmers38_69838834_180114553017027_5571206338239341914_n"
        width="935"
      >
        <source
          src="http://eric-sheng-1300164148.cos.ap-guangzhou.myqcloud.com/2019/10/19/0ca3d57a28295abadab4c79387634bb7.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  </div>
</template>
<script>
import myheadlink from "@/components/HeadLink.vue";
export default {
  components: {
    myheadlink
  }
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