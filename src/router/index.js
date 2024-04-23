import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Full',
      redirect: '/admin/home',
      component: () => import('../containers/Full.vue'),
      children: [
        {
          path: 'Home',
          name: 'Home',
          component: () => import('../views/Home.vue'),
          meta: {
            breadcrumb: ['功能首頁']
          }
        },
        {
          path: 'FormingMachine',
          name: 'FormingMachine',
          component: () => import('../views/FormingMachine.vue'),
          meta: {
            breadcrumb: ['成型機作業']
          }
        }
      ]
    },
    {
      path: '/GUI',
      name: 'GUI',
      component: () => import('../views/GUI.vue'),
    }
  ]
})

export default router
