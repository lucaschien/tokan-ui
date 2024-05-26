<template>
  <!-- 2-Q-007-11-1.0紙杯破壞試驗檢查表 -->
  <div class="custom-tables-box Table2_Q_007_11_1_0">
    <p>2-Q-007-11-1.0紙杯破壞試驗檢查表</p>
    <div class="mb-3">
      <label class="form-label">班別</label>
      <div class="fs-1">
        <template v-if="!props.detailItem">{{ clientStore.shiftName[props.createShift] }}</template>
        <template v-if="props.detailItem">{{ clientStore.shiftName[props.detailItem[0].shift] }}</template>
      </div>
    </div>
    <template v-if="uiModel.shift">
      <div class="mb-3">
        <label class="form-label">生產日期</label>
        <input type="date" class="form-control" v-model="uiModel.productionDate">
      </div>
      <div class="mb-3">
        <label class="form-label">組長</label>
        <select class="form-select" v-model="uiModel.teamLeader">
          <option value="">請選擇</option>
          <option :value="item.name" v-for="item in teamLeader" :key="item.id">{{ item.name }}</option>
        </select>
      </div>
      <div class="d-flex mb-3 checking-box">
        <div class="one-box" v-for="(item, index) in uiModel.inspectionTimes" :key="'result'+index">
          <div class="fs-3">檢查時間</div>
          <input class="form-control" type="text" :value="item.inspectionTime.slice(0,5)" disabled/>
          <div class="fs-3 w-100 mt-3">檢查結果</div>
          <div class="form-check">
            <input class="form-check-input" v-model="item.testResult"
              value="NA" type="radio" :name="'result'+index" :id="'NOTWORK'+index">
            <label class="form-check-label fs-3" :for="'NOTWORK'+index">未生產</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="item.testResult"
              value="Y" type="radio" :name="'result'+index" :id="'NORMAL'+index">
            <label class="form-check-label fs-3" :for="'NORMAL'+index">正常</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" v-model="item.testResult"
              value="N" type="radio" :name="'result'+index" :id="'ABNORMAL'+index">
            <label class="form-check-label fs-3" :for="'ABNORMAL'+index">異常</label>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">異常調機措施</label>
        <textarea class="form-control" v-model="uiModel.abnormalAdjustmentMeasures"></textarea>
      </div>
      <button class="btn btn-primary w-100 mt-4" :disabled="!canSaveBtn"
        @click="save()">儲存</button>
    </template>

  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import moment from 'moment'

const route = useRoute()
const clientStore = useClientStore()
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const props = defineProps({
  createShift: String,
  detailItem: String,
  seccessCallback: Function
})

// 用來放後端資料整理過後用
/* uiModel.inspectionTimes 內預計這樣放
  [{
    inspectionTime: '09:00:00',
    testResult: 'N',
  }]
*/
const uiModel = ref({
  machineId: route.query.machineId,
  shift: '',
  productionDate: moment().format('YYYY-MM-DD'),
  inspectionTimes: [], // 放四個時段的資料用
  abnormalAdjustmentMeasures: '',
  teamLeader: ''
});

const shiftTimeRange = {
  MORNING: ['09:00:00', '10:30:00', '13:30:00', '15:30:00'],
  AFTERNOON: ['17:00:00', '18:30:00', '21:30:00', '23:00:00'],
  NIGHT: ['01:00:00', '02:30:00', '05:30:00', '07:30:00']
};

// 班別下的組長清單
const teamLeader = ref([])

const canSaveBtn = computed(() => {
  if (
    !uiModel.value.productionDate ||
    !uiModel.value.teamLeader
  ) {
    return false;
  } else {
    return true;
  }
})

function updateCupDestructionTestInspection(parma) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.updateCupDestructionTestInspection;
  return ajax.post(path, parma);    
}

// 儲存 (新增與修改)
function save() {
  // 一次送出四次api去更新四個時段的資料
  uiModel.value.inspectionTimes.forEach(async(item) => {
    // 提醒這個是單一個時段的資料格式
    const param = {
      machineId: uiModel.value.machineId,
      shift: uiModel.value.shift,
      productionDate: moment(uiModel.value.productionDate).format('YYYY-MM-DD'),  // 避免不同瀏覽器或裝置日期格式不同
      inspectionTime: item.inspectionTime,
      teamLeader: uiModel.value.teamLeader,
      testResult: item.testResult, // 檢查結果
      abnormalAdjustmentMeasures: uiModel.value.abnormalAdjustmentMeasures // 異常調機措施
    };
    await updateCupDestructionTestInspection(param);
    popMsg('資料已送出')
    props.seccessCallback();
  });
}


onMounted( async() => {
  // 區分是新增還是編輯
  if (props.detailItem) { // 編輯
    // 取列表帶進來的第一筆當作共通欄位
    teamLeader.value = await clientStore.getShiftUserList(props.detailItem[0].shift);
    uiModel.value.shift = props.detailItem[0].shift
    uiModel.value.productionDate = props.detailItem[0].productionDate
    uiModel.value.abnormalAdjustmentMeasures = props.detailItem[0].abnormalAdjustmentMeasures
    uiModel.value.teamLeader = props.detailItem[0].teamLeader
    // 將四個時段分別放入 uiModel.inspectionTimes
    props.detailItem.forEach((item) => {
      uiModel.value.inspectionTimes.push({
        inspectionTime: item.inspectionTime.slice(0,5), // 將秒數清除掉
        testResult: item.testResult,
      });
    });
  }
  if (!props.detailItem) { // 新增
    teamLeader.value = await clientStore.getShiftUserList(props.createShift);

    uiModel.value.shift = props.createShift
    // 建立新增時的四個時段
    shiftTimeRange[uiModel.value.shift].forEach((item) => {
      uiModel.value.inspectionTimes.push({
        inspectionTime: item,
        testResult: 'NA',
      });
    });
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/variable';

.checking-box {
  margin: 0;
  .one-box {
    border: 1px solid $main-grey;
    margin: 5px;
    padding: 20px 25px;
    border-radius: 5px;
  }
}
</style>