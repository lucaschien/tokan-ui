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
          path: 'home',
          name: 'HomeView',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'about',
          name: 'AboutView',
          component: () => import('../views/AboutView.vue')
        }
      ]
    }
  ]
})

export default router
