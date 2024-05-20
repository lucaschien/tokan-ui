<template>
  <div class="FormingMachineFnEnter p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ oneFormingMachineInfo.name }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
    </div>
    <div class="card-box">
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachinePatrol', query: { machineId: nowMachineId }}">巡查</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineHandover', query: { machineId: nowMachineId }}">工作交接</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachinePicking', query: { machineId: nowMachineId }}">領料</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineWaterLeakageAdjustment', query: { machineId: nowMachineId }}">漏水調機</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineTroubleshooting', query: { machineId: nowMachineId }}">故障排除</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineReplaceProduct', query: { machineId: nowMachineId }}">更換產品</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineRestSwitch', query: { machineId: nowMachineId }}">休息狀態切換</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineClean', query: { machineId: nowMachineId }}">機台清潔</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;"
          @click="moldReplacement()">模具更換</a>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;"
          @click="shutdownAndRepair()">停機待修</a>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachineProductionInterruption', query: { machineId: nowMachineId } }">生產中斷</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;"
          @click="shutDown()">關機</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const openConfirm = inject('openConfirm')
const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

//
function moldReplacement() {
  openConfirm('確認模具更換?', () => {
    alert('TODO... 執行相關流程')
  })
}

//
function shutdownAndRepair() {
  openConfirm('確認停機與請求待修?', () => {
    alert('TODO... 執行相關流程')
  })
}

// 
function shutDown() {
  openConfirm('確認關機?', () => {
    alert('TODO... 執行相關流程')
  })
}

</script>