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
      <div class="fs-2">
        包裝袋檢查<span class="fs-4 ms-2">(檢查數: 3個)</span>
      </div>
      <div class="ms-5">
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

const PackagingBag = ref(false)


</script>