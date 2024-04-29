<template>
  <div class="FormingMachinePatrol p-3">
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
    <h4 class="text-center mt-4 mb-4">巡查</h4>
    <div>
      <select class="form-select mb-4" v-model="choiceTable">
        <option :value="null">請選擇</option>
        <!-- TODO... 11 號機器的成型機日報表使用: 2-M-011-13-1.4 SF-170成型機生產報表  -->
        <option v-if="nowMachine === '11'" value="2_M_011_13_1_4_SF_170">成型日報表部分項目</option>
        <option v-else value="2_M_011_03_2_8">成型日報表部分項目</option>

        <option value="2_Q_007_11_1_0">紙杯破壞試驗檢查表</option>
        <option value="2_Q_007_01_2_6">包裝膜檢查</option>
      </select>

      
      <Table2_M_011_13_1_4_SF_170 v-if="choiceTable === '2_M_011_13_1_4_SF_170'"/>
      <Table2_M_011_03_2_8 v-if="choiceTable === '2_M_011_03_2_8'"/>
      
      <Table2_Q_007_11_1_0 v-if="choiceTable === '2_Q_007_11_1_0'"/>
      <Table2_Q_007_01_2_6 v-if="choiceTable === '2_Q_007_01_2_6'"/>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_M_011_13_1_4_SF_170 from '@/components/tables/Table2_M_011_13_1_4_SF_170.vue'
import Table2_M_011_03_2_8 from '@/components/tables/Table2_M_011_03_2_8.vue'
import Table2_Q_007_11_1_0 from '@/components/tables/Table2_Q_007_11_1_0.vue'
import Table2_Q_007_01_2_6 from '@/components/tables/Table2_Q_007_01_2_6.vue'

const route = useRoute()

const nowMachine = ref(null)

const choiceTable = ref(null)

onMounted(() => {
  nowMachine.value = route.query.machine;
})


</script>