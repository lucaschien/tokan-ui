<template>
  <div class="AdminReport">
    <div class="table-box print-box">
      <!-- searh -->
      <div class="search-box">
        <select class="form-select" v-model.lazy="reportType">
          <option value="">請選擇報表類型</option>
          <option value="Report_2_M_011_03_2_8">2-M-011-03-2.8成型機生產報表240205</option>
          <option value="Report_2_M_011_13_1_4_SF_170">2-M-011-13-1.4 SF-170成型機生產報表</option>
          <option value="Report_2_Q_007_01_2_6">2-Q-007-01-2.6生產品質檢驗表</option>
          <option value="Report_2_Q_007_02_2_6">2-Q-007-02-2.6杯漏調整後再檢表</option>
          <option value="Report_2_Q_007_11_1_0">2-Q-007-11-1.0紙杯破壞試驗檢查表</option>
          <option value="Report_2_S_004_02_2_3">2-S-004-02-2.3成型機清潔檢查表</option>
          <option value="Report_2_S_004_05_1_0_SF_170">2-S-004-05-1.0 SF-170成型機清潔檢查表</option>
          <optgroup label=""></optgroup>
          <option value="Report_2_M_011_02_2_6" >test用</option>
        </select>
        <button class="btn btn-primary">查詢</button>
        <AdminPrintBtn />
      </div>

      <!-- 2-M-011-03-2.8成型機生產報表240205 -->
      <Report_2_M_011_03_2_8 v-if="reportType === 'Report_2_M_011_03_2_8'"/>

      <!-- 2-M-011-13-1.4 SF-170成型機生產報表 -->
      <Report_2_M_011_13_1_4_SF_170 v-if="reportType === 'Report_2_M_011_13_1_4_SF_170'" />

      <!-- 2-M-011-02-2.6杯身裁切日報表 -->
      <Report_2_Q_007_01_2_6 v-if="reportType === 'Report_2_Q_007_01_2_6'"/>
      
      <!-- 2-Q-007-02-2.6杯漏調整後再檢表 -->
      <Report_2_Q_007_02_2_6 v-if="reportType === 'Report_2_Q_007_02_2_6'"/>

      <!-- 2-Q-007-11-1.0紙杯破壞試驗檢查表 -->
      <Report_2_Q_007_11_1_0 v-if="reportType === 'Report_2_Q_007_11_1_0'"/>

      <!-- 2-S-004-02-2.3成型機清潔檢查表 -->
      <Report_2_S_004_02_2_3 v-if="reportType === 'Report_2_S_004_02_2_3'"/>

      <!-- 2-S-004-05-1.0 SF-170成型機清潔檢查表 -->
      <Report_2_S_004_05_1_0_SF_170 v-if="reportType === 'Report_2_S_004_05_1_0_SF_170'"/>



      <!-- test用  2-M-011-02-2.6杯身裁切日報表 -->
      <Report_2_M_011_02_2_6 v-if="reportType === 'Report_2_M_011_02_2_6'"/>


    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminPrintBtn from '@/components/Admin/AdminPrintBtn.vue'
// 報表組件
import Report_2_M_011_03_2_8 from '@/components/Admin/Report/Report_2_M_011_03_2_8.vue'
import Report_2_M_011_02_2_6 from '@/components/Admin/Report/Report_2_M_011_02_2_6.vue'
import Report_2_Q_007_01_2_6 from '@/components/Admin/Report/Report_2_Q_007_01_2_6.vue'
import Report_2_Q_007_02_2_6 from '@/components/Admin/Report/Report_2_Q_007_02_2_6.vue'
import Report_2_Q_007_11_1_0 from '@/components/Admin/Report/Report_2_Q_007_11_1_0.vue'
import Report_2_S_004_02_2_3 from '@/components/Admin/Report/Report_2_S_004_02_2_3.vue'
import Report_2_S_004_05_1_0_SF_170 from '@/components/Admin/Report/Report_2_S_004_05_1_0_SF_170.vue'

import Report_2_M_011_13_1_4_SF_170 from '@/components/Admin/Report/Report_2_M_011_13_1_4_SF_170.vue'


//
const reportType = ref('')

</script>