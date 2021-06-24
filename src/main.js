import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import axios from 'axios';

Vue.prototype.axios = axios;
Vue.use(dataV);

// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

// 全局注册图标
Vue.component('icon', Icon);

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import './assets/scss/style.scss';


//引入echart
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.use(echarts);

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://47.100.98.99:9988'; // 配置axios请求的地址
axios.defaults.timeout = 1000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if (localStorage.getItem("TOKEN")){
    // 将token添加到请求头
    config.headers.Authorizaion = localStorage.getItem("TOKEN");
  }
  return config;
},  (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
