import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import './plugins/element.js'

Vue.config.productionTip = false
document.title="matrix后台管理"
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')