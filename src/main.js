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
const vConsole = new Vconsole()
Vue.use(vConsole)
//hilink sdk公共函数
import hilink from './hilink/index'
Vue.use(hilink);
//vant按需加载组件
import {
<<<<<<< HEAD
  Button,NavBar,Slider,Toast,DatetimePicker,Popup,Field,Swipe, SwipeItem, Tab, Tabs,Icon,Loading 
} from 'vant';
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Slider);
Vue.use(Toast);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);
Vue.use(VueVideoPlayer)
=======
  Button,NavBar,Slider,Toast,DatetimePicker,Popup,Tab, Tabs
} from 'vant';
Vue.use(Tab).use(Tabs).use(Button).use(NavBar).use(Slider).use(Toast).use(DatetimePicker).use(Popup);
>>>>>>> d2bc8cf555851ae33fedf71251f79e5ad591132f
Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
