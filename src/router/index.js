import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/AppHome',
      name: 'AppHome',
      component: () => import('../views/AppHome.vue'),
    },

    // C端
    {
      path: '/Client',
      name: 'ClientFull',
      redirect: '/Client/ClientHome',
      component: () => import('../containers/ClientFull.vue'),
      children: [
        {
          path: 'ClientHome',
          name: 'ClientHome',
          component: () => import('../views/ClientHome.vue'),
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
    // B端
    {
      path: '/Admin',
      name: 'AdminFull',
      redirect: '/Admin/AdminDefectiveUtilization',
      component: () => import('../containers/AdminFull.vue'),
      children: [
        {
          path: 'AdminDefectiveUtilization',
          name: 'AdminDefectiveUtilization',
          component: () => import('../views/Admin/AdminDefectiveUtilization.vue'),
          meta: {
            breadcrumb: ['不良率與稼動率統計']
          }
        },
        {
          path: 'AdminFormingMachineFailureHistory',
          name: 'AdminFormingMachineFailureHistory',
          component: () => import('../views/Admin/AdminFormingMachineFailureHistory.vue'),
          meta: {
            breadcrumb: ['成型機故障履歷的統計']
          }
        },
        {
          path: 'AdminReport',
          name: 'AdminReport',
          component: () => import('../views/Admin/AdminReport.vue'),
          meta: {
            breadcrumb: ['報表下載']
          }
        },

      ]
    },
    // other
    {
      path: '/ClientGUI',
      name: 'ClientGUI',
      component: () => import('../views/ClientGUI.vue'),
    }
  ]
})

export default router
