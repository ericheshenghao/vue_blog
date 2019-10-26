<template>
  <div class="main">
    <h1 >Life</h1>
    <div style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;">
    <h2 style="font-family:Cinzel Decorative;padding-left:7px;">2019</h2>
    <i class="fa fa-quote-right" style="padding: 15px 7px 0 0;"></i>
    </div> 
    <ul class="list-ul">
      <li v-for="(blog) in lifelist" :key="blog.timestamp" class="list-item">
        <router-link
          :to="{name:'post',params:{name:blog.content,list:life}}"
          class="list-item-title"
        >{{blog.content}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {lifelist} from "@/bloglist";

export default {
  created() {
  },
  data() {
    return {
      lifelist,
      life:"life"
    };
  }
};
</script>
   
<style lang="less" scoped>
.main {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.618;
  padding:2em 1em;
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
  border-bottom-color:rgba(0, 0, 0, 0.4);
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
</style>