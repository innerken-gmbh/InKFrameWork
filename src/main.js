// =========================================================
// * Vuetify Material Dashboard PRO - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import './plugins/vue-world-map'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VCalendar from 'v-calendar'

Vue.config.productionTip = true

router.beforeEach((to, from, next) => {
// 查看是否登陆
//   console.log('from' + from.path)
//   console.log('to' + to.path)
//   console.log(!to.path.includes('/pages'), store.state.currentDeviceId)
  const authPath = !to.path.includes('/pages')
  if (store.state.currentDeviceId === -1 && authPath) {
    // 没登录的做处理
    next({
      path: '/pages/login',
    })
  } else {
    next()
  }
})

Vue.use(VCalendar, {
  componentPrefix: 'vc',
})
// const SavedDeviceId = isNaN(Cookies.get('DeviceId')) ? -1 : Cookies.get('DeviceId')
// // console.log(SavedDeviceId)
// if (SavedDeviceId !== null) {
//   store.commit('SAVE_CURRENT_DEVICE', parseInt(SavedDeviceId))
// }
// initial(store.state.url)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
