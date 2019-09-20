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
//hilink sdk公共函数
import hilink from './hilink/index'
Vue.use(hilink);
//vant按需加载组件
import {
  Button,NavBar,Slider,Toast,DatetimePicker,Popup,Tab, Tabs
} from 'vant';
Vue.use(Tab).use(Tabs).use(Button).use(NavBar).use(Slider).use(Toast).use(DatetimePicker).use(Popup);
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
