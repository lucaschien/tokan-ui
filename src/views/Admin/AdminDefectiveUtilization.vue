<template>
  <div class="AdminDefectiveUtilization">
    <div class="table-box">
      <!-- searh -->
      <div class="search-box">
        <label class="form-label">排程選擇</label> 
        <select class="form-select me-4">
          <option :value="null">請選擇</option>
          <option>A排程</option>
          <option>B排程</option>
        </select>

        <button class="btn btn-primary ">查詢</button>
        <AdminPrintBtn />
      </div>
      <!-- table -->
      <table class="table">
        <thead class="table-light">
          <tr>
            <th>產品名稱</th>
            <th>數量</th>
            <th>良品數量</th>
            <th>不良品數量</th>
            <th>良品百分比</th>
            <th>不良品百分比</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>50oz</td>
            <td>1000</td>
            <td>999</td>
            <td>1</td>
            <td>99.9%</td>
            <td>0.1%</td>
          </tr>
          <tr>
            <td>成型1號機</td>
            <td>1000</td>
            <td>999</td>
            <td>1</td>
            <td>99.9%</td>
            <td>0.1%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import AdminPrintBtn from '@/components/Admin/AdminPrintBtn.vue'

</script>