<template>
  <div class="FormingMachineHandover p-3">
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

    <h4 class="text-center mt-4 mb-4">工作交接</h4>
    
    <div>
      <select class="form-select mb-4" v-model="workingType">
        <option :value="'MonitoringItems'"><template v-if="nowFormingMachineInfo.provisionType === 'FORMING_SF170'">SF170成型</template>監控項目確認</option>
        <option :value="'TeamLeaderWorkHandover'">組長工作交接事項</option>
        <option :value="null">工作交接完成</option>
      </select>
    </div>

    <!-- 監控項目確認 -->
    <MonitoringItems v-if="workingType === 'MonitoringItems'"/>
    <!-- 組長工作交接事項 -->
    <TeamLeaderWorkHandover v-if="workingType === 'TeamLeaderWorkHandover'"/>
    <!-- 工作交接完成 -->
    <div class="pt-3 text-center" v-if="!workingType">
      <div class="row mb-3">
        <label class="form-label col-4">生產日期</label>
        <div class="col-8 d-flex">
          <input class="form-control" type="date" v-model="complateModel.date"/>
        </div>
      </div>
      <div class="row mb-3">
        <label class="form-label col-4">班別</label>
        <div class="col-8 d-flex">
          <select class="form-select" v-model="complateModel.shift">
            <option value="">請選擇</option>
            <option v-for="(value, key) in clientStore.shiftName"
              :value="key" 
              :key="'shift'+key">{{ value }}</option>
          </select>
        </div>
      </div>
      <p class="fs-4">工作交接均已填寫完畢點擊切換機器狀態</p>
      <button class="btn btn-primary p-5 fs-1 mb-5" :disabled="!complateModel.date || !complateModel.shift"
        @click="triggerCompleted()">工作交接完成</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import MonitoringItems from '@/components/Client/FormingMachineHandover/MonitoringItems.vue'
import TeamLeaderWorkHandover from '@/components/Client/FormingMachineHandover/TeamLeaderWorkHandover.vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'

const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null);
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const workingType = ref(null);
const complateModel = ref({
  date: '',
  shift: clientStore.nowShift
})

async function triggerCompleted() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.completeHandOver;
  const param = {
    machineId: nowMachineId.value,
    shift: complateModel.value.shift,
    productionDate: complateModel.value.date,
    moldingMachineType: nowFormingMachineInfo.value.provisionType
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    // 做細部的錯誤呈現
    if (!result.data.isValid) {
      const errorMsg = [];
      result.data.validateResults.forEach((item, i) => {
        if (item.errorReason) {
          errorMsg.push(`錯誤${i+1}: ${item.errorReason}<br>`);
        }
        if (item.errorColumns.length) {
          let temp = `錯誤${i+1}請檢查這些欄位資料: ${item.errorColumns}<br>`;
          errorMsg.push(temp)
        }
      });
      popMsg(errorMsg.join(' '));
      return
    }

    // 沒有錯走以下程序
    const param = {
      id: nowMachineId.value, 
      buttonType: 'ENABLE', 
      message: '生產中', 
      provisionStatus: 'IN_PRODUCTION'
    };
    clientStore.launchProduction(param, () => {
      popMsg('工作交接完成');
      router.push({ 
        name: 'FormingMachineFnEnter',
        query: {
          machineId: nowMachineId.value
        } 
      })
    });
  } else {
    popMsg(result.errorCode)
  }
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})
</script>