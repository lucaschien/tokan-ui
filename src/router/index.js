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
          component: () => import('../views/Home.vue')
        },
        {
          path: 'About',
          name: 'About',
          component: () => import('../views/About.vue')
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
