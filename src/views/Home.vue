<template>
  <div class="home">

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <h3>"Then wear the gold hat, if that will move her<br>
      If you can bounce high, bounce for her too<br>
      Till she cry "Lover, gold-hatted, high-bouncing lover<br>
      I must have you!"</h3>
    <h6>--THOMAS PARKE D'INVILLIERS</h6>

    
    
    <myfooter style="margin-top:8em"></myfooter>

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
</style>

<script>
  // @ is an alias to /src
  import myfooter from '@/components/myfooter.vue'

  export default {
    name: 'home',
    components: {
      myfooter
    }
  }
</script>