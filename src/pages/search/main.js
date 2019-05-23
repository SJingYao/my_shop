import Vue from "vue";
import App from "./index";
/* 导入通用接口模块 */
import request from "../../utils/request";
// 将通用接口模块挂载到Vue的实例对象上
Vue.prototype.request = request;

const app = new Vue(App);
app.$mount();
