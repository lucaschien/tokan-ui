<template>
  <div class="FormingMachineClean p-3">
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

    <h4 class="text-center mt-4 mb-4">機台清潔</h4>

    <div>
      <select class="form-select mb-4" v-model="choiceTable">
        <option :value="null">請選擇</option>
        <option value="2_S_004_02_2_3">成型機清潔檢查表</option>
        <option value="2_S_004_05_1_0_SF_170">SF-170成型機清潔檢查表</option>
      </select>

      <Table2_S_004_02_2_3 v-if="choiceTable === '2_S_004_02_2_3'"/>
      <Table2_S_004_05_1_0_SF_170 v-if="choiceTable === '2_S_004_05_1_0_SF_170'"/>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_S_004_02_2_3 from '@/components/tables/Table2_S_004_02_2_3.vue'
import Table2_S_004_05_1_0_SF_170 from '@/components/tables/Table2_S_004_05_1_0_SF_170.vue'

const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

const choiceTable = ref(null)


onMounted(() => {
  nowMachineId.value = route.query.machineId;
})


</script>