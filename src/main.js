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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
