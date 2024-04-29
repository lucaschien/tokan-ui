<template>
  <div class="FormingMachineClean p-3">
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
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_S_004_02_2_3 from '@/components/tables/Table2_S_004_02_2_3.vue'
import Table2_S_004_05_1_0_SF_170 from '@/components/tables/Table2_S_004_05_1_0_SF_170.vue'

const popMsg = inject('popMsg')
const route = useRoute()

const nowMachine = ref(null)

const choiceTable = ref(null)


onMounted(() => {
  nowMachine.value = route.query.machine;
})


</script>