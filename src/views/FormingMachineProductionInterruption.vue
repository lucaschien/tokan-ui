<template>
  <div class="FormingMachineProductionInterruption p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ nowFormingMachineInfo.name }}</h1>
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
      <h5 class="mb-4">當前狀態: {{ clientStore.statusName[nowFormingMachineInfo.status] }}</h5>

      <!-- 生產中畫面 -->
      <div class="row text-start mt-5">
        <label class="form-label col-12">中斷原因
          <span class="fs-3">Lựa chọn hạng mục gián đoạn sản xuất</span>
        </label>
        <div class="row col-12 mb-4">
          <div class="form-check col-12">
            <input class="form-check-input" type="radio" 
              name="reason" id="noSchedule" value="noSchedule"
              v-model="stopReason">
            <label class="form-check-label" for="noSchedule">無排程 <span class="fs-3">Không sắp xếp qui trình</span></label>
          </div>
          <div class="form-check col-12">
            <input class="form-check-input" type="radio" 
              name="reason" id="noMaterials" value="noMaterials"
              v-model="stopReason">
            <label class="form-check-label" for="noMaterials">原物料不足 <span class="fs-3">Nguyên vật liệu không đủ</span></label>
          </div>
        </div>
        <button class="btn btn-primary w-100 mt-5" 
          @click="send()">送出</button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const router = useRouter();
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

// 中斷原因
const stopReason = ref(null)

// 送出
function send() {
  if (stopReason.value === 'noSchedule') { 
    popMsg('執行關機程序...');
    shutDown();
  }

  if (stopReason.value === 'noMaterials') {
    // 只切換黃色人機介面文字
    clientStore.setHumanMachineStatusDisplay('待料中', 'DISABLE', nowMachineId.value, () => {
      const param = {
        id: nowMachineId.value, 
        buttonType: 'DISABLE', 
        message: '待料中', 
        provisionStatus: 'AWAITING_MATERIAL'
      }
      clientStore.lockProduction(param, () => {
        router.push({ name: 'FormingMachine' });
      });
      // clientStore.lockAndUnlockButton('待料中', 'DISABLE', nowMachineId.value, () => {
      //   router.push({ name: 'FormingMachine' });
      // });
    });
  }
}

// 關機
async function shutDown() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.startAndStopMachine
  const param = {
    provisionId: nowMachineId.value,
    buttonType: "DISABLE",
    message: "關機中",
    provisionStatus: "MACHINE_CLOSED"
  };
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('執行關機成功')
    router.push({ name: 'FormingMachine' });
  } else {
    popMsg('執行關機失敗')
  }
}

</script>