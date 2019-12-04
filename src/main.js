// import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
import LikeButton from "./components/LikeButton"

// import './registerServiceWorker'
import './plugins/element.js'

import "./shake.scss"

import NavigateBt from "./components/NavigateBt"
Vue.config.productionTip = false
Vue.component("like-button",LikeButton)
Vue.component("nav-button",NavigateBt)
// Vue.use(ElementUI);\

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})



new Vue({
  router,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
