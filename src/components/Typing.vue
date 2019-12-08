<template>
  <div>
    <div class="message" id="target">Your message will be typed out here!</div>
    <!-- <button onClick="rerun()">Rerun</button -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: `Machines can measure things a user will never notice`,
      
    };
  },
  mounted() {
    this.main();
  },

  methods: {


    main() {
      this.n= 0
      const container = document.querySelector("#target");
      container.textContent = "";

      if (typeof this.message[this.n] != "undefined") {
        container.textContent += this.message[this.n];
      }

      this.n++;
      var id = setInterval(() => {
        setTimeout(() => {
          this.n++;
          if (typeof this.message[this.n] != "undefined") {
            container.textContent += this.message[this.n];
          }
        }, interval(this.message[this.n - 1]));
        if (typeof this.message[this.n] == "undefined") {
          clearInterval(id);
        }
      }, 100);

      function interval(letter) {
        
        if (letter == "undefined") {
          clearInterval;
        }
        if (letter == ";" || letter == "." || letter == ",") {
          return Math.floor(Math.random() * 500 + 500);
        } else {
          return Math.floor(Math.random() * 130 + 100);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  width: 100%;
  max-width: 30em;
  white-space: pre-line;
}

.message:after {
  content: "|";
  -webkit-animation: cursor 1s linear infinite;
  animation: cursor 1s linear infinite;
}



@-webkit-keyframes cursor {
  0% {
    opacity: 0;
  }
  49.9% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  99.9% {
    opacity: 1;
  }
}

@keyframes cursor {
  0% {
    opacity: 0;
  }
  49.9% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  99.9% {
    opacity: 1;
  }
}
</style>