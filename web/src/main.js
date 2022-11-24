import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

import './style.scss'

import day from 'dayjs'
Vue.prototype.dayjs = day

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { Pagination } from 'swiper'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL: 'http://localhost:3000/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
