<template>
  <div class="FormingMachineClean p-3">
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

    <h4 class="text-center mt-4 mb-4">機台清潔</h4>
    nowFormingMachineInfo: {{ nowFormingMachineInfo }}

    <!-- 列表頁 -->
    <div v-if="!lookDetail">
      <div class="d-flex justify-content-between mb-2">
        <select class="form-select text-center me-3" style="width: 150px;" 
          v-model="cycleType"
          @change="getList()">
          <option value="DAILY">每日</option>
          <option value="WEEKLY">每週</option>
          <option value="BI_WEEKLY" v-if="nowFormingMachineInfo.provisionType === 'FORMING'">每兩週</option>
        </select>
        <button class="btn btn-primary p-4"
          @click="lookDetail = true;">新增</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>日期</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in listData" :key="'list' + i">
            <td>{{(i + 1)}}</td>
            <td>{{ item.inspectionDate }}</td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="2">查無資料</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 內頁 -->
    <div v-if="lookDetail">
      <button class="btn btn-primary p-4 mb-2"
        @click="lookDetail = false; getList();">返回列表</button>
      <Table2_S_004_02_2_3 v-if="nowFormingMachineInfo.provisionType === 'FORMING'"
        :saveCallback="() => {
          lookDetail = false;
          getList();
        }"/>
      <Table2_S_004_05_1_0_SF_170 v-if="nowFormingMachineInfo.provisionType === 'FORMING_SF170'"
        :saveCallback="() => {
          lookDetail = false;
          getList();
        }"/> 
    </div>

  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root';
import { useClientStore } from '@/stores/ClientStore'
import { api, formatPath } from '@/common/api';
import { ajax } from '@/common/ajax';
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_S_004_02_2_3 from '@/components/tables/Table2_S_004_02_2_3.vue'
import Table2_S_004_05_1_0_SF_170 from '@/components/tables/Table2_S_004_05_1_0_SF_170.vue'
import moment from 'moment';

const route = useRoute()
const rootStore = useRootStore()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const popMsg = inject('popMsg')

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const listData = ref([]);
const listIsempty = ref(false);
const lookDetail = ref(false); // 是否進入詳細頁

const cycleType = ref('DAILY');

async function getList() {
  const Y = moment().format('YYYY');
  const M = moment().format('MM');
  const path = VITE_API_DOMAIN + ((nowFormingMachineInfo.value.provisionType === 'FORMING') 
    ? formatPath(api.fmoldingMachine.getMoldingMachineCleaningInspections, cycleType.value)
    : formatPath(api.fmoldingMachine.getSF170MoldingMachineCleaningInspections, cycleType.value));
  const param = {
    machineId: nowMachineId.value,
    date: `${Y}-${M}-01`,
    inspectionRole: rootStore.loginUserInfo.roleCode
  };
  listIsempty.value = false;
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    listData.value = result.data;
    if (!result.data.length) {
      listIsempty.value = true;
    }
  } else {
    popMsg('查詢失敗')
  }
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
  getList();
})
</script>