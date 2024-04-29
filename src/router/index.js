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
      path: '/views',
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
            breadcrumb: ['成型機作業'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineFnEnter',
          name: 'FormingMachineFnEnter',
          component: () => import('../views/FormingMachineFnEnter.vue'),
          meta: {
            breadcrumb: ['成型機作業'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachinePatrol',
          name: 'FormingMachinePatrol',
          component: () => import('../views/FormingMachinePatrol.vue'),
          meta: {
            breadcrumb: ['成型機作業', '巡查'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineHandover',
          name: 'FormingMachineHandover',
          component: () => import('../views/FormingMachineHandover.vue'),
          meta: {
            breadcrumb: ['成型機作業', '工作交接'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachinePicking',
          name: 'FormingMachinePicking',
          component: () => import('../views/FormingMachinePicking.vue'),
          meta: {
            breadcrumb: ['成型機作業', '領料'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineWaterLeakageAdjustment',
          name: 'FormingMachineWaterLeakageAdjustment',
          component: () => import('../views/FormingMachineWaterLeakageAdjustment.vue'),
          meta: {
            breadcrumb: ['成型機作業', '漏水調機'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineTroubleshooting',
          name: 'FormingMachineTroubleshooting',
          component: () => import('../views/FormingMachineTroubleshooting.vue'),
          meta: {
            breadcrumb: ['成型機作業', '故障排除'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineReplaceProduct',
          name: 'FormingMachineReplaceProduct',
          component: () => import('../views/FormingMachineReplaceProduct.vue'),
          meta: {
            breadcrumb: ['成型機作業', '更換產品'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineRestSwitch',
          name: 'FormingMachineRestSwitch',
          component: () => import('../views/FormingMachineRestSwitch.vue'),
          meta: {
            breadcrumb: ['成型機作業', '休息狀態切換'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineClean',
          name: 'FormingMachineClean',
          component: () => import('../views/FormingMachineClean.vue'),
          meta: {
            breadcrumb: ['成型機作業', '機台清潔產品'],
            nav: 'FormingMachine'
          }
        },
        {
          path: 'FormingMachineProductionInterruption',
          name: 'FormingMachineProductionInterruption',
          component: () => import('../views/FormingMachineProductionInterruption.vue'),
          meta: {
            breadcrumb: ['成型機作業', '生產中斷'],
            nav: 'FormingMachine'
          }
        },


        

        
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
