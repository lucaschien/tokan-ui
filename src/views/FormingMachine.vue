<template>
  <div class="FormingMachine p-3">
    <!-- 選擇成型機機號 -->
    <div class="choice-machine-box" v-if="step === 1">
      <h4 class="mt-3">選擇成型機機號</h4>
      <div class="machine-list-box">
        <div v-for="item in [1,2,3,4,5,6,11]" :key="'machine'+item"
          class="card m-2 p-3 align-items-center"
          @click="choiceMachine(item)"
        >#{{ item }}</div>
      </div>
    </div>

    <!-- 讀取機器奘態 -->
    <div class="status-box" v-if="step === 2">
      <h4>#{{ nowMachine }}成型機狀態</h4>
      <div>
        <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
        <template v-if="status === 'PowerOn'">開機送電...</template>
        <template v-if="status === 'BootProcedureConfirm'">開機程序開始確認...</template>
        <template v-if="status === 'BootProcedureCompleted'">開機程序確認完成</template>
      </div>
    </div>

    <!-- 輸入生產基本資料 -->
    <div v-if="step === 3">
      <div class="d-flex align-items-center">
        <h1 class="me-5 mb-0">#{{ nowMachine }}</h1>
        <button class="btn btn-outline-primary"
          @click="backChoiceMachine()">選擇其它機號</button>
      </div>
      <h4 class="text-center mt-4 mb-4">輸入生產基本資料</h4>
      <div class="container">
        <div class="row mb-2">
          <div class="col-6">
            <lable class="form-label">班別</lable>
            <select class="form-select" v-model="basicInfo.shift" disabled>
              <option value="MORNING">早班</option>
              <option value="AFTERNOON">中班</option>
              <option value="NIGHT">晚班</option>
            </select>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-6">
            <lable class="form-label">組長</lable>
            <input class="form-control" type="text" v-model="basicInfo.teamLeader"
              :disabled="formingMachineLastBasicInfo">
          </div>
          <div class="col-6">
            <lable class="form-label">生產人員</lable>
            <input class="form-control" type="text" v-model="basicInfo.productionPersonnel"
              :disabled="formingMachineLastBasicInfo">
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-6">
            TODO... 改掃描
            <lable class="form-label">杯身紙台車編號</lable>
            <input class="form-control" type="text" v-model="basicInfo.cupPaperCartNumber"
              :disabled="formingMachineLastBasicInfo">
          </div>
          <div class="col-6">
            TODO... 改掃描
            <lable class="form-label">杯底紙編號</lable>
            <input class="form-control" type="text" v-model="basicInfo.bottomPaperNumber"
              :disabled="formingMachineLastBasicInfo">
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
                  value="GENERAL"
                  :disabled="formingMachineLastBasicInfo">
                <label class="form-check-label" for="paperType1">
                  一般原紙
                </label>
              </div>
              <div class="form-check col-2">
                <input class="form-check-input" 
                  v-model="basicInfo.paperType"
                  type="radio" 
                  name="paperType" 
                  id="paperType2"
                  value="FSC"
                  :disabled="formingMachineLastBasicInfo">
                <label class="form-check-label" for="paperType2">
                  FSC
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn btn-primary w-100 mt-4"
          @click="snedProductionInfo()">送出</button>
      </div>
    </div>

    <!-- 生產啟動 -->
    <div v-if="step === 4">
      <div class="d-flex align-items-center">
        <h1 class="me-5 mb-0">#{{ nowMachine }}</h1>
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
import { ref, inject, onMounted, computed } from 'vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/AdminStore';

/* 機器狀態
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
MACHINE_STOPPED_FOR_REPAIR("停機待修中");
*/

const route = useRoute()
const router = useRouter()
const popMsg = inject('popMsg')
const adminStore = useAdminStore();
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

// 當前時段所屬班別
const nowTimeShift = computed(() => adminStore.nowShift);
onMounted(() => {
  adminStore.checkNowShift();
})

// 界面切換步驟
const step = ref(1);

// 機器狀態
const status = ref('')
function getMachineStatus() {
  // TODO... ajax 取得該幾號的狀態
  status.value = 'PowerOn';
  // TODO... 造假狀態切換
  setTimeout(() => {
    status.value = 'BootProcedureConfirm' // 開機程序確認中
    setTimeout(() => {
      status.value = 'BootProcedureCompleted' // 開機程序確認完成
      setTimeout(() => {
        step.value = 3
      }, 600)
    }, 600)
  }, 600)
}

// 選擇哪台機器
const nowMachine = ref(null)
function choiceMachine(item) {
  nowMachine.value = item
  basicInfo.value.machineNumber = item
  basicInfo.value.shift = nowTimeShift.value
  step.value = 2
  getMachineStatus()
  adminStore.getFormingMachineBasicInfo(item)
  // 放到url上去
  router.replace({ name:'FormingMachine', query: { machine: item }})
}
// 重新選擇機器
function backChoiceMachine() {
  nowMachine.value = null
  basicInfo.value.machineNumber = null
  // 生產基本資料恢復預設值
  resetBasicInfo()
  // 回到界面步驟 1
  step.value = 1
  router.replace({ name:'FormingMachine'})
}

// 成型機生產基本資料
const basicInfo = ref({
  machineNumber: null,
  shift: 'MORNING', // 班別 MORNING, AFTERNOON, NIGHT
  teamLeader: '', // 組長
  productionPersonnel: '', // 生產人員
  cupPaperCartNumber: '', // 杯身紙台車編號
  bottomPaperNumber: '', // 杯底紙編號
  paperType: '', // FSC/一般原紙
})
function resetBasicInfo() {
  adminStore.clearFormingMachineLastBasicInfo();
  basicInfo.value.machineNumber = null
  basicInfo.value.shift = ''
  basicInfo.value.teamLeader = ''
  basicInfo.value.productionPersonnel = ''
  basicInfo.value.cupPaperCartNumber = ''
  basicInfo.value.bottomPaperNumber = ''
  basicInfo.value.paperType = ''
}
// 新增一筆基本資料
async function snedProductionInfo() {
  step.value = 4
  return

  const path = VITE_API_DOMAIN + api.moldingMachine.saveBasicInfo;
  const result = await ajax.post(path, basicInfo.value);
  if (ajax.checkErrorCode(result.errorCode)) {
    // 如果曾經有該班別的基本資料就不要進入步驟4而是直接進入成型機功能頁
    if (!adminStore.formingMachineLastBasicInfo) {
      step.value = 4
      adminStore.getFormingMachineBasicInfo(nowMachine.value ) // 更新store的資料
    } else {
      router.push({ name: 'FormingMachineFnEnter', query: { machine: nowMachine.value } })
    }
  } else {
    popMsg('新增基本資料失敗')
  }
}

// 送出生產啟動
function sendProductionStartUp() {
  router.push({ name: 'FormingMachineFnEnter', query: { machine: nowMachine.value } })
}

onMounted(() => {
  if (route.query.machine) {
    choiceMachine(route.query.machine)
  }
})
</script>
