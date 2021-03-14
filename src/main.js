import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index'
import store from './store'

import './permission'

Vue.use(ElementUI, {
  // 设置表单默认 size, 局部可覆盖该值
  // size: 'small'
})

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" })
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" })
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg)
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
