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
            <lable class="form-label">組長</lable>
            <input class="form-control" type="text" v-model="dataModel.aaa">
          </div>
          <div class="col-6">
            <lable class="form-label">裁切人員</lable>
            <input class="form-control" type="text" v-model="dataModel.bbb">
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-6">
            <lable class="form-label">杯身紙台車編號</lable>
            <input class="form-control" type="text" v-model="dataModel.ccc">
          </div>
          <div class="col-6">
            <lable class="form-label">杯底紙編號</lable>
            <input class="form-control" type="text" v-model="dataModel.ddd">
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-12">
            <lable class="form-label">原紙種類</lable>
            <div class="row ps-1">
              <div class="form-check col-2">
                <input class="form-check-input" 
                  type="radio" 
                  name="testPaper" 
                  id="testPaper1">
                <label class="form-check-label" for="testPaper1">
                  一般原紙
                </label>
              </div>
              <div class="form-check col-2">
                <input class="form-check-input" 
                  type="radio" 
                  name="testPaper" 
                  id="testPaper2">
                <label class="form-check-label" for="testPaper2">
                  FSC
                </label>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn btn-primary w-100 mt-4"
          @click="sned()">送出生產啟動</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  // TODO... 之後應該要放到 pinia & cookie 去記錄, 或是之後放到url上
  nowMachine.value = item
  step.value = 2
  getMachineStatus()
}
// 重新選擇機器
function backChoiceMachine() {
  nowMachine.value = null
  // 生產基本資料恢復預設值
  resetDataModel()
  // 回到界面步驟 1
  step.value = 1
}


// 生產基本資料
const dataModel = ref({
  aaa: '', // 組長
  bbb: '', // 裁切人員
  ccc: '', // 杯身紙台車編號
  ddd: '', // 杯底紙編號
  eee: '', // FSC/一般原紙
})
function resetDataModel() {
  dataModel.value.aaa = ''
  dataModel.value.bbb = ''
  dataModel.value.ccc = ''
  dataModel.value.ddd = ''
  dataModel.value.eee = ''
}
function sned() {
  router.push({ name: 'FormingMachineFnEnter', query: { machine: nowMachine.value } })
}


</script>
