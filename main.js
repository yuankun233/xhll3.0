import Vue from 'vue'
import App from './App'

import uView from 'uview-ui';
//引入自定义请求文件用于发送ajax
import { myRequest1 } from './utils/myrequest1.js'//莫灵枫の3.0app接口
import { myRequest2 } from './utils/myrequest2.js'//王博鑫の3.0app接口

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$myRequest1 = myRequest1//挂载到vue原型上
Vue.prototype.$myRequest2 = myRequest2//挂载到vue原型上
const app = new Vue({
    ...App
})
app.$mount()
