<template>
  <div class="ClientFull">
    <ClientHeader/>
    <div class="wrapper" v-if="init">
      <template v-if="isFormingMachine && !formingMachineList.length">
        <div class="fs-1 text-center pt-5">無任何成型機資料</div>
      </template>
      <RouterView v-else/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import ClientHeader from '@/components/Client/ClientHeader.vue'
import { useRootStore } from '@/stores/root'
import { useClientStore } from '@/stores/ClientStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const rootStore = useRootStore()
const clientStore = useClientStore()

const init = ref(false)
// 這些是作為在哪一個單元F5的判斷用
const isFormingMachine = ref(false) // 是否為成型機單元
const formingMachineList = computed(() => clientStore.getFormingMachineList)

// 更新前端判斷當前時段的班別
clientStore.checkNowShift()

onMounted( async() => {
  await rootStore.getLoginUserInfoData() // 登入者資訊
  await clientStore.getFormingMachinList() // 成型機列表
  
  // 處理成型機相關
  if (route.query.machineId) {
    isFormingMachine.value = true
    const nowForminMachine = clientStore.formingMachineList.filter(item => item.id === route.query.machineId)
    if (nowForminMachine.length) {
      const temp = nowForminMachine[0]
      await clientStore.getFormingMachineInfo(temp.id)
      await clientStore.getFormingMachineBasicInfo(temp.id)
    }
    init.value = true
  }

  // TODO... 這邊之後還要處理不同單元的url參數
  //...

  // 最後設定初始化完成
  init.value = true
});
</script>
