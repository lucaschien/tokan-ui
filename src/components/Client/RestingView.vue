<template>
  <div class="resting-view">
    <span>休息中</span>
    <button class="choice-other-btn" 
      @click="props.closeCall(); router.push({name:'FormingMachine'})">選擇其它機號</button> 
    <button class="start-work-btn"
      @click="reStartWork()">恢復生產</button> 
  </div>
</template>

<script setup>

import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'

const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()

const props = defineProps({
  nowMachineId: {
    type: String,
    required: true,
  },
  closeCall: {
    type: Function,
    default: () => {}
  }
});

// 恢復生產
function reStartWork() {
  openConfirm('確認恢復生產?', () => {
    const param = {
      id: props.nowMachineId, 
      buttonType: 'ENABLE', 
      message: '生產中', 
      provisionStatus: 'IN_PRODUCTION'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId);
    });
  });
}
</script>