<template>
  <div id="drag">
    <div v-drag :class="show?'menu expanded':'menu close'">
      <div :class="show?'container expanded':'container close'" @click="showBtn($event)">
        <div :class="show?'toggle close':'toggle expanded'"></div>
      </div>
      <span :class="show?'':'hidden'">
        <router-link to="/">Home</router-link>
      </span>
      <span :class="show?'':'hidden'">
        <router-link to="/about">About</router-link>
      </span>
      <span :class="show?'':'hidden'">
        <router-link to="/taglist">taglist</router-link>
      </span>
      <span :class="show?'':'hidden'">
        <a @click="$router.go(1)">force</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      open: false
    };
  },
  created() {},
  methods: {
    showBtn(e) {
      this.show = !this.show;
    }
  },
  fetch() {}
};
</script>

<style scoped lang="scss">
$width: 40px;
$height: 40px;
#drag {
  width: $width;
  height: $height;
  position: absolute;
  top: 73%;
  position: fixed;
}
body:before {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50%;
  background: #d84315;
  content: "";
}
body .menu {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: $height;
  width: $width;
  padding: 1px 5px 1px 2.5px;
  border-radius: 0.2 * $width;
  background: #ffffff;
  box-shadow: 0 4px 64px rgba(0, 0, 0, 0.15);
  transition: 1.3s cubic-bezier(0.53, 0, 0.15, 1.3);
  z-index: 2;
  span {
    white-space: nowrap;
    visibility: visible;
    opacity: 1;
    transition: 0.3s;
    transform: rotateY(0deg);
    &.hidden {
      width: 0;
      visibility: hidden;
      opacity: 0;
      transform: rotateY(90deg);
      &:nth-of-type(1) {
        transition-delay: 0.3s;
      }
      &:nth-of-type(2) {
        transition-delay: 0.2s;
      }
      &:nth-of-type(3) {
        transition-delay: 0.1s;
      }
      &:nth-of-type(4) {
        transition-delay: 0s;
      }
    }
    &:nth-of-type(1) {
      transition-delay: 0.4s;
    }
    &:nth-of-type(2) {
      transition-delay: 0.5s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.6s;
    }
    &:nth-of-type(4) {
      transition-delay: 0.7s;
    }
  }
  &.expanded {
    height: $height * 1.2;
    width: 10 * $width;
  }
  a {
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    color: #333333;
    padding: 5px;
    transition: 0.3s;
    &:hover {
      color: #d84315;
    }
  }
}

body .container {
  order: 1;
  width: 20px;
  height: 24px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover .toggle:before {
    top: -9px;
  }
  &:hover .toggle:after {
    bottom: -7px;
  }
  .toggle {
    position: relative;
    width: 100%;
    height: 2px;
    background: #aaaaaa;
    &:before {
      position: relative;
      display: flex;
      top: -7px;
      height: 2px;
      width: 100%;
      background: #aaaaaa;
      content: "";
      transition: top 0.25s ease, bottom 0.25s ease, transform 0.5s ease;
    }
    &:after {
      position: relative;
      display: flex;
      bottom: -5px;
      height: 2px;
      width: 100%;
      background: #aaaaaa;
      content: "";
      transition: top 0.25s ease, bottom 0.25s ease, transform 0.25s ease;
    }

    &.close {
      height: 0;
      &:before {
        transform: rotate(45deg);
        top: 0;
      }
      &:after {
        transform: rotate(-45deg);
        bottom: 2px;
      }
    }
  }
}

@keyframes respiration {
  0% {
    min-height: 100vh;
    border: 0vh solid #ffffff;
  }
  75% {
    min-height: 95vh;
    border: 2.5vh solid #ffffff;
  }
  100% {
    min-height: 100vh;
    border: 0vh solid #ffffff;
  }
}
</style>