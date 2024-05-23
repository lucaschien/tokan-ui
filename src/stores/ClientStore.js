import { defineStore } from 'pinia'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import { popMsg } from '@/common/alert'
import moment from 'moment'

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

/* 
  成型機機器狀態:
    INITIAL("初始狀態"),
    MAINTENANCE("保養中"),
    PRODUCTION_INTERRUPTED("生產中斷中"),
    SHIFT_CHANGE("工作交接中"),
    AWAITING_MATERIAL("待料中"),
    RESTING("休息中"),
    IN_PRODUCTION("生產中"),
    MATERIAL_ISSUANCE("領料中"),
    MACHINE_CALIBRATION("漏水調機中"),
    TROUBLESHOOTING("故障排除中"),
    MACHINE_CLEANING("機台清潔中"),
    MOLD_CHANGE("模具更換中"),
    MACHINE_STOPPED_FOR_REPAIR("停機待修中"),
*/

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
      const path = VITE_API_DOMAIN + api.fmoldingMachine.formingMachineList
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.formingMachineList = result.data
      } else {
        popMsg(result.errorCode)
      }
      return
    },

    // 取得單一成型機詳細資訊
    async getFormingMachineInfo(id, callback = () => { }) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.formingMachineInfo, id)
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.oneFormingMachineInfo = result.data
        callback()
      } else {
        popMsg(result.errorCode)
      }
      return
    },

    // 更新機器狀態
    async changeStatus(id, status, callback = () => { }) {
      const path = VITE_API_DOMAIN + api.fmoldingMachine.changeStatus;
      const param = {
        id: id,
        status: status
      };
      const result = await ajax.post(path, param)
      if (ajax.checkErrorCode(result.errorCode)) {
        callback()
      } else {
        popMsg(result.errorCode)
      }
    },

    // 清除成型機基本基料
    clearFormingMachineLastBasicInfo() {
      this.formingMachineLastBasicInfo = null
    },

    // 取得成型機已建立的基本資料
    async getFormingMachineBasicInfo(id, otherShift) {
      const path = VITE_API_DOMAIN + api.fmoldingMachine.getBasicInfo
      const param = {
        machineId: id,
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
    },

    // ●設定人機螢幕顯示
    async setHumanMachineStatusDisplay(message, buttonType = 'ENABLE', provisionId, callback = () => { }) {
      if (!message) {
        popMsg('systrm error: message 未設定');
        return;
      }
      const path = VITE_API_DOMAIN + api.fmoldingMachine.setHumanMachineStatusDisplay;
      const param = {
        provisionId: (provisionId) ? provisionId : this.oneFormingMachineInfo.id, // 成型機id
        buttonType: buttonType, // 按鈕切換狀態
        message: message // 人機螢幕顯示要顯示的文字
      };
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        callback();
      } else {
        popMsg(result.errorCode)
      }
    },

    // ●解除啟動鍵限制 or 啟動鍵無功能 or 功能全開
    async lockAndUnlockButton(message, buttonType, provisionId, callback = () => { }) {
      if (!message || !buttonType) {
        popMsg('systrm error: call lockAndUnlockButton error.');
        return;
      }
      const path = VITE_API_DOMAIN + api.fmoldingMachine.lockAndUnlockButton;
      const param = {
        provisionId: (provisionId) ? provisionId : this.oneFormingMachineInfo.id, // 成型機id
        buttonType: buttonType, // 按鈕切換狀態
        message: message // 人機螢幕顯示要顯示的文字
      };
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        callback();
      } else {
        popMsg(result.errorCode)
      }
    }

  }
})