import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue')
}]
const router = new VueRouter({
  // mode:'history',
  base:'/dist',
  routes
})

export default router