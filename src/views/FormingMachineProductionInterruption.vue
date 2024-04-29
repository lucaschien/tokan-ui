<template>
  <div class="FormingMachineProductionInterruption p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachine">
      <h1 class="me-5 mb-0">#{{ nowMachine }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
      <RouterBackBtn 
        :btn-text="'選擇其它功能'"
        :router-name="'FormingMachineFnEnter'"
        :router-query="{ 'machine': nowMachine }"
      />
    </div>

    <h4 class="text-center mt-4 mb-4">生產中斷</h4>

    <div class="custom-tables-box text-center">
      <h5 class="mb-4">當前狀態: 
        <template v-if="status === 'WORDKING'">生產中</template>
        <template v-if="status === 'INTERRUPTION'">待料中</template>
      </h5>

      <!-- 生產中畫面 -->
      <div class="row text-start mt-5" v-if="status === 'WORDKING'">
        <label class="form-label col-2">中斷原因</label>
        <div class="row col-8 mb-4">
          <div class="form-check col-3">
            <input class="form-check-input" type="radio" name="sample1" id="test1">
            <label class="form-check-label" for="test1">無排程</label>
          </div>
          <div class="form-check col-4">
            <input class="form-check-input" type="radio" name="sample1" id="test2">
            <label class="form-check-label" for="test2">原物料不足</label>
          </div>
        </div>
        <button class="btn btn-primary w-100 mt-5" @click="interruptionFn()">送出</button>
      </div>

      <!-- 中斷中畫面 -->
      <div class="text-center" v-if="status === 'INTERRUPTION'">
        <button class="btn btn-primary change-status-btn"
          @click="off()">關機</button>
        <button class="btn btn-success change-status-btn"
          @click="resumeWork()">恢復生產</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const openConfirm = inject('openConfirm')
const route = useRoute()

const nowMachine = ref(null)

onMounted(() => {
  nowMachine.value = route.query.machine;
})

const status = ref('WORDKING')

// 中斷生產
function interruptionFn() {
  popMsg('資料已送出', () => {
    status.value = 'INTERRUPTION'
  })
}

// 關機
function off() {
  openConfirm('確定關機？', () => {
    popMsg('TODO... 執行關機程序')
  })
}
// 
function resumeWork() {
  popMsg('已恢復生產作業', () => {
    status.value = 'WORDKING'
  })
}

</script>