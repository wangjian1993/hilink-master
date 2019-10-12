import Vue from 'vue'
import axios from "./api/index"
import './assets/css/app.css' //公共css
import './assets/css/cloud/video.css' //公共css
import 'amfe-flexible'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vconsole from 'vconsole'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import base64 from './assets/js/base64'
const vConsole = new Vconsole()
Vue.use(vConsole)
//hilink sdk公共函数
import hilink from './hilink/index'
Vue.use(hilink);
Vue.prototype.$base64 = base64;
//vant按需加载组件
import {
  Button,NavBar,Slider,Toast,DatetimePicker,Popup,Field,Swipe, SwipeItem, Tab, Tabs,Icon,Loading ,NoticeBar ,Dialog,Picker 
} from 'vant';
Vue.use(Tab).use(Tabs).use(Button).use(NavBar).use(Slider).use(Toast).use(DatetimePicker).use(Popup).use(Field).use(Icon).use(Loading).use(NoticeBar).use(Dialog ).use(Picker);
Vue.use(Swipe).use(SwipeItem);
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
