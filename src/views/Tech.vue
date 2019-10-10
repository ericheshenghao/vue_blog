<template>
     <div><article><my-markdown ></my-markdown></article></div>
</template>
<script>
import myMarkdown from '@/assets/tech/如何优雅的书写-持续更新.md';
export default {
 components: {
  myMarkdown
 }
}
</script>
<style lang="less" scoped>
article{
text-align: left;
width: 36.18em;
margin: 0 auto;
font: size 16px;
line-height: 1.618;
padding:2em 1em;
}
div{
    padding:50px;
}
</style>