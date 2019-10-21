<template>
  <div class="home">
    <myheadlink></myheadlink>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h3>
      "Then wear the gold hat, if that will move her
      <br />If you can bounce high, bounce for her too
      <br />Till she cry "Lover, gold-hatted, high-bouncing lover
      <br />I must have you!"
    </h3>
    <h6>--THOMAS PARKE D'INVILLIERS</h6>

    <HomeLink style="margin-top:5em" ></HomeLink>
    
  </div>
</template>

<style scoped>



h3 {
  line-height: 50px;
  font-weight: normal;
}

h6 {
  display: flex;
  justify-content: center;
  padding-left: 20em;
  margin-top: 4em;
}
.home{
  padding-top:0.1em;
}
</style>

<script>
// @ is an alias to /src
import HomeLink from "@/components/HomeLink.vue";
import myheadlink from "@/components/HeadLink.vue";
export default {
  
  components: {
    myheadlink,
    HomeLink,
  }
};
</script>