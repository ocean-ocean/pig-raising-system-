import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index.vue'
import Login from '../components/login.vue'

Vue.use(VueRouter)

const routes = [
{
  path: '/index',
  name: 'index',
  component: Index
},
{
  path: '/',
  name: 'index',
  component: Index
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '*',
  redirect: "/login"
}]

const router = new VueRouter({
  // mode:'history',
  base:'/dist',
  routes
})

// 前置守卫
router.beforeEach((to, from, next) => {
  const isToken = localStorage.getItem("TOKEN") ? true : false;
  // 如果即将进入的是登陆页不变化
  if (to.path == '/login'){
    next();
  }
  // 如果有token不改变否则到
  else if (!isToken && to.path !== '/login' || to.path == '/index') {
    next("/login");
  }
  else{
    next();
  }
  
})

export default router