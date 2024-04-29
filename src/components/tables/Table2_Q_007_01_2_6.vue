<template>
  <!-- 2-Q-007-01-2.6生產品質檢驗表 -->
  <div class="custom-tables-box Table2_Q_007_01_2_6">
    <p>2-Q-007-01-2.6生產品質檢驗表</p>

    <div class="mb-5">
      <label class="form-label">班別</label>
      <select class="form-select">
        <option :value="null">請選擇</option>
        <option>早班</option>
        <option>中班</option>
        <option>晚班</option>
      </select>
    </div>
    
    <div class="mb-5">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="Leak" id="Leak">
        <label class="form-check-label" for="Leak">漏水檢查</label>
      </div>
      <div class="ms-5" v-if="Leak">
        <div class="mt-1 row">
          <h3 class="mt-2 ms-2 col-2">檢查結果:</h3>
          <div class="col-2 form-check">
            <input class="form-check-input" type="radio" 
              v-model="testResult"
              name="testResult"
              value="NORMAL"
              id="NORMAL">
            <label class="form-check-label" for="NORMAL" >正常</label>
          </div>
          <div class="col-2 form-check">
            <input class="form-check-input" type="radio" 
              v-model="testResult"
              name="testResult"
              value="ABNORMAL"
              id="ABNORMAL">
            <label class="form-check-label" for="ABNORMAL" >異常</label>
          </div>
        </div>
        <template v-if="testResult === 'ABNORMAL'">
          <h3 class="mt-2 ms-2">漏水部位:</h3>
          <div class="row ps-2 mb-3">
            <div class="col-4">
              <label class="form-label">背封</label>
              <input type="number" class="form-control">
            </div>
            <div class="col-4">
              <label class="form-label">交叉點</label>
              <input type="number" class="form-control">
            </div>
            <div class="col-4">
              <label class="form-label">杯底黏合</label>
              <input type="number" class="form-control">
            </div>
            <div class="col-4">
              <label class="form-label">膜破</label>
              <input type="number" class="form-control">
            </div>
          </div>
          <div class="row ps-2 mb-3 ">
            <div class="col-4">
              <h3>漏水杯數量</h3>
              <input type="number" class="form-control">
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="mb-5">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="DimensionsAppearance" id="DimensionsAppearance">
        <label class="form-check-label" for="DimensionsAppearance">尺寸、外觀檢查</label>
        <span class="h5 ms-4">(檢查數: 16個)</span>
      </div>
      <div class="ms-5" v-if="DimensionsAppearance">
        <h3 class="mt-3 ms-2">檢查為正常:</h3>
        <div class="row ms-1">
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="size1">
            <label class="form-check-label" for="size1">杯高</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="size2">
            <label class="form-check-label" for="size2">杯口徑</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="size3">
            <label class="form-check-label" for="size3">捲邊寬度</label>
          </div>
          <div class="form-check col-3">
            <input class="form-check-input" type="checkbox" id="size4">
            <label class="form-check-label" for="size4">外觀</label>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-5">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="PackagingBag" id="PackagingBag">
        <label class="form-check-label" for="PackagingBag">包裝袋檢查</label>
        <span class="h5 ms-4">(檢查數: 3個)</span>
      </div>
      <div class="ms-5" v-if="PackagingBag">
        <h3 class="mt-3 ms-2">檢查為正常:</h3>
        <div class="row ms-1">
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test1">
            <label class="form-check-label" for="PackagingBag_test1">印字正常</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test2">
            <label class="form-check-label" for="PackagingBag_test2">印刷外觀正常</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test3">
            <label class="form-check-label" for="PackagingBag_test3">包裝背封良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test4">
            <label class="form-check-label" for="PackagingBag_test4">包裝上封口良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test5">
            <label class="form-check-label" for="PackagingBag_test5">包裝下封口良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="PackagingBag_test6">
            <label class="form-check-label" for="PackagingBag_test6">包裝袋寬幅正常</label>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary w-100 mt-4" @click="popMsg('資料已送出')">送出</button>

  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const popMsg = inject('popMsg')

const Leak = ref(false)
const DimensionsAppearance = ref(false)
const PackagingBag = ref(false)

const testResult = ref(null)

</script>