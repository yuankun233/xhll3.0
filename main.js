import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';
import { myRequest } from './utils/myrequest1.js'//引入自定义请求文件用于发送ajax
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$myRequest = myRequest//挂载到vue原型上
const app = new Vue({
    ...App
})
app.$mount()
