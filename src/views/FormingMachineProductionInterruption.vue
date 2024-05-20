<template>
  <div class="FormingMachineProductionInterruption p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ oneFormingMachineInfo.name }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
      <RouterBackBtn 
        :btn-text="'選擇其它功能'"
        :router-name="'FormingMachineFnEnter'"
        :router-query="{ 'machineId': nowMachineId }"
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
            <input class="form-check-input" type="radio" 
              name="reason" id="noSchedule" value="noSchedule"
              v-model="stopReason">
            <label class="form-check-label" for="noSchedule">無排程</label>
          </div>
          <div class="form-check col-4">
            <input class="form-check-input" type="radio" 
              name="reason" id="noMaterials" value="noMaterials"
              v-model="stopReason">
            <label class="form-check-label" for="noMaterials">原物料不足</label>
          </div>
        </div>
        <button class="btn btn-primary w-100 mt-5" 
          @click="interruptionFn()">送出</button>
      </div>

      <!-- 中斷畫面 -->
      <div class="text-center" v-if="status === 'INTERRUPTION'">
        <button class="btn btn-success change-status-btn"
          @click="resumeWork()">恢復生產</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const router = useRouter();
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

const status = ref('WORDKING')

const stopReason = ref(null)

// 送出
function interruptionFn() {
  if (stopReason.value === 'noSchedule') { 
    popMsg('執行關機程序', () => {
      // 返回選擇成型機單元
      router.push({ name: 'FormingMachine' })
    })
  }

  if (stopReason.value === 'noMaterials') {
    popMsg('資料已送出', () => {
      status.value = 'INTERRUPTION'
      stopReason.value = null
    })
  }
}

// 恢復生產
function resumeWork() {
  popMsg('已恢復生產作業', () => {
    status.value = 'WORDKING'
  })
}

</script>