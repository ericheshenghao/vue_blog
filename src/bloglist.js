import Vue from 'vue'
var i = 0;
var store={}
const context = require.context("@/assets/tech/", true, /\.md$/);
context.keys().forEach(key => {
const fileName = key.split(".")[1].split("/")[1];
// 新生成一个json数据
store[i] = {};
store[i].content = fileName;
++i;
});
// 最大
export const bloglist =Vue.observable(store)
