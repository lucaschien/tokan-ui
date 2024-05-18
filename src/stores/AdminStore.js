import { defineStore } from 'pinia'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { popMsg } from '@/common/alert'
import moment from 'moment'

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const useAdminStore = defineStore('AdminStore', {
  state: () => ({
    // 紀錄當前時段班別用
    nowShift: '',
    // 成型機最後一筆基本資料(某一班別)
    formingMachineLastBasicInfo: null,
  }),
  getters: {
    getNowShift: (state) => state.nowShift,
    getFormingMachineLastBasicInfo: (state) => state.formingMachineLastBasicInfo,
  },
  actions: {
    /* 檢查當前時段所屬的班別
      MORNING 08:00~16:00
      AFTERNOON 16:00~24:00
      NIGHT 00:00~08:00
    */
    checkNowShift() {
      const nowHourse = new Number(moment().format('HH'), 10);
      const nowMinute = new Number(moment().format('mm'), 10);
      // console.log('nowHourse', nowHourse);
      // console.log('nowMinute', nowMinute);

      // 轉換為毫秒 8小時 * 60分 * 60秒 * 1000毫秒
      const nowM = (nowHourse * 60 + nowMinute) * 60 * 1000;
      const M00 = 0 * 60 * 60 * 1000; // 00:00 毫秒
      const M08 = 8 * 60 * 60 * 1000; // 08:00 毫秒
      const M16 = 16 * 60 * 60 * 1000; // 08:00 毫秒
      const M24 = 24 * 60 * 60 * 1000; // 08:00 毫秒
      // console.log('nowM', nowM)
      // console.log('M00', M00)
      // console.log('M08', M08)
      // console.log('M16', M16)

      const isMORNING = (nowM >= M08) && (nowM <= M16)
      const isAFTERNOON = (nowM >= M16) && (nowM <= M24)
      const isNIGHT = (nowM >= M00) && (nowM <= M08)
      // console.log('isMORNING', isMORNING)
      // console.log('isAFTERNOON', isAFTERNOON)
      // console.log('isNIGHT', isNIGHT)
      // console.log('------------------')
      if (isMORNING) {
        this.nowShift = 'MORNING'
      }
      if (isAFTERNOON) {
        this.nowShift = 'AFTERNOON'
      }
      if (isNIGHT) {
        this.nowShift = 'NIGHT'
      }
    },
    // 清除成型機基本基料
    clearFormingMachineLastBasicInfo() {
      this.formingMachineLastBasicInfo = null;
    },
    // 取得成型機已建立的基本資料
    async getFormingMachineBasicInfo(machineNumber) {
      const path = VITE_API_DOMAIN + api.moldingMachine.getBasicInfo;
      const param = {
        machineNumber: machineNumber,
        shift: this.nowShift
      };
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        console.log('result.data >>> ', result.data);
        const shiftData = result.data.filter(item => item.shift === this.nowShift);
        if (shiftData.length) {
          const lastData = shiftData[shiftData.length - 1];
          this.formingMachineLastBasicInfo = lastData;
          console.log('formingMachineLastBasicInfo:::', this.formingMachineLastBasicInfo);
        }
      } else {
        popMsg(result.errorCode)
      }
    }
  }
})