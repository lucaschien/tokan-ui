<template>
  <div class="AdminFormingMachineFailureHistory">
    
    <ul class="nav nav-tabs no-print">
      <li class="nav-item" @click="tab = 'TypeA'">
        <a :class="['nav-link', { active: tab === 'TypeA' }]" href="#">故障履歷</a>
      </li>
      <li class="nav-item" @click="tab = 'TypeB'">
        <a :class="['nav-link', { active: tab === 'TypeB' }]" href="#">錯誤碼統計</a>
      </li>
    </ul>
    <div class="nav-tabs-content">
      <!-- for 故障履歷 -->
      <div class="table-box" v-if="tab === 'TypeA'">
        <!-- searh -->
        <div class="search-box">
          <label class="form-label">時間區間</label> 
          <VueDatePicker v-model="date1" range text-input :format="searchDateForamt"/>
          <label class="form-label">機號</label> 
          <select class="form-select">
            <option :value="null">請選擇</option>
            <option>1號機</option>
            <option>2號機</option>
            <option>3號機</option>
            <option>4號機</option>
            <option>5號機</option>
            <option>6號機</option>
          </select>
          <label class="form-label">故障碼</label> 
          <input class="form-control me-4" list="searchListOptions" placeholder="請輸入故障碼...">
          <datalist id="searchListOptions">
            <option>故障碼1</option>
            <option>故障碼2</option>
            <option>故障碼3</option>
            <option>故障碼4</option>
            <option>故障碼5</option>
            <option>故障碼6</option>
          </datalist>

          <button class="btn btn-primary">查詢</button>
          <AdminPrintBtn />
        </div>
        <!-- table -->
        <table class="table">
          <thead class="table-light">
            <tr>
              <th>時間統計區間</th>
              <th>成型機號</th>
              <th>故障碼</th>
              <th>故障碼產生時間點</th>
              <th>故障原因</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-03-31 08:00 - 09:00</td>
              <td>#1</td>
              <td>E12345</td>
              <td>2024-03-31 08:30</td>
              <td>我也不知道</td>
            </tr>
            <tr>
              <td>2024-03-31 11:00 - 12:30</td>
              <td>#2</td>
              <td>E12345</td>
              <td>2024-03-31 11:26</td>
              <td>阿就壞了</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- for 錯誤碼統計 -->
      <div class="table-box" v-if="tab ==='TypeB'">
        <!-- searh -->
        <div class="search-box">
          <label class="form-label">start Date ~ end Date</label> 
          <VueDatePicker v-model="date2" :enable-time-picker="false" range text-input />
          <label class="form-label">錯誤碼</label> 
          <input class="form-control me-4" list="searchListOptions" id="exampleDataList" placeholder="請輸入錯誤碼...">
          <datalist id="searchListOptions">
            <option>錯誤碼1</option>
            <option>錯誤碼2</option>
            <option>錯誤碼3</option>
            <option>錯誤碼4</option>
            <option>錯誤碼5</option>
            <option>錯誤碼6</option>
          </datalist>
          
          <button class="btn btn-primary ">查詢</button>
          <AdminPrintBtn />
        </div>
        <!-- table -->
        <table class="table">
          <thead class="table-light">
            <tr>
              <th>errorCode</th>
              <th>summaryCount</th>
              <th>summaryDuration</th>
              <th>202402-18 Count</th>
              <th>202402-18 Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>錯誤碼3</td>
              <td>5</td>
              <td>235</td>
              <td>1</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdminPrintBtn from '@/components/Admin/AdminPrintBtn.vue'

const tab = ref('TypeA')

const date1 = ref('');
const date2 = ref('');

// 搜尋條件的小日曆 format 
function searchDateForamt(date) {
  console.log('date >> ', date)
  if (!date || date.length < 2) {
    return ''
  }
  const start = date[0]
  const day = start.getDate()
  const month = start.getMonth() + 1
  const year = start.getFullYear()
  const S_hours = start.getHours()
  const S_minutes = start.getMinutes()

  const end = date[1]
  const E_hours = end.getHours()
  const E_minutes = end.getMinutes()

  return `${year}-${month}-${day} ${S_hours}:${S_minutes} ~ ${E_hours}:${E_minutes}`
}



</script>