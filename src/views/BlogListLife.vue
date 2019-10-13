<template>
  <div class="mainlist" >
    <h1 style="padding-top:2em">Life</h1>
    <h2 style="margin-top:3em;font-family:Cinzel Decorative;padding-left:7px;">2019</h2>
    <ul  class="list-ul ">
        
        <li
          v-for="(activity) in activities"
          :key="activity.timestamp"
          class="list-item"
        >
        
          <router-link 
            :to="{name:'post',params:{name:activity.content}}"
            class="list-item-title"
          >{{activity.content}}
        </router-link>
      
    </li>
  </ul>  
  </div>
</template>



<script>
export default {
  created(){
    var i=0
    const context = require.context("@/assets/life/", true, /\.md$/);
    context.keys().forEach(key => {
      const fileName = key.split(".")[1].split("/")[1];
      this.activities[i]={}
      this.activities[i].content=fileName;
      ++i;
    })
  },
  data() {
    return {
      activities:{}
    };
  }
};
</script>
   
<style lang="less" scoped>

.mainlist {
  text-align: justify;
  width: 36em;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.618;
  
}


@media (max-width: 36em) {
  .mainlist{
    width: auto;
  }
}

.list-ul{
  list-style:none;
  padding: 0;
  
}
.list-item {

  position: relative;
  transition: border .5s;
  border-bottom: 1px dashed ;
  margin-top: 1em;
  padding-bottom: 0.5em;
  display: flex;
  align-items: baseline
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
  transition: background .5s;
  font-size: 16px
}
.list-item:hover ::before {
  background:  #409EFF;
}


.list-item:hover {
  border-bottom-color: #409EFF;
}


a {
  text-decoration: none;
  transition: color .5s
}
a:hover{
  color: #409EFF;
}


.list-item-title {
  margin: 0 0.618em 0 2em;
  font-size: 1.2em;
  line-height: 1.618
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