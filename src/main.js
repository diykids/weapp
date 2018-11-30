import Vue from 'vue'
import App from './App'
import store from './store/index'

Vue.prototype.$store = store

import '../static/icon/iconfont.css'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
