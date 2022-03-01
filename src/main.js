// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import Axios from "axios";

//1.導入組件
import Goods from "./components/Goods/Goods";
import Seller from "./components/Seller/Seller";
import Ratings from "./components/Ratings/Ratings";

Vue.config.productionTip = false;

//如果在其他組建中使用axios命令，需要改寫為Vue原形屬性
Vue.prototype.$axios = Axios;

//2.定義路由
const routes = [
  { path: "/", redirect: "/goods" }, //redirect 重定向
  { path: "/goods", component: Goods },
  { path: "/seller", component: Seller },
  { path: "/ratings", component: Ratings }
];

const router = new VueRouter({ routes, linkActiveClass: "active" });

//安裝vue-router插件
Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router
});
