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
      <select class="form-select mb-4" v-if="!lookDetail"
        v-model="choiceTable"
        @change="changeWork()">
        <option :value="null">請選擇</option>
        <!-- TODO... 11 號機器的成型機日報表使用: 2-M-011-13-1.4 SF-170成型機生產報表  -->
        <option v-if="nowMachine === '11'" value="2_M_011_13_1_4_SF_170">成型日報表部分項目</option>
        <option v-else value="2_M_011_03_2_8">成型日報表部分項目</option>

        <option value="2_Q_007_11_1_0">紙杯破壞試驗檢查表</option>
        <option value="2_Q_007_01_2_6">包裝膜檢查</option>
      </select>

      <hr>

      <div class="mb-3">
        <div class="d-flex" v-if="!lookDetail && choiceTable">
          <select class="form-select text-center" style="width: 150px;" v-model="createType">
            <option value="MORNING">早班</option>
            <option value="AFTERNOON">午班</option>
            <option value="NIGHT">晚班</option>
          </select>
          <button class="btn btn-primary p-4 ms-1" :disabled="canUseCreateBtn"
            @click="lookDetail = true; lookDetailItem=null;">新增</button>
        </div>
        <button class="btn btn-primary p-4" v-if="lookDetail && choiceTable"
          @click="backList()">返回列表</button>
      </div>

      <!-- 列表 -->
      <template v-if="!lookDetail">
        <!-- 成型日報表部分項目 列表 -->

        <!-- 紙杯破壞試驗檢查表 列表 -->
        <table class="table" v-if="choiceTable === '2_Q_007_11_1_0'">
          <thead>
            <tr>
              <th width="80">#</th>
              <th width="250">生產日期</th>
              <th width="200">班別</th>
              <th>組長</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fs-1">1</td>
              <td class="fs-3">2024-10-10</td>
              <td class="fs-3">早班</td>
              <td>假的開發中</td>
              <td>
                <button class="btn btn-outline-primary" @click="setDetailObj('2222')">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 包裝膜檢查 列表 -->
        <table class="table" v-if="choiceTable === '2_Q_007_01_2_6'">
          <thead>
            <tr>
              <th width="200">#</th>
              <th>班別</th>
              <th>檢查結果</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="'2_Q_007_01_2_6' + item.shift">
              <td class="fs-1">{{ index+1 }}</td>
              <td class="fs-3">
                <template v-if="item.shift === 'MORNING'">早班</template>
                <template v-if="item.shift === 'AFTERNOON'">午班</template>
                <template v-if="item.shift === 'NIGHT'">晚班</template>
                {{ item.inspectionTime.slice(0,5) }}
              </td>
              <td>
                <div>印字正常: {{ item.normalPrint }}</div>
                <div>印刷外觀正常: {{ item.normalPrintAppearance }}</div>
                <div>包裝背封良好: {{ item.goodPackagingBackSeal }}</div>
                <div>包裝上封口良好: {{ item.goodPackagingUpperSeal }}</div>
                <div>包裝下封口良好: {{ item.goodPackagingLowerSeal }}</div>
                <div>包裝袋寬幅正常: {{ item.normalPackagingBagWidth }}</div>
              </td>
              <td>
                <button class="btn btn-outline-primary" @click="setDetailObj(item)">
                  <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="4">查無資料</td></tr>
          </tbody>
        </table>
      </template>

      <!-- 內頁 -->
      <template v-if="lookDetail">
        <Table2_M_011_13_1_4_SF_170 v-if="choiceTable === '2_M_011_13_1_4_SF_170'"/>
        <Table2_M_011_03_2_8 v-if="choiceTable === '2_M_011_03_2_8'"/>

        <!-- 紙杯破壞試驗檢查表 -->
        <Table2_Q_007_11_1_0 v-if="choiceTable === '2_Q_007_11_1_0'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />

        <!-- 包裝膜檢查 -->
        <Table2_Q_007_01_2_6 v-if="choiceTable === '2_Q_007_01_2_6'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, nextTick } from 'vue'
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
const lookDetailItem = ref(null)

const createType = ref('MORNING') // 新增樣式下拉選單

// computed
const canUseCreateBtn = computed(() => {
  let re = false;
  listData.value.forEach((item) => {
    if (createType.value === item.shift) {
      re = true;
    }
  });
  return re;
});

// 切換巡查下拉選單
function changeWork() {
  listData.value = []
  listIsempty.value = false
  lookDetail.value = false
  lookDetailItem.value = null

  const param = {
    machineId: nowMachineId.value,
    productionDate: moment().format('YYYY-MM-DD')
  }
  
  // 撈取列表資料 依照不同下拉呼叫不同的函式
  // 包裝膜
  if (choiceTable.value === '2_Q_007_01_2_6') {
    get2_Q_007_01_2_6List(param)
  }
}
// 撈取包裝膜檢查列表
async function get2_Q_007_01_2_6List(param) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getPackagingBagInspections
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

// 設定要觀看的物件
function setDetailObj(item) {
  lookDetailItem.value = item;
  nextTick(() => {
    lookDetail.value = true;
  })
}

// 詳細頁儲存後的回呼韓式
function tableModifyCall () {
  lookDetailItem.value = null;
  nextTick(() => {
    lookDetail.value = false;
    changeWork();
  });
}

function backList() {
  lookDetailItem.value = null;
  nextTick(() => {
    lookDetail.value = false; 
    changeWork();
  })
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})
</script>