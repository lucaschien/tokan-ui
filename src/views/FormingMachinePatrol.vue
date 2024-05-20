<template>
  <div class="FormingMachinePatrol p-3">
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
    <h4 class="text-center mt-4 mb-4">巡查</h4>
    <div>
      <select class="form-select mb-4" v-model="choiceTable"
        @change="changeWork()">
        <option :value="null">請選擇</option>
        <!-- TODO... 11 號機器的成型機日報表使用: 2-M-011-13-1.4 SF-170成型機生產報表  -->
        <option v-if="nowMachine === '11'" value="2_M_011_13_1_4_SF_170">成型日報表部分項目</option>
        <option v-else value="2_M_011_03_2_8">成型日報表部分項目</option>

        <option value="2_Q_007_11_1_0">紙杯破壞試驗檢查表</option>
        <option value="2_Q_007_01_2_6">包裝膜檢查</option>
      </select>

      <div class="mb-3" >
        <button class="btn btn-primary p-4" v-if="!lookDetail && choiceTable"
          @click="lookDetail = true; lookDetailId='';">新增</button>
        <button class="btn btn-primary p-4" v-if="lookDetail && choiceTable"
          @click="lookDetail = false; lookDetailId='';">返回列表</button>
      </div>

      <!-- 包裝膜檢查 列表 -->
      <table class="table" v-if="!lookDetail && choiceTable === '2_Q_007_01_2_6'">
        <thead>
          <tr>
            <th width="200">#</th>
            <th>班別</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="'2_Q_007_01_2_6' + item.id">
            <td>{{ index+1 }}</td>
            <td>早班{{ index }}</td>
            <td>
              <button class="btn btn-outline-primary" @click="setDetailId('1111')">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="3">查無資料</td></tr>
        </tbody>
      </table>

      <Table2_M_011_13_1_4_SF_170 v-if="lookDetail && choiceTable === '2_M_011_13_1_4_SF_170'"/>
      <Table2_M_011_03_2_8 v-if="lookDetail && choiceTable === '2_M_011_03_2_8'"/>

      <Table2_Q_007_11_1_0 v-if="lookDetail && choiceTable === '2_Q_007_11_1_0'"/>

      <!-- 包裝膜檢查 -->
      <Table2_Q_007_01_2_6 v-if="lookDetail && choiceTable === '2_Q_007_01_2_6'"
        :detailId="lookDetailId" 
        :seccessCallback="tableModifyCall"/>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import moment from 'moment'

import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_M_011_13_1_4_SF_170 from '@/components/tables/Table2_M_011_13_1_4_SF_170.vue'
import Table2_M_011_03_2_8 from '@/components/tables/Table2_M_011_03_2_8.vue'
import Table2_Q_007_11_1_0 from '@/components/tables/Table2_Q_007_11_1_0.vue'
import Table2_Q_007_01_2_6 from '@/components/tables/Table2_Q_007_01_2_6.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

const choiceTable = ref(null)
const listData = ref([]) // 所有列表共用此變數
const listIsempty = ref(false)
const lookDetail = ref(false)
const lookDetailId = ref('')


// 切換巡查下拉選單
function changeWork() {
  listData.value = []
  listIsempty.value = false
  lookDetail.value = false
  lookDetailId.value = ''

  const param = {
    machineNumber: nowMachineId.value,
    productionDate: moment().format('YYYY-MM-DD')
  }

  // 撈取列表資料 依照不同下拉呼叫不同的函式
  get2_Q_007_01_2_6List(param)
}
// 撈取包裝膜檢查列表
async function get2_Q_007_01_2_6List(param) {
  const path = VITE_API_DOMAIN + api.moldingMachine.getPackagingBagInspections
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      listData.value = result.data;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg('新增列表資料失敗')
  }
}

// 設定要觀看的id
function setDetailId(id) {
  lookDetailId.value = id;
  lookDetail.value = true;
}

// 詳細頁儲存後的回呼韓式
function tableModifyCall () {
  lookDetailId.value = '';
  lookDetail.value = false;
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})
</script>