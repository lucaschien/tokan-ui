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
      <select class="form-select">
        <option :value="null">請選擇</option>
        <option>早班</option>
        <option>中班</option>
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

      <!-- <select class="form-select">
        <option :value="null">請選擇</option>
        <option>09:00</option>
        <option>10:30</option>
        <option>13:30</option>
        <option>15:30</option>
        <option>17:00</option>
        <option>18:30</option>
        <option>21:30</option>
        <option>23:30</option>
        <option>01:00</option>
        <option>02:30</option>
        <option>05:30</option>
        <option>07:30</option>
      </select> -->
    </div>
    <!-- <div class="mb-3">
      <label class="form-label">檢查結果</label>
      <div class="form-check">
        <input class="form-check-input" v-model="testResult"
          value="NOTWORK" type="radio" name="testResult" id="NOTWORK">
        <label class="form-check-label" for="NOTWORK">未生產</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="testResult"
          value="NORMAL" type="radio" name="testResult" id="NORMAL">
        <label class="form-check-label" for="NORMAL">正常</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" v-model="testResult"
          value="ABNORMAL" type="radio" name="testResult" id="ABNORMAL">
        <label class="form-check-label" for="ABNORMAL">異常</label>
      </div>
    </div> -->

    <div class="mb-3">
      <label class="form-label">異常調機措施</label>
      <textarea class="form-control"></textarea>
    </div>
    <button class="btn btn-primary w-100 mt-4" @click="popMsg('資料已送出')">送出</button>

  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const popMsg = inject('popMsg')

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