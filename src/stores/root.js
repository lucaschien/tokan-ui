import { defineStore } from 'pinia'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { popMsg } from '@/common/alert'
import cookies from 'js-cookie'
import router from '@/router'

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

export const useRootStore = defineStore('RootStore', {
  state: () => ({
    loginUserInfo: {
      id: null,
      name: null,
      roleId: null,
      roleName: null,
      priority: null,
    },
  }),
  getters: {
    getLoginUserInfo: (state) => state.loginUserInfo,
  },
  actions: {
    async getLoginUserInfoData() {
      const path = VITE_API_DOMAIN + api.app.loginUserInfo;
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.loginUserInfo = result.data
      } else {
        popMsg('撈取登入者資訊失敗' + result.errorCode)
      }
    },
    logout() {
      cookies.remove('taiwantokan')
      cookies.remove('taiwantokanLoginInfo')
      router.push({ name: 'Login' })
    }
  }
})
