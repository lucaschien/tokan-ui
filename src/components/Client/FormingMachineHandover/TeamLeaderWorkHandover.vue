<template>
  <div class="TeamLeaderWorkHandover">
    <div class="mb-3">
      <button class="btn btn-primary p-4" v-if="!lookDetail"
        @click="enterDetail()">新增</button>
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
            <th>說明</th>
            <th width="100">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listData" :key="'list'+index">
            <td class="fs-1">{{index + 1}}</td>
            <td class="fs-3">{{ clientStore.shiftName[item.shift] }}</td>
            <td class="fs-3">{{ item.productionDate }}</td>
            <td v-html="displayMemo(item.memo)"></td>
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
        <div class="mb-3 row">
          <label class="form-label col-4">班別</label>
          <div class="col-8 d-flex">
            <select class="form-select" v-model="detailItem.shift">
              <option value="">請選擇</option>
              <option v-for="(value, key) in clientStore.shiftName"
                :value="key" 
                :key="'shift'+key">{{ value }}</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">生產日期</label>
          <div class="col-8 d-flex">
            <input class="form-control" type="date" v-model="detailItem.productionDate">
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">說明</label>
          <div class="col-8 d-flex">
            <textarea class="form-control" style="width: 100%" rows="5"
              v-model="detailItem.memo"></textarea>
          </div>
        </div>
      </div>
      <button class="btn btn-primary w-100 mt-3"
        :disabled="!detailItem.shift || !detailItem.productionDate"
        @click="saveTeamLeaderHandover()">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
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

const listData = ref([])
const listIsempty = ref(false)
const lookDetail = ref(false)

function backList() {
  detailItem.value = null;
  lookDetail.value = false; 
  searchTeamLeaderList(); 
}

async function searchTeamLeaderList() {
  listIsempty.value = false;
  backList.value = [];
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.teamLeaderList, nowMachineId.value);
  const result = await ajax.get(path)
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

function enterDetail(deatailData) {
  if (deatailData) {
    detailItem.value = deatailData;
  } else {
    detailItem.value = {
      machineId: nowMachineId.value,
      shift: '',
      productionDate: moment().format('YYYY-MM-DD'),
      memo: '',
    }
  }
  lookDetail.value = true;
}

// 內頁資料 model
const detailItem = ref(null);
// 儲存
async function saveTeamLeaderHandover() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.saveTeamLeaderHandover;
  const param = {
    machineId: nowMachineId.value,
    shift: detailItem.value.shift,
    productionDate: moment(detailItem.value.productionDate).format('YYYY-MM-DD'),
    memo: detailItem.value.memo,
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出');
    backList();
  } else {
    popMsg(result.errorCode)
  }
}

function displayMemo(memo) {
  let temp = memo.replace(/\n/g, '<br>');
  temp = temp.replace(/\s/g, '&nbsp;');
  return temp 
}




onMounted(() => {
  nowMachineId.value = route.query.machineId;
  searchTeamLeaderList();
})
</script>



