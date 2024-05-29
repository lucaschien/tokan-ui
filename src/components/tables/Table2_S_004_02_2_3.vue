<template>
  <!-- 2-S-004-02-2.3成型機清潔檢查表 -->
  <div class="custom-tables-box Table2_S_004_02_2_3">
    <p>2-S-004-02-2.3成型機清潔檢查表</p>
    
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
          <option value="DAILY" v-if="
            loginUserRole === 'MOLDING_WORKER'"
          >每日</option>
          <option value="WEEKLY" v-if="
            loginUserRole === 'MOLDING_WORKER' ||
            loginUserRole === 'TEAM_LEADER'
          ">每週</option>
          <option value="BI_WEEKLY" v-if="
            loginUserRole === 'TEAM_LEADER' ||
            loginUserRole === 'MAINTENANCE'
          ">每兩週</option>
        </select>
      </div>
    </div>

    <div class="mb-3 mt-5 row" v-if="frequency">
      <label class="form-label col-4">
        <template v-if="frequency === 'BI_WEEKLY' && loginUserRole === 'MAINTENANCE'">(拆卸清潔)項目</template>
        <template v-else>(清潔)項目</template>
      </label>
      <label class="form-label col-8">簽名欄位</label>
    </div>

    <!-- for 每日 + 作業員 -->
    <template v-if="frequency === 'DAILY' && loginUserRole === 'MOLDING_WORKER'">
      <div class="mb-3 row">
        <label class="form-label col-4">杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolderCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底旋壓器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPressCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底環</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomRingCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <!-- for 每週 + 作業員 -->
    <template v-if="frequency === 'WEEKLY' && loginUserRole === 'MOLDING_WORKER'">
      <div class="mb-3 row">
        <label class="form-label col-4">公模</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.moldCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底預折器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPrefolderBiweeklyCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底旋壓器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPressBiweeklyCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯口捲邊模具</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupEdgeRollerCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">矽力康槽</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.siliconeSlotCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">母模</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.motherMoldCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底沖刀</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomPunchCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">機台成品出口籠架</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.machineProductOutletRackCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">捲邊加熱器</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.rollHeaterCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">成型機檯面</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.moldingMachineTableCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <!-- for 每週 + 組長 -->
    <template v-if="frequency === 'WEEKLY' && loginUserRole === 'TEAM_LEADER'">
      <div class="mb-3 row">
        <label class="form-label col-4">矽力康毛刷</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.siliconeBrushCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <!-- for 每兩週 + 組長 -->
    <template v-if="frequency === 'BI_WEEKLY' && loginUserRole === 'TEAM_LEADER'">
      <div class="mb-3 row">
        <label class="form-label col-4">輸杯管輸杯管Air噴頭</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupTransferTubeAirNozzleCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <!-- for 每兩週 + 保修 -->
    <template v-if="frequency === 'BI_WEEKLY' && loginUserRole === 'MAINTENANCE'">
      <div class="mb-3 row">
        <label class="form-label col-4">杯底環</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.cupBottomRingNozzleCleaning">
            <option value="">請選擇</option>
            <option v-for="item in roleUserList" 
              :key="'cupBottomPrefolderCleaning'+item.id">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </template>

    <div class="fz-6 pt-4">
      備註<br>
      * 完成後操作人員於負責欄位內簽名
    </div>

    <button class="btn btn-primary w-100 mt-4" 
      v-if="frequency"
      @click="updateMoldingMachineCleaningInspection()">送出</button>
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

// 登入者資訊
const loginUserRole = rootStore.loginUserInfo.roleCode;
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

  cupBottomPrefolderCleaning: '', // 杯底預折器
  cupBottomPressCleaning: '', // 杯底旋壓器
  cupBottomRingCleaning: '', // 杯底環
  moldCleaning: '', // 單週 公模
  cupBottomPrefolderBiweeklyCleaning: '', // 單週 杯底預折器
  cupBottomPressBiweeklyCleaning: '', // 單週 杯底旋壓器
  cupEdgeRollerCleaning: '', // 單週 杯口捲邊模具
  siliconeSlotCleaning: '', // 單週 矽力康槽
  motherMoldCleaning: '', // 單週 母模
  cupBottomPunchCleaning: '', // 單週 杯底沖刀
  machineProductOutletRackCleaning: '', // 單週 機台成品出口籠架
  rollHeaterCleaning: '', // 單週 捲邊加熱器
  moldingMachineTableCleaning: '', // 單週 成型機檯面
  siliconeBrushCleaning: '', // 單週 矽力康毛刷
  cupTransferTubeAirNozzleCleaning: '', // 每兩周 輸杯管輸杯管Air噴頭
  cupBottomRingNozzleCleaning: '' // 每兩周 杯底環
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

  // 處理雙週
  for (let i = 1; i <= weeks/2; i++) {
    range.BI_WEEKLY.push({
      s: i*14 - 13,
      e: i*14,
      firstDay: year + '-' + month + '-' + (i*14 - 13)
    })
  }
  // 雙週 剩餘天數
  range.BI_WEEKLY.push({
    s: (weeks/2) * 14 + 1,
    e: totalDay,
    firstDay: year + '-' + month + '-' + ((weeks/2) * 14 + 1)
  });

  return range;
}
const weekRange = calcWeekRange();

// 儲存清潔檢查表
async function updateMoldingMachineCleaningInspection() {
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.updateMoldingMachineCleaningInspection, frequency.value);
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