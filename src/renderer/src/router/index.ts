import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('../views/index.vue'),
    name: 'index'
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
