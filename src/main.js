import Vue from 'vue'
import axios from "./api/index"
import './assets/css/app.css' //公共css
import 'amfe-flexible'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vconsole from 'vconsole'
const vConsole = new Vconsole()
Vue.use(vConsole)
//vant按需加载组件
import {
  Button,NavBar
} from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
