<template>
  <div class="contanier" style="padding-top:0.1em;">
    <div class="main">
      <article class="main-inner">
        <mymarkdown :is="root" ></mymarkdown>
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
import {bloglist} from "@/bloglist"
import mediumZoom from 'medium-zoom'
// 代码高亮
import hljs from "highlight.js";
import jquery from "jquery";
import "highlight.js/styles/tomorrow-night-eighties.css";
const highlightCode = () => {
  const preEl = document.querySelectorAll("pre code");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};



// 代码高亮
//批量注册
const context = require.context("@/assets/tech/", true, /\.md$/);
const moduleStore = {
  FootInner
};
  context.keys().forEach(key => {
  const fileName = key.split(".")[1].split("/")[1];
  const fileModule = context(key).default;
  moduleStore[fileName] = {
    // 可以将这种传播视为逐个提取所有单个属性并将它们传递给新对象。
    ...fileModule,
    namespaced: true
  };
});
//批量注册
export default {
  components: moduleStore,

  mounted() {
    highlightCode();
    mediumZoom(document.querySelectorAll('img'))
    jquery("pre code").each(function(){
    jquery(this).html("<ul><li>" + jquery(this).html().replace(/\n/g,"</li><li>") +"\n</li></ul>");
});

  },
  updated() {
    highlightCode();
    mediumZoom(document.querySelectorAll('img'))
    jquery("pre code").each(function(){
    jquery(this).html("<ul><li>" + jquery(this).html().replace(/\n/g,"</li><li>") +"\n</li></ul>");
});
  },
  created() {
    //遍历对象
    for(var i in bloglist){
      if (bloglist[i].content == this.root) {
        this.index = i;
      }
      ++i
    }
    // 最大
    this.maxlen = i;
  },
  methods: {
    // 上一篇文章
    nextpost() {
      if (this.index < this.maxlen - 1) {
        ++this.index;
        if (this.index < this.maxlen) {
          this.root = bloglist[this.index].content;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      } else {
        this.$notify.info({
          title: '贴心提示',
          message: '再点也没有了🍭'
        });

      }
    },
    // 下一篇文章
    lastpost() {
      if (this.index > 0) {
        if (this.index > 0) {
          --this.index;
          this.root = bloglist[this.index].content;
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      } else {
        this.$notify.info({
          title: '贴心提示',
          message: '前面没有了🍬'
        });

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
      bloglist,
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