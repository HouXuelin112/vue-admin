import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-ui
//仅仅安装element-UI是不够的，还需要 cnpm install babel-plugin-component  --save
//将vue.config.js中的requireModuleExtension改为true
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
