<template>
  <!-- 2-Q-007-11-1.0紙杯破壞試驗檢查表 -->
  <div class="custom-tables-box Table2_Q_007_11_1_0">
    <p>2-Q-007-11-1.0紙杯破壞試驗檢查表</p>

    <div class="mb-3">
      <label class="form-label">生產日期</label>
      <input type="date" class="form-control">
    </div>
    <div class="mb-3">
      <label class="form-label">班別</label>
      <!-- 提醒: 編輯不能改班別 -->
      <select class="form-select" :disabled="props.detailItem"
        v-model="dataModel.shift">
        <option :value="null">請選擇</option>
        <option>早班</option>
        <option>午班</option>
        <option>晚班</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">組長</label>
      <input type="text" class="form-control" value="王小明" disabled>
    </div>
    <div class="d-flex mb-3 checking-box">
      <div class="one-box" v-for="(item, index) in 4" :key="'test'+index">
        <div class="fs-3">檢查時間</div>
        <input class="form-control" type="text" :value="testTimes[index]" disabled/>
        <div class="fs-3 w-100 mt-3">檢查結果</div>

        <div class="form-check">
          <input class="form-check-input"
            value="NOTWORK" type="radio" :name="'testResult'+item" :id="'NOTWORK'+item">
          <label class="form-check-label fs-3" :for="'NOTWORK'+item">未生產</label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
            value="NORMAL" type="radio" :name="'testResult'+item" :id="'NORMAL'+item">
          <label class="form-check-label fs-3" :for="'NORMAL'+item">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input"
            value="ABNORMAL" type="radio" :name="'testResult'+item" :id="'ABNORMAL'+item">
          <label class="form-check-label fs-3" :for="'ABNORMAL'+item">異常</label>
        </div>

      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">異常調機措施</label>
      <textarea class="form-control"></textarea>
    </div>
    <button class="btn btn-primary w-100 mt-4" @click="popMsg('資料已送出')">送出</button>

  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { useClientStore } from '@/stores/ClientStore'
import moment from 'moment'

const route = useRoute()
const rootStore = useRootStore()
const clientStore = useClientStore()
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const props = defineProps({
  detailItem: String,
  seccessCallback: Function
})

// 提醒這個是單一個時段的資料格式
const oneDataModel = {
  machineId: route.query.machineId,
  shift: clientStore.nowShift, // 班表, default 當前時間對應班別
  productionDate: moment().format('YYYY-MM-DD'),
  inspectionTime: '09:00:00',
  teamLeader: '', // teamLeader
  testResult: 'N', // 檢查結果
  abnormalAdjustmentMeasures: '' // 異常調機措施
};

// 用來放後端資料整理過後用
const uiModel = [];

// TODO... 檢查結果
const testResult = ref(null)
const testTimes = [
  '09:00',
  '10:30',
  '13:30',
  '15:30',
  '17:00',
  '18:30',
  '21:30',
  '23:30',
  '01:00',
  '02:30',
  '05:30',
  '07:30', 
]

onMounted(() => {
  console.log('props.detailItem', props.detailItem);
  // 區分是新增還是編輯
  if (props.detailItem) { // 編輯

  }
  if (!props.detailItem) { // 新增

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