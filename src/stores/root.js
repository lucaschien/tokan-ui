import { defineStore } from 'pinia'
import cookies from 'js-cookie'
import router from '@/router'

export const useRootStore = defineStore('RootStore', {
  state: () => ({}),
  getters: {},
  actions: {
    logout() {
      cookies.remove('taiwantokan')
      cookies.remove('taiwantokanLoginInfo')
      router.push({ name: 'Login' })
    }
  }
})
