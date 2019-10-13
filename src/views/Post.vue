<template>
  <div class="contanier" style="padding-top:0.1em;">
    <div class="main">
      <article class="main-inner">
        <mymarkdown :is="root" style="margin-right:0.4em"></mymarkdown>
        <div style="display: flex;justify-content: space-between;padding-top: 20px;">
          <!-- 左右切换按钮 -->
          <el-button icon="el-icon-caret-left" @click="lastpost" circle></el-button>
          <el-button icon="el-icon-caret-right" @click="nextpost" circle></el-button>
          <!-- 左右切换按钮 -->
        </div>
        <div class="block">
          <el-rate
            v-model="value"
            :colors="colors"
            style="display: flex;justify-content: center;padding-top: 20px;"
          ></el-rate>
          <!-- 可以用来获取一些属性 -->
          <!-- {{$route.params.name}} -->
        </div>
      </article>
    </div>
    <FootInner></FootInner>

    <el-backtop type="text"></el-backtop>
  </div>
</template>
<script>
import FootInner from "@/components/FootInner.vue";

// 代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};
// 代码高亮

const context = require.context("@/assets/tech/", true, /\.md$/);
const moduleStore = {
  FootInner
};

context.keys().forEach(key => {
  // 这个是没有后缀的
  const fileName = key.split(".")[1].split("/")[1];
  // 这个是有后缀的
  const fileModule = context(key).default;
  moduleStore[fileName] = {
    // 可以将这种传播视为逐个提取所有单个属性并将它们传递给新对象。
    ...fileModule,
    namespaced: true
  };
});
export default {
  components: moduleStore,
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  },
  created() {
    var i = 0;
    const context = require.context("@/assets/tech/", true, /\.md$/);
    context.keys().forEach(key => {
      const fileName = key.split(".")[1].split("/")[1];
      // 当前文章的序列号
      if (fileName == this.root) {
        this.index = i;
      }
      // 新生成一个json数据
      this.activities[i] = {};
      this.activities[i].content = fileName;
      ++i;
    });
    // 最大
    this.maxlen = i;
  },
  methods: {
    // 上一篇文章
    nextpost() {
      if (this.index < this.maxlen - 1) {
        ++this.index;
        if (this.index < this.maxlen) {
          this.root = this.activities[this.index].content;
        }
      } else {
        this.$message("后面没有了，兄弟");
      }
    },
    // 下一篇文章
    lastpost() {
      if (this.index > 0) {
        if (this.index > 0) {
          --this.index;
          this.root = this.activities[this.index].content;
        }
      } else {
        this.$message("前面没有了，兄弟");
      }
    }
  },
  data() {
    return {
      // 用来切换组件的数据
      root: this.$route.params.name,
      // 文章的序列号
      index: "",
      // 最大文章的序列号
      maxlen: "",
      activities: {},
      //   打分小星星的数据
      value: 0,
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  }
};
</script>
<style lang="less" scoped>


.main {
  padding: 2em 1em;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.main-inner {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.618;
  @media (max-width: 38em) {
    width: auto;
  }
  
}



.el-button {
  border: 0px solid white;
}
</style>