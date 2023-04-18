import App from './App';
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false 
App.mpType = 'app'
//引入
import store from '.@/store/index.js';
import news from "@/components/news/news.vue"
import mine from "@/components/mine/mine.vue"
//定义为全局组件
Vue.prototype.$store = store
components: {news,mine}

const app = new Vue({
	store,//挂载
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif