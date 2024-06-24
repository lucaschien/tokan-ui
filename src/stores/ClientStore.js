import { defineStore } from 'pinia'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import { popMsg } from '@/common/alert'
import moment from 'moment'

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

/* 角色:
    BOSS("老闆"),
    PACKAGING_WORKER("包裝作業員"),
    CUTTING_WORKER("裁切作業員"),
    MOLDING_WORKER("成型作業員"),
    ASSISTANT("助理"),
    ACCOUNTANT("會計"),
    TEAM_LEADER("組長"),
    MAINTENANCE("保修"),
    QUALITY_MANAGER("品管"),
    QUALITY_INSPECTOR("品檢"),
    DEPUTY_FACTORY_MANAGER("副廠長"),
    FACTORY_MANAGER("廠長");
*/

/* 成型機機器狀態:
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
    MACHINE_LOCKED("機器鎖定中"),
    MACHINE_CLOSED("關機中");
    PRODUCT_CHANGE("更換產品中"),
*/

/* 機器類型:
  FORMING ("成型機")
  FORMING_SF170 ("成型機-SF-170")
  PACKAGING ("包裝機")
  CUTTING ("裁切機")
*/

export const useClientStore = defineStore('ClientStore', {
  state: () => ({
    statusName: {
      INITIAL: '初始狀態',
      MAINTENANCE: '保養中',
      PRODUCTION_INTERRUPTED: '生產中斷中',
      SHIFT_CHANGE: '工作交接中',
      AWAITING_MATERIAL: '待料中',
      RESTING: '休息中',
      IN_PRODUCTION: '生產中',
      MATERIAL_ISSUANCE: '領料中',
      MACHINE_CALIBRATION: '漏水調機中',
      TROUBLESHOOTING: '故障排除中',
      MACHINE_CLEANING: '機台清潔中',
      MOLD_CHANGE: '模具更換中',
      MACHINE_STOPPED_FOR_REPAIR: '停機待修中',
      MACHINE_LOCKED: '機器鎖定中',
      MACHINE_CLOSED: '關機中',
      PRODUCT_CHANGE: '更換產品中',
    },
    shiftName: {
      MORNING: '早班',
      AFTERNOON: '午班',
      NIGHT: '晚班'
    },
    // 紀錄當前時段班別用
    nowShift: '',
    // 成型機已建立的基本資料
    allFormingMachineBasicInfo: [],
    // 當日最後一筆領料資料
    lastMaterial: null,
    // 所有成型機列表
    formingMachineList: [],
    // 目前選擇的成型機詳細資訊
    nowFormingMachineInfo: null,
  }),
  getters: {
    getNowShift: (state) => state.nowShift,
    getFormingMachineLastBasicInfo: (state) => state.formingMachineLastBasicInfo,
    getFormingMachineList: (state) => state.formingMachineList,
    getNowFormingMachineInfo: (state) => state.nowFormingMachineInfo,
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

      // 轉換為毫秒 8小時 * 60分 * 60秒 * 1000毫秒
      const nowM = (nowHourse * 60 + nowMinute) * 60 * 1000;
      const M00 = 0 * 60 * 60 * 1000; // 00:00 毫秒
      const M08 = 8 * 60 * 60 * 1000; // 08:00 毫秒
      const M16 = 16 * 60 * 60 * 1000; // 08:00 毫秒
      const M24 = 24 * 60 * 60 * 1000; // 08:00 毫秒

      const isMORNING = (nowM >= M08) && (nowM <= M16)
      const isAFTERNOON = (nowM >= M16) && (nowM <= M24)
      const isNIGHT = (nowM >= M00) && (nowM <= M08)

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

    // 撈取某班別下的組長名單
    async getShiftUserList(shift) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.shiftUserList, shift);
      const result = await ajax.get(path);
      if (ajax.checkErrorCode(result.errorCode)) {
        return result.data;
      } else {
        popMsg(result.errorCode)
      }
    },

    // 依照角色撈取人員清單
    async getRoleUserList(roleCode) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.roleUserList, roleCode);
      const result = await ajax.get(path);
      if (ajax.checkErrorCode(result.errorCode)) {
        return result.data;
      } else {
        popMsg(result.errorCode)
      }
    },

    // 取得成型機列表
    async getFormingMachinList() {
      const path = VITE_API_DOMAIN + api.fmoldingMachine.formingMachineList
      const param = {
        provisionTypes: ['FORMING', 'FORMING_SF170']
      };
      const result = await ajax.post(path, param)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.formingMachineList = result.data
      } else {
        popMsg(result.errorCode)
      }
      return
    },

    // 取得單一台成型機詳細資訊
    async getFormingMachineInfo(id, callback = () => { }) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.formingMachineInfo, id)
      const result = await ajax.get(path)
      if (ajax.checkErrorCode(result.errorCode)) {
        this.nowFormingMachineInfo = result.data
        callback()
      } else {
        popMsg(result.errorCode)
      }
      return
    },

    // 更新機器狀態  TODO... 暫時不使用
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
    async getFormingMachineBasicInfo(id) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.getBasicInfos, id)
      const result = await ajax.get(path);
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

    // 查詢當日最後一筆領料資料
    async getLastMaterial(id, callback = () => { }) {
      const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.getLastMaterial, id)
      const result = await ajax.get(path);
      if (ajax.checkErrorCode(result.errorCode)) {
        console.log('查詢當日最後一筆領料資料', result.data)
        this.lastMaterial = result.data;
        callback(result.data);
      } else {
        popMsg(result.errorCode)
      }
    },

    // ● 設定人機螢幕顯示 (黃色)
    async setHumanMachineStatusDisplay(message, buttonType = 'ENABLE', provisionId, callback = () => { }) {
      if (!message) {
        popMsg('systrm error: message 未設定');
        return;
      }
      const path = VITE_API_DOMAIN + api.fmoldingMachine.setHumanMachineStatusDisplay;
      const param = {
        provisionId: (provisionId) ? provisionId : this.nowFormingMachineInfo.id, // 成型機id
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

    // ● 解除啟動鍵限制 or 啟動鍵無功能 or 功能全開 (紫色)
    async lockAndUnlockButton(message, buttonType, provisionId, callback = () => { }) {
      if (!message || !buttonType) {
        popMsg('systrm error: call lockAndUnlockButton error.');
        return;
      }
      const path = VITE_API_DOMAIN + api.fmoldingMachine.lockAndUnlockButton;
      const param = {
        provisionId: (provisionId) ? provisionId : this.nowFormingMachineInfo.id, // 成型機id
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

    // ● 人機顯示+良杯撥桿繼電器無功能+送杯身紙電眼啟動計數量(ENABLE) (漏水調機,故障排除用) (黃色+紫色)
    async lockProduction(paramObj, callback = () => { }) {
      const path = VITE_API_DOMAIN + api.fmoldingMachine.lockProduction
      const param = {
        provisionId: paramObj.id,
        buttonType: paramObj.buttonType,
        message: paramObj.message,
        provisionStatus: paramObj.provisionStatus
      }
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        callback()
      } else {
        popMsg(result.errorCode)
      }
    },

    /** ● 各種成型機狀態切換 (紫色:功能全開)
     * @param {*} paramObj.id 機器id
     * @param {*} paramObj.buttonType 機器按鈕狀態文字 "ENABLE, DISABLE"
     * @param {*} paramObj.message 人機上顯示的文字
     * @param {*} paramObj.provisionStatus 成型機機器狀態,參數對應狀態在最上方有備註 
     * @param {*} callback 回呼函式
     */
    async launchProduction(paramObj, callback = () => { }) {
      const path = VITE_API_DOMAIN + api.fmoldingMachine.launchProduction
      const param = {
        provisionId: paramObj.id,
        buttonType: paramObj.buttonType,
        message: paramObj.message,
        provisionStatus: paramObj.provisionStatus
      }
      const result = await ajax.post(path, param);
      if (ajax.checkErrorCode(result.errorCode)) {
        callback()
      } else {
        popMsg(result.errorCode)
      }
    },

  }
})