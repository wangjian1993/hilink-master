import Vue from 'vue'
import axios from "./api/index"

import './assets/css/cloud/video.css' //公共css
import 'amfe-flexible'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
// import Vconsole from 'vconsole'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import base64 from './assets/js/base64'
import VueI18n from 'vue-i18n'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
// hilink sdk公共函数
import hilink from './hilink/index'
import './assets/css/app.css' //公共css
Vue.use(hilink);
Vue.use(VueI18n);
Vue.prototype.$base64 = base64;
//vant按需加载组件
import {
	Button,
	NavBar,
	Slider,
	Toast,
	DatetimePicker,
	Popup,
	Field,
	Swipe,
	SwipeItem,
	Tab,
	Tabs,
	Icon,
	Loading,
	NoticeBar,
	Dialog,
	Picker,
	Cell,
	CellGroup,
	CheckboxGroup,
	Checkbox,
	RadioGroup,
	Radio,
	CountDown,
	List
} from 'vant';
Vue.use(Tab).use(Tabs).use(Button).use(NavBar).use(Slider).use(Toast).use(DatetimePicker).use(Popup).use(Field).use(
	Icon).use(Loading).use(NoticeBar).use(Dialog).use(Picker).use(Cell).use(CellGroup).use(CheckboxGroup).use(Checkbox).use(
	RadioGroup).use(Radio).use(CountDown).use(List);
Vue.use(Swipe).use(SwipeItem);
Vue.use(VueVideoPlayer)
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./common/lang/zh'),   // 中文语言包
      'en-US': require('./common/lang/en')    // 英文语言包
    }
})

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
