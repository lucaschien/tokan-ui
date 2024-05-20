import { defineStore } from 'pinia'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import { popMsg } from '@/common/alert'
import moment from 'moment'

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

export const useClientStore = defineStore('ClientStore', {
  state: () => ({
    // 紀錄當前時段班別用
    nowShift: '',
    // 成型機某一班別所有的基本資料
    allFormingMachineBasicInfo: [],
    // 成型機某一台機器的最後一筆基本資料(某一班別)
    formingMachineLastBasicInfo: null,
    // 所有成型機列表
    formingMachineList: [],
    // 單一台成型機資訊
    oneFormingMachineInfo: null,
  }),
  getters: {
    getNowShift: (state) => state.nowShift,
    getFormingMachineLastBasicInfo: (state) => state.formingMachineLastBasicInfo,
    getFormingMachineList: (state) => state.formingMachineList,
    getOneFormingMachineInfo: (state) => state.oneFormingMachineInfo,
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

    // 取得成型機列表
    async getFormingMachinList() {
      const path = VITE_API_DOMAIN + api.moldingMachine.formingMachineList
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.formingMachineList = result.data
      } else {
        popMsg(result.errorCode)
      }
      return
      // TODO... 等api好了在拿掉
      this.formingMachineList = [
        {
          "id": "55554944-2829-0000-0000-000000000000",
          "name": "#1",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        },
        {
          "id": "55554944-2831-3129-0000-000000000000",
          "name": "#11",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING_SF170"
        },
        {
          "id": "55554944-2832-2900-0000-000000000000",
          "name": "#3",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        },
        {
          "id": "55554944-2833-2900-0000-000000000000",
          "name": "#4",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        },
        {
          "id": "55554944-2834-2900-0000-000000000000",
          "name": "#5",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        },
        {
          "id": "55554944-2835-2900-0000-000000000000",
          "name": "#6",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        },
        {
          "id": "efbbbf55-5549-4428-3129-000000000000",
          "name": "#2",
          "status": "INITIAL",
          "handler": "charlies",
          "handlerType": null,
          "dateTime": "2024-05-16 23:50:09",
          "details": null,
          "provisionType": "FORMING"
        }
      ];
    },

    // 取得單一成型機詳細資訊
    async getFormingMachineInfo(id, callback = () => {}) {
      const path = VITE_API_DOMAIN + formatPath(api.moldingMachine.formingMachineInfo, id)
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.oneFormingMachineInfo = result.data
        callback()
      } else {
        popMsg(result.errorCode)
      }
      return
      // TODO... 等api好了在拿掉
      this.oneFormingMachineInfo = { test: '哈哈哈' }
      callback()
    },

    // 清除成型機基本基料
    clearFormingMachineLastBasicInfo() {
      this.formingMachineLastBasicInfo = null
    },

    // 取得成型機已建立的基本資料
    async getFormingMachineBasicInfo(id, otherShift) {
      const path = VITE_API_DOMAIN + api.moldingMachine.getBasicInfo
      const param = {
        id: id,
        shift: (!otherShift) ? this.nowShift : otherShift
      }
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        this.allFormingMachineBasicInfo = result.data;
        if (result.data.length) {
          // 該班別的最後一筆
          this.formingMachineLastBasicInfo = result.data[result.data.length - 1];
        }
        /* const shiftData = result.data.filter(item => item.shift === this.nowShift)
        if (shiftData.length) {
          const lastData = shiftData[shiftData.length - 1] // 該班別的最後一筆
          this.formingMachineLastBasicInfo = lastData
        } */
      } else {
        popMsg(result.errorCode)
      } 
      return
      // TODO... 等api好了在拿掉
      this.formingMachineLastBasicInfo = {
        "machineNumber": 1,
        "shift": "AFTERNOON",
        "productionDate": "2024-05-18",
        "paperType": "GENERAL",
        "cupPaperCartNumber": "",
        "bottomPaperNumber": "",
        "teamLeader": "lucas",
        "productionPersonnel": "大雄",
        "createDate": "2024-05-18T16:10:53.116372",
        "crtUser": null,
        "lastModifyDate": "2024-05-18T16:10:53.116372",
        "mdyUser": null
      }
    },

  }
})