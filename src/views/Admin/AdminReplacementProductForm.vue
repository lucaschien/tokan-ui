<template>
  <div class="AdminReplacementProductForm">
    <div class="table-box print-box">
      <!-- searh -->
      <div class="search-box">
        <label class="form-label">開單日期</label> 
        <VueDatePicker v-model="searchDate" style="width: 260px"
          text-input 
          :format="'yyyy-MM-dd'" 
          :enable-time-picker="false"
          range/>
        <button class="btn btn-primary" @click="sendSearch(1)">查詢</button>

        <button class="btn btn-outline-primary ms-1" @click="gotoCreate()">
          <i class="fa fa-plus me-1" aria-hidden="true"></i>新增
        </button>
      </div>
      <!-- table -->
      <table class="table">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>開單日期</th>
            <th>更換包裝機編號</th>
            <th>更換產品</th>
            <th width="130">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in listData" :key="item.id" >
            <td>{{ i + 1 }}</td>
            <td>{{ item.orderDate }}</td>
            <td>{{ changeMethod[item.changeMethod] }}</td>
            <td>
              產品編號 {{ item.changeProductNo }} <br>
              包裝數 {{ item.changePackageQty }}
            </td>
            <td>
              <button class="btn btn-outline-secondary" 
                @click="gotoDetail(item)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-outline-secondary ms-3"
                @click="deleteProductChangeCheck(item)">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="6">查無資料</td></tr>
        </tbody>
      </table>
      <!-- 頁碼 -->
      <PaginationBox 
        :pageNo="searchModel.paging.pageNo"
        :totalRows="searchModel.paging.totalRows"
        :numberOfRowsPerPage="searchModel.paging.numberOfRowsPerPage"
        :changeCall="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/common/api';
import { ajax } from '@/common/ajax';
import PaginationBox from '@/components/PaginationBox.vue';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const listData = ref([]);
const listIsempty = ref(false);
const searchDate = ref([]);
const searchModel = ref({
  startDateTime: '',
  endDateTime: '',
  paging: {
    pageNo: 1,
    numberOfRowsPerPage: 3,
    dir: "DESC",
    sort: "orderDate",
    totalRows: 0
  }
});

watch(() => searchDate.value, (newVal) => {
  if (newVal) {
    let startDateTime = moment(newVal[0]).format('YYYY-MM-DD');
    let endDateTime = moment(newVal[1]).format('YYYY-MM-DD');
    searchModel.value.startDateTime = startDateTime;
    searchModel.value.endDateTime = endDateTime;
  } else {
    searchModel.value.startDateTime = '';
    searchModel.value.endDateTime = '';
  }
});

async function sendSearch(pageNo) {
  if (pageNo) {
    searchModel.value.paging.pageNo = pageNo;
  }
  const path = VITE_API_DOMAIN + api.Admin.getProductChangeCheckList;
  const param = JSON.parse(JSON.stringify(searchModel.value));

  listIsempty.value = false;
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    listData.value = result.data;
    listIsempty.value = (result.data.length) ? false : true;
    searchModel.value.paging.totalRows = result.paging.totalRows;
  } else {
    popMsg(result.errorCode)
  }
}

function deleteProductChangeCheck(item) {
  console.log('delete', item)
}

function changePage(pageNo, numberOfRowsPerPage) {
  searchModel.value.paging.pageNo = pageNo;
  searchModel.value.paging.numberOfRowsPerPage = numberOfRowsPerPage;
  sendSearch();
}

function gotoDetail(item) {
  router.push({ name: 'AdminReplacementProductFormDetail', query: { 
    id: item.id,
    pageNo: searchModel.value.paging.pageNo, 
    name: searchModel.value.name,  
    item: JSON.stringify(item)
  }});
}

function gotoCreate() {
  router.push({ name: 'AdminReplacementProductFormDetail'});
}


const changeMethod = {
  ONE_TO_TWO: '1號換2號', 
  TWO_TO_ONE: '2號換1號', 
  FOUR_TO_TWO: '4號換2號', 
  TWO_TO_FOUR: '2號換4號', 
  ONE: '1號', 
  TWO: '2號', 
  THREE: '3號', 
  FOUR: '4號', 
  FIVE: '5號', 
  ELEVEN: '11號'
}


sendSearch();
</script>