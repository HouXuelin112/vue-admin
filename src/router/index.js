import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Login from "../views/login/index.vue";
import AntDesignVue from '../views/antd/AntDesignVue.vue'
import DevExtreme from '../views/devextreme/DevExtreme.vue'
import DevExtremeExpand from '../views/devextreme/DevExtremeExpand.vue'
import XsView from '../views/xspreadsheet/XsView.vue'


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/antDesignVue",
    name: "antDesignVue",
    component: AntDesignVue
  },
  {
    path: "/devExtreme",
    name: "DevExtreme",
    component: DevExtreme
  },
  {
    path: "/devExtremeExpand",
    name: "devExtremeExpand",
    component: DevExtremeExpand
  },
  {
    path: "/xsView",
    name: "xsView",
    component: XsView
  }
];
const router = new VueRouter({
  routes
});

export default router;
