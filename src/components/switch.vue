<template>
  <main>
    <section style="padding-top:0.6em;padding-right:1em;float: right;">
      <div class="toggle-btn" id="_1st-toggle-btn">
        <input type="checkbox" v-on:click="sendmsg"/>
        <span></span>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    sendmsg(){
      this.theme=!this.theme
        this.$emit('getMsg',this.theme)
       
    }
  },
  data() {
    return {
      theme: false
    };
  }
};
</script>

<style lang="less" scoped>
.toggle-btn {
  position: relative;
  width: 35px;
  height: 17.5px;
  margin: 0 auto;
  border-radius: 40px;
}

input[type="checkbox"] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: 0px;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

/* First toggle btn */

#_1st-toggle-btn span {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  overflow: hidden;
  opacity: 1;
  background-color: #fff;
  box-shadow: 0px 2px 25px #d9d9d9;
  border-radius: 40px;
  transition: 0.2s ease background-color, 0.2s ease opacity;
}

#_1st-toggle-btn span:before,
#_1st-toggle-btn span:after {
  content: "";
  position: absolute;
  top: 2.5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: 0.5s ease transform, 0.2s ease background-color;
  left: 21px;
}

#_1st-toggle-btn span:before {
  background-color: #fff;
  transform: translate(-6px, -4px);
  z-index: 1;
}

#_1st-toggle-btn span:after {
  background-color: #000;
  transform: translate(-18px, 0px);
  z-index: 0;
}

#_1st-toggle-btn input[type="checkbox"]:checked + span {
  background-color: #000;
}

#_1st-toggle-btn input[type="checkbox"]:active + span {
  opacity: 0.5;
}

#_1st-toggle-btn input[type="checkbox"]:checked + span:before {
  background-color: #000;
  transform: translate(-6px, -3px);
}

#_1st-toggle-btn input[type="checkbox"]:checked + span:after {
  background-color: #fff;
  transform: translate(-2px, 0px);
}
</style>