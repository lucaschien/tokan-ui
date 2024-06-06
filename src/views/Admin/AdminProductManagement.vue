<template>
  <div class="AdminProductManagement">
    <div class="table-box">
      <!-- searh -->
      <div class="search-box">
        <label class="form-label">產品名稱</label> 
        <input class="form-control me-4" v-model="searchModel.name"
          placeholder="請輸入關鍵字">
        <button class="btn btn-primary" @click="sendSearch(1)">查詢</button>
        <button class="btn btn-outline-primary ms-1" @click="gotoDetail()">
          <i class="fa fa-plus me-1" aria-hidden="true"></i>新增
        </button>
      </div>
      <!-- table -->
      <table class="table">
        <thead class="table-light">
          <tr>
            <th width="250">產品序號</th>
            <th>型號</th>
            <th>產品名稱</th>
            <th>產品規格</th>
            <th width="140">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listData" :key="item.id">
            <td>{{ item.sequence }}</td>
            <td>{{ item.model }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.specification }}</td>
            <td>
              <button class="btn btn-outline-secondary" 
                @click="gotoDetail(item)">
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </button>
              <button class="btn btn-outline-secondary ms-3"
                @click="deleteProduct(item)">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="5">查無資料</td></tr>
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
import { ref, inject, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, formatPath } from '@/common/api';
import { ajax } from '@/common/ajax';
import PaginationBox from '@/components/PaginationBox.vue';

const route = useRoute();
const router = useRouter();
const popMsg = inject('popMsg');
const openConfirm = inject('openConfirm');
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const listData = ref([]);
const listIsempty = ref(false);
const searchModel = ref({
  name: '',
  paging: {
    pageNo: 1,
    numberOfRowsPerPage: 10,
    dir: "DESC",
    sort: "createDate",
    totalRows: 0
  }
});

async function sendSearch(pageNo) {
  const path = VITE_API_DOMAIN + api.Admin.productList;
  if (pageNo) {
    searchModel.value.paging.pageNo = pageNo;
  }
  const param = JSON.parse(JSON.stringify(searchModel.value));
  if (!param.name) {
    delete param.name;
  }
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

function changePage(pageNo, numberOfRowsPerPage) {
  searchModel.value.paging.pageNo = pageNo;
  searchModel.value.paging.numberOfRowsPerPage = numberOfRowsPerPage;
  sendSearch();
}

function gotoDetail(item) {
  if (item) {
    router.push({ name: 'AdminProductManagementDetail', query: { 
      sequence: item.sequence, 
      pageNo: searchModel.value.paging.pageNo, 
      name: searchModel.value.name,  
      item: JSON.stringify(item)
    }});
  } else {
    router.push({ name: 'AdminProductManagementDetail' });
  }
}

function deleteProduct(item) {
  openConfirm('確認刪除?', async () => {
    const path = VITE_API_DOMAIN + formatPath(api.Admin.deleteProduct, item.id);
    const result = await ajax.delete(path);
    if (ajax.checkErrorCode(result.errorCode)) {
      if (searchModel.value.paging.pageNo > 1 && listData.value.length === 1) {
        searchModel.value.paging.pageNo = searchModel.value.paging.pageNo - 1;
      }
      sendSearch();
    } else {
      popMsg(result.errorCode)
    }
  });
}

onMounted(() => {
  if (route.query.pageNo) {
    searchModel.value.paging.pageNo = Number.parseInt(route.query.pageNo, 10);
  }
  if (route.query.name) {
    searchModel.value.name = route.query.name;
  }
  router.replace();
  sendSearch();
});

</script>