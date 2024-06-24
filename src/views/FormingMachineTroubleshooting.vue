<template>
  <div class="FormingMachineTroubleshooting p-3">
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

    <h4 class="text-center mt-4 mb-4">故障排除</h4>

    <div class="mb-3">
      <div class="d-flex" v-if="!lookDetail">
        <select class="form-select text-center" style="width: 150px;"
          v-model="createType"
          @change="searchList()">
          <option value="MORNING">早班</option>
          <option value="AFTERNOON">午班</option>
          <option value="NIGHT">晚班</option>
        </select>
        <button class="btn btn-primary p-4 ms-1" :disabled="canUseCreateBtn"
          @click="lookDetail = true;">新增</button>
      </div>
      <button class="btn btn-primary p-4" v-if="lookDetail"
        @click="backList()">返回列表</button>
    </div>

    <!-- 列表 -->
    <template v-if="!lookDetail">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>班別</th>
            <th>生產日期</th>
            <th>原紙種類</th>
            <th>處理人員</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="'list'+index">
            <td class="fs-1">{{index + 1}}</td>
            <td class="fs-3">{{ clientStore.shiftName[item.shift] }}</td>
            <td class="fs-3">{{ item.productionDate }}</td>
            <td class="fs-3">
              <template v-if="item.paperType === 'GENERAL'">一般原紙</template>
              <template v-if="item.paperType === 'FSC'">FSC</template>
            </td>
            <td class="fs-3">{{ item.issueHandlingPersonnel }}</td>
            <td>
              <button class="btn btn-outline-primary" @click="enterDetail(item)">
                <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="6">查無資料</td></tr>
        </tbody>
      </table>
    </template>

    <!-- 內頁 -->
    <div class="custom-tables-box" v-if="lookDetail">
      <div class="mb-3 row">
        <label class="form-label col-4">班別</label>
        <div class="col-8">
          <template>{{ clientStore.shiftName[dataModel.shift] }}</template>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">原紙種類</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.paperType" disabled>
          <option value="GENERAL">一般原紙</option>
          <option value="FSC">FSC</option>
        </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">生產日期</label>
        <div class="col-8">
          <input type="date" class="form-control" v-model="dataModel.productionDate">
        </div>
      </div>

      <div class="mb-3 row">
        <label class="form-label col-4">狀況處理單位</label>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="PRODUCTION" name="issueHandlingUnit" id="issueHandlingUnit_PRODUCTION">
          <label class="form-check-label" for="issueHandlingUnit_PRODUCTION">生產</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="MAINTENANCE" name="issueHandlingUnit" id="issueHandlingUnit_MAINTENANCE">
          <label class="form-check-label" for="issueHandlingUnit_MAINTENANCE">維修</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="MANAGEMENT" name="issueHandlingUnit" id="issueHandlingUnit_MANAGEMENT">
          <label class="form-check-label" for="issueHandlingUnit_MANAGEMENT">管理</label>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="form-label col-4">處理人員</label>
        <div class="col-8">
          <input class="form-control" type="text" v-model="dataModel.issueHandlingPersonnel">
          <!-- <select class="form-select" v-model="dataModel.issueHandlingPersonnel">
            <option value="">請選擇</option>
            <option v-for="item in workerList" :key="item.id"
              :value="item.name">{{ item.name }}</option>
          </select> -->
        </div>
      </div>

      <div class="mb-3 row">
        <label class="form-label col-4">故障原因登載</label>
        <div class="col-8">
          <textarea class="form-control" row="3"
            v-model="dataModel.remarksAndIssueReport1"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">故障排除記錄</label>
        <div class="col-8">
          <textarea class="form-control" row="3"
            v-model="dataModel.remarksAndIssueReport2"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">零件更換記錄</label>
        <div class="col-8">
          <textarea class="form-control" row="3"
            v-model="dataModel.remarksAndIssueReport3"></textarea>
        </div>
      </div>

      <button class="btn btn-primary w-100 mt-4" 
        :disabled="!canSave"
        @click="save()">送出</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import moment from 'moment'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const listData = ref([])
const listIsempty = ref(false)
const lookDetail = ref(false)

const createType = ref('MORNING') // 新增樣式下拉選單

function backList() {
  dataModel.value = JSON.parse(JSON.stringify(defaultDataModel));
  lookDetail.value = false; 
  searchList(); 
}

// 列表查詢
async function searchList() {
  listIsempty.value = false;
  listData.value = [];
  // 要區分機器類型
  const path = VITE_API_DOMAIN + ((nowFormingMachineInfo.value.provisionType === "FORMING")
    ? formatPath(api.fmoldingMachine.getList, 'getInspectionMoldingMachineProductions')
    : formatPath(api.fmoldingMachine.getList, 'getInspectionSF170MoldingMachineProductions'));
  const param = {
    machineId: nowMachineId.value,
    shift: createType.value,
    productionDate: moment().format('YYYY-MM-DD')
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      listData.value = result.data;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg(result.errorCode)
  }
}

// 是否可以使用新增按鈕
const canUseCreateBtn = computed(() => {
  let re = false;
  listData.value.forEach((item) => {
    if (createType.value === item.shift) {
      re = true;
    }
  });
  return re;
});

function enterDetail(item) {
  lookDetail.value = true;
  dataModel.value.productionDate = item.productionDate;
  dataModel.value.paperType = item.paperType;
  dataModel.value.issueHandlingUnit = item.issueHandlingUnit;
  dataModel.value.issueHandlingPersonnel = item.issueHandlingPersonnel;
  dataModel.value.remarksAndIssueReport1 = item.remarksAndIssueReport1;
  dataModel.value.remarksAndIssueReport2 = item.remarksAndIssueReport2;
  dataModel.value.remarksAndIssueReport3 = item.remarksAndIssueReport3;
}


// 內頁資料 model
const dataModel = ref({
  machineId: route.query.machineId,
  shift: createType.value, // 班別
  productionDate: '', // 生產日期
  paperType: clientStore.lastMaterial.paperType, // 原紙種類
  issueHandlingUnit: '', // 狀況處理單位
  issueHandlingPersonnel: '', // 處理人員
  remarksAndIssueReport1: '', // 故障原因登載
  remarksAndIssueReport2: '', // 故障排除記錄
  remarksAndIssueReport3: '', // 零件更換記錄
});
const defaultDataModel = JSON.parse(JSON.stringify(dataModel.value));

// 內頁的作業人員下拉人員清單
const workerList = ref([]);
async function getMoldingWorkerList() {
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.roleUserList, 'MOLDING_WORKER');
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    workerList.value = result.data;
  } else {
    popMsg('撈取作業人員下拉人員清單失敗');
  }
}

// 內頁是否可儲存
const canSave = computed(() => {
  let re = true;
  if (!dataModel.value.productionDate || !dataModel.value.issueHandlingUnit || !dataModel.value.issueHandlingPersonnel) {
    re = false;
  }
  return re;
})

// 儲存內頁 (新增修改共用)
async function save() {
  // 要區分是一般機器還是SF170機器
  const path = VITE_API_DOMAIN + ((nowFormingMachineInfo.value.provisionType === "FORMING")
    ? api.fmoldingMachine.updateFaultResolution 
    : api.fmoldingMachine.updateSF170FaultResolution);
  const result = await ajax.post(path, dataModel.value)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出')
    backList();
  } else {
    popMsg(result.errorCode)
  }
}


onMounted(() => {
  nowMachineId.value = route.query.machineId;
  searchList();
  getMoldingWorkerList();
})

</script>