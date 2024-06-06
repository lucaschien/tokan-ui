<template>
<div class="PaginationBox">
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"
        @click="prePage()"><a class="page-link" href="javascript:;"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></li>
      <li :class="['page-item', { active: page === currentPageNo}]" v-for="page in totalPage" :key="'page'+page"
        @click="changePage(page)"><a class="page-link" href="javascript:;">{{ page }}</a></li>
      <li class="page-item"
        @click="nextPage()"><a class="page-link" href="javascript:;"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
    </ul>
  </nav>
</div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
  pageNo: {
    type: Number,
    default: 1
  },
  totalRows: {
    type: Number,
    default: 0
  },
  numberOfRowsPerPage: {
    type: Number,
    default: 10
  },
  changeCall: {
    type: Function
  }
});

const perPageNo = ref(10);     // 一頁顯示幾筆資料
const currentPageNo = ref(1);  // 當前頁數
const totalPage = ref(0);      // 總頁碼數

watch(() => props.pageNo, (newVal) => {
  currentPageNo.value = newVal;
});
watch(() => props.totalRows, (newVal) => {
  calcTotalPage(newVal);
});
watch(() => props.numberOfRowsPerPage, (newVal) => {
  this.perPage = newVal;
});

//計算資料總筆數, 給予 totalPage
function calcTotalPage(_totalRows) { 
  totalPage.value = Math.ceil(_totalRows / perPageNo.value);
}

//頁碼切換回呼
function changePage(pageNo) { 
  currentPageNo.value = pageNo;
  props.changeCall(currentPageNo.value, perPageNo.value );
}

// 上一頁
function prePage() {
  if (currentPageNo.value === 1) {
    return
  }
  changePage(currentPageNo.value - 1);
}

// 下一頁
function nextPage() {
  if (currentPageNo.value === totalPage.value) {
    return
  }
  changePage(currentPageNo.value + 1);
}

currentPageNo.value = Number.parseInt(props.pageNo, 10);
perPageNo.value = Number.parseInt(props.numberOfRowsPerPage, 10);
calcTotalPage(Number.parseInt(props.numberOfRowsPerPage, 10));
</script>