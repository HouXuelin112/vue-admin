import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入element-ui
//仅仅安装element-UI是不够的，还需要 cnpm install babel-plugin-component  --save
//将vue.config.js中的requireModuleExtension改为true
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入ant-design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'


import VueCompositionApi from "@vue/composition-api";

Vue.use(Antd)
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
