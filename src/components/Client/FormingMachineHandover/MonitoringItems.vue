<template>
  <div class="MonitoringItems">

    <div class="mb-3">
      <select class="form-select text-center" v-if="!lookDetail"
        style="width: 150px; height: 86px;"
        v-model="shiftType"
        @change="searchList()">
        <option v-for="(value, key) in clientStore.shiftName"
          :value="key" 
          :key="'shift'+key">{{ value }}</option>
      </select>
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
            <td>
              <button class="btn btn-outline-primary" @click="enterDetail(item)">
                <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="5">查無資料</td></tr>
        </tbody>
      </table>
    </template>

    <!-- 內頁 -->
    <div class="custom-tables-box" v-if="lookDetail">
      <div class="mb-5">
        <div class="mb-3 row" v-for="item in monitoringItems" :key="item.id">
          <label class="form-label col-4">{{ item.itemName }}</label>
          <div class="col-8 d-flex">
            <div class="form-check">
              <input class="form-check-input" v-model="item.status"
                type="radio" :name="item.id" value="Y" :id="'Y'+item.id"
                @change="item.data = ''">
              <label class="form-check-label" :for="'Y'+item.id">正常</label>
            </div>
            <input class="form-control ms-2 me-3" v-model="item.data"
              :disabled="item.status !== 'Y'"
              style="width: 25%;" type="text">
            <div class="form-check me-3">
              <input class="form-check-input" v-model="item.status"
                type="radio" :name="item.id" value="N" :id="'N'+item.id"
                @change="item.data = ''">
              <label class="form-check-label" :for="'N'+item.id">異常</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" v-model="item.status"
                type="radio" :name="item.id" value="NA" :id="'NA'+item.id"
                @change="item.data = ''">
              <label class="form-check-label" :for="'NA'+item.id">NA</label>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary w-100 mt-4"
        @click="saveMonitorItem()">送出</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
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

const shiftType = ref(clientStore.nowShift)

function backList() {
  detailItem.value = null;
  lookDetail.value = false; 
  searchList(); 
}

// 列表查詢
async function searchList () {
  listIsempty.value = false;
  listData.value = [];
  // 要區分機器類型
  const path = VITE_API_DOMAIN + ((nowFormingMachineInfo.value.provisionType === "FORMING")
    ? formatPath(api.fmoldingMachine.getHandoverList, 'getInspectionMoldingMachineProductions')
    : formatPath(api.fmoldingMachine.getHandoverList, 'getInspectionSF170MoldingMachineProductions'));
  
  const param = {
    machineId: nowMachineId.value,
    shift: shiftType.value,
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

// 內頁資料 model
const detailItem = ref(null);

function enterDetail(item) {
  detailItem.value = item;
  getMonitoringItems();
  lookDetail.value = true;
}

// 取得監控項目清單
const monitoringItems = ref([]);
async function getMonitoringItems () {
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.searchMonitoringItems, nowFormingMachineInfo.value.provisionType);
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    const oldData = JSON.parse(detailItem.value.monitoringItems);
    monitoringItems.value = result.data;
    monitoringItems.value.forEach((item) => {
      // 預設值
      item.status = 'NA';
      item.data = '';
      // 在跟列表資料比對出上次修改的值
      oldData.forEach((jtem) => {
        if (item.itemName === jtem.itemName) {
          item.status = jtem.status;
          item.data = jtem.data;
        }
      });
    });
    
    
    
  } else {
    popMsg('取得監控項目清單失敗');
  }
}

// 儲存
async function saveMonitorItem() {
  const path = VITE_API_DOMAIN + ((nowFormingMachineInfo.value.provisionType === "FORMING")
    ? formatPath(api.fmoldingMachine.saveMonitorItem, 'updateMonitorItem')
    : formatPath(api.fmoldingMachine.saveMonitorItem, 'updateSF170MonitorItem'));

  const param = {
    machineId: nowMachineId.value,
    shift: detailItem.value.shift,
    productionDate: detailItem.value.productionDate,
    paperType: detailItem.value.paperType,
    items: []
  };
  monitoringItems.value.forEach((item) => {
    param.items.push({
      itemName: item.itemName,
      status: item.status,
      data: item.data
    });
  });

  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出');
    backList();
  } else {
    popMsg(result.errorCode)
  }
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
  searchList();
})

</script>