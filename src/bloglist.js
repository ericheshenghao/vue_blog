// import Vue from 'vue'
var i = 0;
var storetech={}
const context = require.context("@/assets/tech/", true, /\.md$/);
context.keys().forEach(key => {
const fileName = key.split(".")[1].split("/")[1];
// 新生成一个json数据
storetech[i] = {};
storetech[i].content = fileName;
++i;
});

export const bloglist =Vue.observable(storetech)
export const techlen =Vue.observable(i)

var j = 0;
var storelife={}
const life = require.context("@/assets/life/", true, /\.md$/);
life.keys().forEach(key => {
const fileName = key.split(".")[1].split("/")[1];
// 新生成一个json数据
storelife[j] = {};
storelife[j].content = fileName;
++j;
});
export const lifelist =Vue.observable(storelife)
export const lifelen =Vue.observable(j)

