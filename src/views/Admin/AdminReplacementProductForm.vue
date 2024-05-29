<template>
  <div class="AdminReplacementProductForm">
    <div class="table-box print-box">
      <!-- searh -->
      <div class="search-box">
        <label class="form-label">填表時間</label> 
        <VueDatePicker v-model="searchModel.date" 
          text-input 
          :format="'yyyy-MM-dd'" 
          :enable-time-picker="false"/>
        <button class="btn btn-primary ">查詢</button>

        <button class="btn btn-outline-primary ms-1" @click="gotoCreate()">
          <i class="fa fa-plus me-1" aria-hidden="true"></i>新增
        </button>
      </div>
      <!-- table -->
      <table class="table">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>填表時間</th>
            <th>更換包裝機編號</th>
            <th width="90">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2024-05-29</td>
            <td>55555</td>
            <td>
              <button class="btn btn-outline-secondary" @click="gotoDetail()">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 頁碼 -->
      <PaginationBox />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import PaginationBox from '@/components/PaginationBox.vue'

const router = useRouter();

const searchModel = ref({
  date: ''
})

function gotoDetail() {
  router.push({ name: 'AdminReplacementProductFormDetail', query: { id: '123' }});
}

function gotoCreate() {
  router.push({ name: 'AdminReplacementProductFormDetail'});
}

</script>