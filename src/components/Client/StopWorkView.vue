<template>
  <div class="StopWorkView" v-if="haveStopWords">
    <span>{{ haveStopWords }}</span>
    <button class="choice-other-btn" 
      @click="props.closeCall(); router.push({name:'FormingMachine'})">選擇其它機號</button> 
    <button class="start-work-btn"
      @click="reStartWork()">恢復生產 <span class="fs-4">Phục hồi sản xuất</span></button> 
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'

const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()

const props = defineProps({
  nowMachineId: {
    type: String,
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

// 是否進入停止作業中的介面
const haveStopWords = computed(() => {
  if (!props.nowMachineId) {
    return false;
  }
  let temp = null;
  if (clientStore.nowFormingMachineInfo) {
    temp = clientStore.nowFormingMachineInfo; // 在成型機功能頁
  } else {
    temp = clientStore.formingMachineList.filter(item => item.id === props.nowMachineId)[0]; // 在選擇機器頁
  }
  // 休息中, 模具更換, 停機待修  需要出現停止作業中的介面
  if (
    temp.status === 'RESTING' || 
    temp.status === 'MOLD_CHANGE' || 
    temp.status === 'MACHINE_STOPPED_FOR_REPAIR' ||
    temp.status === 'AWAITING_MATERIAL'
  ) {
    return clientStore.statusName[temp.status]; // 狀態文字
  }
  return false;
});
</script>