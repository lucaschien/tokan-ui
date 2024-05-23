<template>
  <div class="FormingMachineFnEnter p-3">
    <!-- 功能介面 -->
    <template v-if="!enterRestingView">
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
          <RouterLink class="flex-column"
            :to="{ name: 'FormingMachinePicking', query: { machineId: nowMachineId }}">領料
            <span class="fs-3">nhận nguyên liệu</span>
          </RouterLink>
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
          <a href="javascript:;"
          @click="confirmToBreak()">休息中</a>
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
    </template>
    <!-- 休息中介面 -->
    <div class="resting-view" v-if="enterRestingView">
      <span>{{ oneFormingMachineInfo.name }}休息中</span>
      <button class="choice-other-btn" 
        @click="router.push({name:'FormingMachine'})">選擇其它機號</button> 
      <button class="start-work-btn"
        @click="reStartWork()">恢復生產</button> 
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import { popMsg } from '@/common/alert';

const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料
const enterRestingView = ref(false) // 進入休息中的介面


// 模具更換
function moldReplacement() {
  openConfirm('確認模具更換?', () => {
    alert('TODO... 執行相關流程')
  })
}

// 停機待修
function shutdownAndRepair() {
  openConfirm('確認停機與請求待修?', () => {
    alert('TODO... 執行相關流程')
  })
}

// 關機
function shutDown() {
  openConfirm('確認關機?', () => {
    alert('TODO... 執行相關流程')
  })
}

// 休息中
function confirmToBreak() {
  openConfirm('確認休息?', () => {
    clientStore.setHumanMachineStatusDisplay('休息中', 'DISABLE', null, () => {
      clientStore.lockAndUnlockButton('休息中', 'DISABLE', null, () => {
        clientStore.changeStatus(route.query.machineId, 'RESTING', () => {
          clientStore.getFormingMachineInfo(route.query.machineId);
        });
      });
    });
  })
}

// 恢復生產
function reStartWork() {
  openConfirm('確認恢復生產?', () => {
    clientStore.setHumanMachineStatusDisplay('生產中', 'ENABLE', null, () => {
      clientStore.lockAndUnlockButton('生產中', 'ENABLE', null, () => {
        clientStore.changeStatus(route.query.machineId, 'INITIAL', () => {
          clientStore.getFormingMachineInfo(route.query.machineId);
        });
      });
    });
  });
}


// watch
watch(() => oneFormingMachineInfo.value, (newVal) => {
  console.log('watch newVal....', newVal)
  // 是休息中進入休息中的介面
  if (newVal.status === 'RESTING') {
    enterRestingView.value = true;
  } else {
    enterRestingView.value = false;
  }
});


onMounted(() => {
  nowMachineId.value = route.query.machineId;
  // IN_PRODUCTION  RESTING
  if (oneFormingMachineInfo.value.status === 'RESTING') {
    enterRestingView.value = true;
  }
})
</script>