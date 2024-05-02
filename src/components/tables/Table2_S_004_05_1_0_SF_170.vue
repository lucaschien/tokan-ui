<template>
  <!-- 2-S-004-05-1.0 SF-170成型機清潔檢查表 -->
  <div class="custom-tables-box Table2_S_004_05_1_0_SF_170">
    <p>2-S-004-05-1.0 SF-170成型機清潔檢查表</p>

    <div class="mb-3 row">
      <label class="form-label col-4">選擇頻率:</label>
      <div class="col-8">
        <select class="form-select" v-model="frequency">
          <option :value="null">請選擇</option>
          <option value="DAY">每日</option>
          <option value="WEEK">每週</option>
        </select>
      </div>
    </div>

    <div class="mb-3 mt-5 row" v-if="frequency">
      <label class="form-label col-4">(清潔)項目</label>
      <label class="form-label col-8">簽名欄位</label>
    </div>

    <!-- for 每日 -->
    <template v-if="frequency === 'DAY'">
      <div class="mb-3 row">
        <label class="form-label col-4">12:50 杯底預折器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">16:30 杯底預折器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">20:00 杯底預折器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">12:50 杯底旋壓器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
    </template>

    <!-- for 每週 -->
    <template v-if="frequency === 'WEEK'">
      <div class="mb-3 row">
        <label class="form-label col-4">公模</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底預折器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底旋壓器</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯口捲邊模具</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">矽力康槽</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">母模</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">機台成品出口籠架</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">成型機檯面</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">塑膠輸杯管</label>
        <div class="col-8">
          <input class="form-control" type="text">
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
      @click="popMsg('資料已送出')">送出</button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const popMsg = inject('popMsg')

const frequency = ref(null) // 頻率





</script>