// import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
import LikeButton from "./components/LikeButton"
import StickBar from "./components/StickBar"
import Back2Top from "./components/Back2Top"
import Comment from "./components/Comment"
// import './registerServiceWorker'
import './plugins/element.js'

import "./shake.scss"
import animated from "animate.css"
// import NavigateBt from "./components/NavigateBt"

Vue.config.productionTip = false
Vue.component("like-button", LikeButton)
Vue.component("back-top",Back2Top)
Vue.component("stick-bar", StickBar)
Vue.component("comment",Comment)
// Vue.use(ElementUI);\

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
Vue.use(animated)

import myMixin from "./mixin"
import "./directive"







new Vue({
  mixins:[myMixin],
  router,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
