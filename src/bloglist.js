// import Vue from 'vue'
import FootInner from "./components/FootInner"
var i = 0;
var storetech = {}
const moduleStore = {
    FootInner
  };
const context = require.context("@/assets/tech/", true, /\.md$/);
context.keys().forEach(key => {
    var index = key.lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]

    storetech[i] = {};
    storetech[i].content = fileName;
    ++i;

    const fileModule = context(key).default;
    moduleStore[fileName] = {
        ...fileModule,
        namespaced: true
      };
});

export const bloglist = Vue.observable(storetech)
export const techlen = Vue.observable(i)

var j = 0;
var storelife = {}
const life = require.context("@/assets/life/", true, /\.md$/);
life.keys().forEach(key => {
    var index = key.lastIndexOf(".");
    const fileName = key.substring(0, index).split("/")[1]
    storelife[j] = {};
    storelife[j].content = fileName;
    ++j;

    const fileModule = life(key).default;
    moduleStore[fileName] = {
      ...fileModule,
      namespaced: true
    };
});


export default  moduleStore
export const lifelist = Vue.observable(storelife)
export const lifelen = Vue.observable(j)

