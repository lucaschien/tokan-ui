<template>
  <!-- 2-S-004-05-1.0 SF-170成型機清潔檢查表 -->
  <div class="custom-tables-box Table2_S_004_05_1_0_SF_170">
    <p>2-S-004-05-1.0 SF-170成型機清潔檢查表</p>

    <div class="mb-3 row">
      <label class="form-label col-4">身份別:</label>
      <div class="col-8 fs-2">{{ rootStore.loginUserInfo.roleName }}</div>
    </div>

    <div class="mb-3 row">
      <label class="form-label col-4">選擇頻率:</label>
      <div class="col-8">
        <select class="form-select" v-model="frequency"
          @change="changeFrequency()">
          <option :value="null">請選擇</option>
          <option value="DAILY">每日</option>
          <option value="WEEKLY">每週</option>
        </select>
      </div>
    </div>

    <div class="mb-3 mt-5 row" v-if="frequency">
      <label class="form-label col-4">(清潔)項目</label>
      <label class="form-label col-8">簽名欄位</label>
    </div>

    <!-- for 每日 -->
    <template v-if="frequency === 'DAILY'">
      <div class="mb-3 row">
        <label class="form-label col-4">12:50 杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolderDaily1">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderDaily1'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">16:30 杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolderDaily2">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderDaily2'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">20:00 杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolderDaily3">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderDaily3'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">12:50 杯底旋壓器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPressDaily">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPressDaily'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <!-- for 每週 -->
    <template v-if="frequency === 'WEEKLY'">
      <div class="mb-3 row">
        <label class="form-label col-4">公模</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.moldCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'moldCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolder">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolder'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底旋壓器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPress">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPress'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯口捲邊模具</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupEdgeRollerCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupEdgeRollerCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">矽力康槽</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.siliconeSlotCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'siliconeSlotCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">母模</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.motherMoldCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'motherMoldCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">機台成品出口籠架</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.machineProductOutletRackCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'machineProductOutletRackCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">成型機檯面</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.moldingMachineTableCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'moldingMachineTableCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">塑膠輸杯管</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.plasticCupTransferPipeCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'plasticCupTransferPipeCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <div class="fz-6 pt-4">
      備註<br>
      * 完成後操作人員於負責欄位內簽名<br>
      1. 每日清潔：早班12:50、16:30、20:00；執行人員：成型機人員。<br>
      2. 每週清潔：每週一早上07:30開始；執行人員：成型機人員。
    </div>

    <button class="btn btn-primary w-100 mt-4" 
      v-if="frequency"
      @click="updateSF170MoldingMachineCleaningInspection()">送出</button>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRootStore } from '@/stores/root';
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore';
import { api, formatPath } from '@/common/api';
import { ajax } from '@/common/ajax';
import moment from 'moment';

const route = useRoute()
const rootStore = useRootStore();
const clientStore = useClientStore();
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const popMsg = inject('popMsg')

const props = defineProps({
  saveCallback: {
    type: Function,
    required: true
  }
})

// 頻率
const frequency = ref(null) 
// 切換頻率
function changeFrequency() {
  // 將dataModel給恢復預設值
  dataModel.value = JSON.parse(JSON.stringify(defaultDataModel));
  // 比對出當日,當週,雙週的第一個日期
  const today = moment().format('DD');
  if (frequency.value === 'DAILY') {
    dataModel.value.inspectionDate = moment().format('YYYY-MM-DD');
  } else {
    weekRange[frequency.value].forEach((item) => {
      if ((today >= item.s) && (today <= item.e)) {
        dataModel.value.inspectionDate = item.firstDay;
      }
    });
  }
}

let defaultDataModel = null;
const dataModel = ref({
  machineId: null,
  inspectionRole: null,
  inspectionDate: null,

  cupBottomPrefolderDaily1: '',  // 12:50 杯底預折器
  cupBottomPrefolderDaily2: '',  // 16:30 杯底預折器
  cupBottomPrefolderDaily3: '',  // 20:00 杯底預折器
  cupBottomPressDaily: '',       // 12:50 杯底旋壓器
  moldCleaning: '',              // 公模
  cupBottomPrefolder: '',        // 杯底預折器
  cupBottomPress: '', // 杯底旋壓器
  cupEdgeRollerCleaning: '', // 杯口捲邊模具
  siliconeSlotCleaning: '', // 矽力康槽
  motherMoldCleaning: '', // 母模
  machineProductOutletRackCleaning: '', // 機台成品出口籠架,
  moldingMachineTableCleaning: '', // 成型機檯面
  plasticCupTransferPipeCleaning: '' // 塑膠輸杯管
});


// 角色人員清單
const roleUserList = ref([]);

// 改變套件預設週日為當週第一天的問題
// moment.updateLocale('en', {
//   week: {
//     dow: 1
//   }
// })
// 計算本日在該月的單週或雙週的位置
function calcWeekRange() {
  const today = moment();
  const year = today.format('YYYY');
  const month = today.format('MM');
  const totalDay = moment().daysInMonth(); // 本月總共天數
  const weeks = Math.floor(totalDay / 7); // 完整週數

  // 將天數分成週
  const range = {
    WEEKLY: [],
    BI_WEEKLY: [],
  };
  // 處理單週
  for (let i = 1; i <= weeks; i++) {
    range.WEEKLY.push({
      s: i*7 - 6,
      e: i*7,
      firstDay: year + '-' + month + '-' + (i*7 - 6)
    })
  }
  // 單週 剩餘天數
  range.WEEKLY.push({
    s: weeks * 7 + 1,
    e: totalDay,
    firstDay: year + '-' + month + '-' + (weeks * 7 + 1)
  });

  return range;
}
const weekRange = calcWeekRange();

// 儲存SF170清潔檢查表
async function updateSF170MoldingMachineCleaningInspection() {
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.updateSF170MoldingMachineCleaningInspection, frequency.value);
  const param = JSON.parse(JSON.stringify(dataModel.value));
  // Object.keys(param).forEach(function(key) {
  //   if (param[key] === '') {
  //     param[key] = null;
  //   }
  // });
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出');
    dataModel.value = JSON.parse(JSON.stringify(defaultDataModel));
    props.saveCallback();
  } else {
    popMsg('儲存失敗')
  }
}


onMounted(async() => {
  dataModel.value.machineId = route.query.machineId;
  dataModel.value.inspectionRole = rootStore.loginUserInfo.roleCode;

  defaultDataModel = JSON.parse(JSON.stringify(dataModel.value));
  // 撈取人員清單
  roleUserList.value = await clientStore.getRoleUserList(dataModel.value.inspectionRole);
})
</script>