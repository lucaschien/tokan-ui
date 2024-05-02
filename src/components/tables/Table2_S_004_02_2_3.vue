<template>
  <!-- 2-S-004-02-2.3成型機清潔檢查表 -->
  <div class="custom-tables-box Table2_S_004_02_2_3">
    <p>2-S-004-02-2.3成型機清潔檢查表</p>
    
    <div class="mb-3 row">
      <label class="form-label col-4">選擇頻率:</label>
      <div class="col-8">
        <select class="form-select" v-model="frequency"
          @change="changeFrequency()">
          <option :value="null">請選擇</option>
          <option value="DAY">每日</option>
          <option value="WEEK">每週</option>
          <option value="TWO_WEEK">每兩週</option>
        </select>
      </div>
    </div>

    <div class="mb-3 row" v-if="frequency">
      <label class="form-label col-4">身份別:</label>
      <div class="col-8">
        <select class="form-select" v-model="identity">
          <option :value="null">請選擇</option>
          <option value="Operator" v-if="frequency === 'DAY' || frequency === 'WEEK'">作業員</option>
          <option value="Teamleader" v-if="frequency === 'WEEK' || frequency === 'TWO_WEEK'">組長</option>
          <option value="Warranty" v-if="frequency === 'TWO_WEEK'">保修</option>
        </select>
      </div>
    </div>

    <div class="mb-3 mt-5 row" v-if="frequency && identity">
      <label class="form-label col-4">
        <template v-if="frequency === 'TWO_WEEK' && identity === 'Warranty'">(拆卸清潔)項目</template>
        <template v-else>(清潔)項目</template>
      </label>
      <label class="form-label col-8">簽名欄位</label>
    </div>


    <!-- for 每日 + 作業員 -->
    <template v-if="frequency === 'DAY' && identity === 'Operator'">
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
        <label class="form-label col-4">杯底環</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
    </template>

    <!-- for 每週 + 作業員 -->
    <template v-if="frequency === 'WEEK' && identity === 'Operator'">
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
        <label class="form-label col-4">杯底沖刀</label>
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
        <label class="form-label col-4">捲邊加熱器</label>
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
    </template>

    <!-- for 每週 + 組長 -->
    <template v-if="frequency === 'WEEK' && identity === 'Teamleader'">
      <div class="mb-3 row">
        <label class="form-label col-4">矽力康毛刷</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
    </template>

    <!-- for 每兩週 + 組長 -->
    <template v-if="frequency === 'TWO_WEEK' && identity === 'Teamleader'">
      <div class="mb-3 row">
        <label class="form-label col-4">輸杯管輸杯管Air噴頭</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
    </template>

    <!-- for 每兩週 + 保修 -->
    <template v-if="frequency === 'TWO_WEEK' && identity === 'Warranty'">
      <div class="mb-3 row">
        <label class="form-label col-4">杯底環</label>
        <div class="col-8">
          <input class="form-control" type="text">
        </div>
      </div>
    </template>

    <div class="fz-6 pt-4">
      備註<br>
      * 完成後操作人員於負責欄位內簽名
    </div>

    <button class="btn btn-primary w-100 mt-4" 
      v-if="frequency && identity"
      @click="popMsg('資料已送出')">送出</button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const popMsg = inject('popMsg')

const frequency = ref(null) // 頻率
const identity = ref(null) // 身份別

// 切換頻率
function changeFrequency() {
  identity.value = null;
}


</script>