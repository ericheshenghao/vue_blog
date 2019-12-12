<template>
  <div class="main">
    <h1>{{title}}</h1>
    <div
      style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;"
    >
      <h2 style="font-family:Cinzel Decorative;padding-left:7px;">2019</h2>
      <i class="fa fa-bath" style="padding: 15px 7px 0 0;"></i>
    </div>
    <transition-group appear tag="ul" class="list-ul">
      <li style="display:grid" v-for="(item) in list" :key="item.title" class="list-item">
        <router-link :to="`/post/${item.title}`" class="list-item-title">
          <div style="display:flex;justify-content:space-between;">
            <div>{{item.title}}</div>
            <div class="date">{{item.date}}</div>
          </div>
        </router-link>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { techlist } from "@/bloglist";
import { lifelist } from "@/bloglist";
import { taglist } from "@/bloglist";
export default {
  prop: {
    name
  },

  data() {
    return {
      lifelist,
      techlist,
      taglist,
      title: this.$attrs.name,
      list: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      // 这里还能优化一下
      if (this.$attrs.name == "tech") {
        var i = 0;

        var tic = setInterval(() => {
          this.list.push(this.techlist[i]);
          i++;
          if (i == this.techlist.length) {
            clearInterval(tic);
          }
        }, 100);
      }
      if (this.$attrs.name == "life") {
        this.list = this.lifelist;
      }

      this.taglist.map(v => {
        if (v.type == this.title) {
          this.list = v.title;
        }
      });
    }
  }
};
</script>
   
<style lang="less" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
/* 开始动画的时候，动画会移动到原来的位置 执行过度效果*/
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
.main {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.618;
  padding: 2em 1em;
  @media (max-width: 36em) {
    width: auto;
  }
}

.list-ul {
  list-style: none;
  padding: 0;
}
.list-item {
  position: relative;
  transition: border 0.5s;
  border-bottom: 1px dashed;
  border-bottom-color: rgba(0, 0, 0, 0.4);
  margin-top: 1em;
  padding-bottom: 0.5em;
  display: flex;
  align-items: baseline;
}

.list-item ::before {
  content: " ";
  position: absolute;
  left: 0.618em;
  top: 0.8em;
  width: 5.33333333px;
  height: 5.33333333px;
  border-radius: 50%;
  border: 1px solid var(--color-bg);
  transition: background 0.5s;
  font-size: 16px;
  background-color: #b4b4b4;
}
.list-item:hover ::before {
  background: #409eff;
}

.list-item:hover {
  border-bottom-color: #409eff;
}

a {
  text-decoration: none;
  transition: color 0.5s;
}
a:hover {
  color: #409eff;
}

.list-item-title {
  margin: 0 0.618em 0 2em;
  font-size: 1.2em;
  line-height: 1.618;
}

.el-timeline {
  display: inline-table;
}

.v-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter {
  transform: translateY(5px);
  opacity: 0;
}

.el-divider--horizontal {
  margin: 10px 0;
}
.date {
  @media (max-width: 36em) {
    padding-left: 20px;
    font-size: 90%;
  }
}
</style>