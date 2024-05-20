<template>
  <div class="FormingMachine p-3">
    <!-- 選擇成型機機號 -->
    <div class="choice-machine-box" v-if="step === 1">
      <h4 class="mt-3">選擇成型機機號</h4>
      <div class="machine-list-box">
        <div v-for="item in formingMachineList" :key="'machine'+item.id"
          class="card m-2 p-3 align-items-center"
          @click="choiceMachine(item, true)"
        >{{ item.name }}</div>
      </div>
    </div>

    <!-- 讀取機器奘態 -->
    <div class="status-box" v-if="step === 2">
      <h4>{{ nowMachine.name }}成型機狀態</h4>
      <div>
        <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
        讀取成型機資料中
      </div>
    </div>

    <!-- 輸入生產基本資料 -->
    <div v-if="step === 3">
      <div class="d-flex align-items-center">
        <h1 class="me-5 mb-0">{{ nowMachine.name }}</h1>
        <button class="btn btn-outline-primary"
          @click="backChoiceMachine()">選擇其它機號</button>
      </div>
      <h4 class="text-center mt-4 mb-4">輸入生產基本資料</h4>
      <div class="container">
        <div class="row align-items-end mb-2">
          <div class="col-6">
            <lable class="form-label">班別</lable>
            <select class="form-select" v-model="basicInfo.shift"
              @change="changeShift(basicInfo.shift)">
              <option value="">請選擇</option>
              <option value="MORNING">早班</option>
              <option value="AFTERNOON">中班</option>
              <option value="NIGHT">晚班</option>
            </select>
          </div>
          <div class="col-6" v-if="basicInfo.shift">
            <!-- 將最後的基本資料快速的帶入到畫面中 -->
            <burron class="btn btn-outline-primary"
              @click="clickReUseBasicInfo()">
              <i class="fa fa-repeat" aria-hidden="true"></i>
            </burron>
          </div>
        </div>
        <template v-if="basicInfo.shift && !reUseBasicInfo">
          <div class="row mb-2">
            <div class="col-6">
              <lable class="form-label">組長</lable>
              <select class="form-select" v-model="basicInfo.teamLeader"
                @change="changeTeamLeader()">
                <option value="">請選擇</option>
                <option v-for="item in teamLeader" 
                  :key="'teamLeader'+item.id"
                  :value="item.id">{{ item.name }}</option>
              </select>
            </div>
            <div class="col-6">
              <lable class="form-label">生產人員</lable>
              <input class="form-control" type="text" v-model="basicInfo.productionPersonnel" disabled>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-6">
              <lable class="form-label">杯身紙台車編號</lable>
              <InputScanBarcode
                :code="basicInfo.cupPaperCartNumber"
                :scanCallback="(val) => { basicInfo.cupPaperCartNumber = val }"/>
            </div>
            <div class="col-6">
              <lable class="form-label">杯底紙編號</lable>
              <InputScanBarcode 
                :code="basicInfo.bottomPaperNumber"
                :scanCallback="(val) => { basicInfo.bottomPaperNumber = val }"/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-12">
              <lable class="form-label">原紙種類</lable>
              <div class="row ps-1">
                <div class="form-check col-2">
                  <input class="form-check-input" 
                    v-model="basicInfo.paperType"
                    type="radio" 
                    name="paperType" 
                    id="paperType1"
                    value="GENERAL">
                  <label class="form-check-label" for="paperType1">一般原紙</label>
                </div>
                <div class="form-check col-2">
                  <input class="form-check-input" 
                    v-model="basicInfo.paperType"
                    type="radio" 
                    name="paperType" 
                    id="paperType2"
                    value="FSC">
                  <label class="form-check-label" for="paperType2">FSC</label>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn btn-primary w-100 mt-4"
            :disabled="!canNotSnedProductionInfo"
            @click="snedProductionInfo()">送出</button>
        </template>
      </div>
    </div>

    <!-- 生產啟動 -->
    <div v-if="step === 4">
      <div class="d-flex align-items-center">
        <h1 class="me-5 mb-0">{{ nowMachine.name }}</h1>
        <button class="btn btn-outline-primary"
          @click="backChoiceMachine()">選擇其它機號</button>
      </div>
      <div class="container pt-5">
        <button class="btn btn btn-primary w-100 mt-4 start-btn"
          @click="sendProductionStartUp()">生產啟動</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import { useRoute, useRouter } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { useClientStore } from '@/stores/ClientStore'
import InputScanBarcode from '@/components/InputScanBarcode.vue'

/* 
  機器狀態:
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
const route = useRoute()
const router = useRouter()
const popMsg = inject('popMsg')
const rootStore = useRootStore();
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

// 當前時段所屬班別
//const nowTimeShift = computed(() => clientStore.nowShift)
const formingMachineList = computed(() => clientStore.getFormingMachineList)
const { formingMachineLastBasicInfo } = storeToRefs(clientStore)

// 界面切換步驟
const step = ref(1)

// 選擇哪台機器
const nowMachine = ref(null)
function choiceMachine(item, gotNextCall = true) {
  nowMachine.value = item
  basicInfo.value.machineId = item.id
  // basicInfo.value.shift = nowTimeShift.value // 班別
  step.value = 2
  // F5重整 gotNextCall 才會是 false  
  if (!gotNextCall) {
    // 將 formingMachineLastBasicInfo 整理到 basicInfo
    lastBasicInfoToBasicInfo();
    step.value = 3
  }
  // 透過UI選擇進來的
  if (gotNextCall) {
    // 放到 url 上去
    router.replace({ name:'FormingMachine', query: { machineId: item.id }})
    clientStore.getFormingMachineInfo(item.id, () => {
      setTimeout(() => { step.value = 3 }, 1000)
    });
    clientStore.getFormingMachineBasicInfo(item.id)
  }
}

// 重新選擇機器
function backChoiceMachine() {
  nowMachine.value = null
  basicInfo.value.machineId = null
  // 生產基本資料恢復預設值
  resetBasicInfo()
  // 回到界面步驟 1
  step.value = 1
  router.replace({ name:'FormingMachine'})
}

// 在此單元的成型機生產基本資料
const basicInfo = ref({
  machineId: null,         // 機器 id
  shift: '',               // 班別 MORNING, AFTERNOON, NIGHT
  teamLeader: '',          // 組長
  productionPersonnel: rootStore.loginUserInfo.name, // 生產人員
  cupPaperCartNumber: '',  // 杯身紙台車編號
  bottomPaperNumber: '',   // 杯底紙編號
  paperType: '',           // FSC/一般原紙
})
// 清除在此單元的基本資料
function resetBasicInfo() {
  clientStore.clearFormingMachineLastBasicInfo()
  basicInfo.value.machineId = null
  basicInfo.value.shift = ''
  basicInfo.value.teamLeader = ''
  basicInfo.value.productionPersonnel = rootStore.loginUserInfo.name
  basicInfo.value.cupPaperCartNumber = ''
  basicInfo.value.bottomPaperNumber = ''
  basicInfo.value.paperType = ''
}
const canNotSnedProductionInfo = computed(() => {
  if (!basicInfo.value.shift) return false
  if (!basicInfo.value.teamLeader) return false
  if (!basicInfo.value.productionPersonnel) return false
  if (!basicInfo.value.cupPaperCartNumber) return false
  if (!basicInfo.value.bottomPaperNumber) return false
  if (!basicInfo.value.paperType) return false
  return true
})
// 新增一筆基本資料
async function snedProductionInfo() {
  const path = VITE_API_DOMAIN + api.moldingMachine.saveBasicInfo
  const result = await ajax.post(path, basicInfo.value)
  if (ajax.checkErrorCode(result.errorCode)) {
    // 如果機器狀態是 INITIAL 才要進入 步驟4
    // 如果曾經有該班別的基本資料就不要進入步驟4而是直接進入成型機功能頁 <-- 這個需求邏輯有問題因此應該用,機器狀態是 INITIAL才要進入 步驟4
    //if (!clientStore.formingMachineLastBasicInfo) {
    if (clientStore.oneFormingMachineInfo.status === 'INITIAL') {
      step.value = 4
      clientStore.getFormingMachineBasicInfo(nowMachine.value.id) // 更新store的資料
    } else {
      router.push({ name: 'FormingMachineFnEnter', query: { machineId: nowMachine.value.id } })
    }
  } else {
    popMsg('新增基本資料失敗')
  }
}

// 將 formingMachineLastBasicInfo 資料整理到 basicInfo
function lastBasicInfoToBasicInfo () {
  if (formingMachineLastBasicInfo.value) {
    const temp = formingMachineLastBasicInfo.value;
    basicInfo.value.machineId = temp.id;
    basicInfo.value.shift = temp.shift;
    basicInfo.value.teamLeader = temp.teamLeader;
    basicInfo.value.productionPersonnel = temp.productionPersonnel;
    basicInfo.value.cupPaperCartNumber = temp.cupPaperCartNumber;
    basicInfo.value.bottomPaperNumber = temp.bottomPaperNumber;
    basicInfo.value.paperType = temp.paperType;
  }
}

// 組長清單
const teamLeader = ref([]);
// 切換班別
async function changeShift(shift) {
  basicInfo.value.teamLeader = ''
  basicInfo.value.productionPersonnel = rootStore.loginUserInfo.name
  basicInfo.value.cupPaperCartNumber = ''
  basicInfo.value.bottomPaperNumber = ''
  basicInfo.value.paperType = ''

  if (!shift) {
    return 
  }
  // 撈取班別下使用者的名單
  const path = VITE_API_DOMAIN + formatPath(api.moldingMachine.shiftUserList, shift);
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    teamLeader.value = result.data
  } else {
    popMsg(result.errorCode)
  }
}

// 重新帶入最後基本資料
const reUseBasicInfo = ref(false)
// 點擊重新帶入最後基本資料按鈕
function clickReUseBasicInfo() {
  reUseBasicInfo.value = true;
  
  basicInfo.value.teamLeader = ''
  basicInfo.value.productionPersonnel = rootStore.loginUserInfo.name
  basicInfo.value.cupPaperCartNumber = ''
  basicInfo.value.bottomPaperNumber = ''
  basicInfo.value.paperType = ''
  clientStore.getFormingMachineBasicInfo(nowMachine.value.id, basicInfo.value.shift)
  setTimeout(() => {
    reUseBasicInfo.value = false;
  }, 1000)
}

// 切換組長
function changeTeamLeader () {
  // TODO... 不知道是否要做什麼處理
} 

watch(formingMachineLastBasicInfo, () => {
  lastBasicInfoToBasicInfo(); // 將 formingMachineLastBasicInfo 整理到 basicInfo
})

// 送出生產啟動
async function sendProductionStartUp() {
  const path = VITE_API_DOMAIN + api.moldingMachine.launchProduction
  const param = {
    provisionId: nowMachine.value.id
  }
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    router.push({ 
      name: 'FormingMachineFnEnter',
      query: {
        machineId: nowMachine.value.id
      } 
    })
  } else {
    popMsg(result.errorCode)
  }
}


clientStore.getFormingMachinList() // 成型機列表
changeShift(clientStore.nowShift)

onMounted(() => {
  if (route.query.machineId) {
    const nowForminMachine = clientStore.formingMachineList.filter(item => item.id === route.query.machineId)
    choiceMachine(nowForminMachine[0], false)
  } else {
    resetBasicInfo()
  }
})
</script>