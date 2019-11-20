// import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui';
import LikeButton from "./components/LikeButton"

// import './registerServiceWorker'
import './plugins/element.js'

import "./shake.scss"
Vue.config.productionTip = false
Vue.component("like-button",LikeButton)
// Vue.use(ElementUI);




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
