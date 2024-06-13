<template>
  <div class="AdminReplacementProductFormDetail">
    <RouterLink class="active"
      :to="{ name: 'AdminReplacementProductForm' }">回列表</RouterLink>

    <div class="p-4 mt-3 card">
      <table class="table">
        <tbody>
          <tr>
            <th>紙張類型</th>
            <td>
              <select class="form-select" v-model="dataModel.paperType">
                <option value="">請選擇</option>
                <option value="GENERAL">一般產品</option>
                <option value="FSC">FSC產品</option>
              </select>
            </td>
          </tr>
          <tr>
            <th width="200">開單日期</th>
            <td>
              <VueDatePicker v-model="dataModel.orderDate" 
                text-input 
                :format="'yyyy-MM-dd'" 
                :enable-time-picker="false"/>
            </td>
          </tr>
          <tr>
            <th>包裝機編號</th>
            <td>
              <select class="form-select" v-model="dataModel.changeProvisionNo"
                @change="changeProvisionNoFn($event)">
                <option value="">請選擇</option>
                <option v-for="item in changeProvisionNoList" :key="'packagingList' + item.id"
                  :value="item.id">{{ item.name }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>更換包裝機編號</th>
            <td>
              <select class="form-select" v-model="dataModel.changeMethod">
                <option value="">請選擇</option>
                <option v-for="item in changeMethodList" :key="'changeMethod' + item.value"
                  :value="item.value">{{ item.name }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>原線上產品</th>
            <td>
              <div>產品編號 
                <input class="form-control me-4" v-model="dataModel.originalProductNo"
                  list="originalProductNo" placeholder="請輸入">
                <datalist id="originalProductNo">
                  <option v-for="item in productList" :key="'originalProductNo' + item.id" 
                    :value="item.sequence">{{ item.name }}</option>
                </datalist>
              </div>
              <div class="mt-2">包裝數 
                <select class="form-select" v-model="dataModel.originalPackageQty">
                  <option value="">請選擇</option>
                  <option :value="10">10</option>
                  <option :value="16">16</option>
                  <option :value="18">18</option>
                  <option :value="20">20</option>
                  <option :value="25">25</option>
                  <option :value="30">30</option>
                  <option :value="45">45</option>
                  <option :value="50">50</option>
                  <option :value="80">80</option>
                  <option :value="100">100</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <th>更換產品</th>
            <td>
              <div>產品編號
                <input class="form-control me-4" v-model="dataModel.changeProductNo"
                  list="changeProductNo" id="exampleDataList" placeholder="請輸入">
                <datalist id="changeProductNo">
                  <option v-for="item in productList" :key="'changeProductNo' + item.id" 
                    :value="item.sequence">{{ item.name }}</option>
                </datalist>
              </div>
              <div class="mt-2">包裝數
                <select class="form-select" v-model="dataModel.changePackageQty">
                  <option value="">請選擇</option>
                  <option :value="10">10</option>
                  <option :value="16">16</option>
                  <option :value="18">18</option>
                  <option :value="20">20</option>
                  <option :value="25">25</option>
                  <option :value="30">30</option>
                  <option :value="45">45</option>
                  <option :value="50">50</option>
                  <option :value="80">80</option>
                  <option :value="100">100</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <th>生產餘數領用確認</th>
            <td>
              <div class=mb-1>
                更換產品前次紙杯餘料
                <input type="text" class="form-control d-inline-flex" style="width: 200px"
                  v-model="dataModel.paperCupRemaining"/> pcs
              </div>
              <!-- <div class="mt-1 mb-1">  
                需於本次生產進行重包，數量確認:
                <input type="text" class="form-control d-inline-flex" style="width: 200px"
                  v-model="dataModel.repackageQty"/> pcs
              </div> -->
              <div class="mt-1">更換產品前次包裝膜餘料
                <input type="text" class="form-control d-inline-flex" style="width: 200px"
                  v-model="dataModel.filmRemaining"/> 捲，需於本次生產使用
              </div>
            </td>
          </tr>
          <!-- <tr>
            <th>產品更換清空項目</th>
            <td>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.cupClear" />原線上產品的紙杯是否清空</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.filmClear" />原線上產品的包裝膜是否清空</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.accessoryClear" />原線上產品的紙箱、隔板是否清空</div>
              <div>確認人 <input type="text" class="form-control" v-model="dataModel.clearChecker" placeholder="請輸入"/></div>
            </td>
          </tr> -->
          <!-- <tr>
            <th>產品更換後檢查項目</th>
            <td>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.specConfirm" />包裝規格書是否正確</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.systemConfirm" />系統產品編號、成型機生產機台是否正確</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.positionConfirm" />備料紙箱放置位置是否正確</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.firstItemConfirm" />首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書</div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="dataModel.labelConfirm" />首件檢查，確認標籤確認符合規格書</div>
              <div>確認人 <input type="text" class="form-control" v-model="dataModel.lastConfirmChecker" placeholder="請輸入"/></div>
            </td>
          </tr> -->
          <tr>
            <th>預計更換時間</th>
            <td>
              <VueDatePicker v-model="dataModel.planChangeTime" 
                text-input 
                :format="'yyyy-MM-dd HH:mm'"
                locale="tw" 
                utc
              />
            </td>
          </tr>
          <!-- <tr>
            <th>實際更換時間</th>
            <td>
              <VueDatePicker v-model="dataModel.actualChangeTime" 
                text-input 
                :format="'yyyy-MM-dd HH:mm'" />
            </td>
          </tr> -->
          <!-- <tr>
            <th>組長確認</th>
            <td><input type="text" class="form-control" v-model="dataModel.managerConfirm" placeholder="請輸入"/></td>
          </tr> -->
        </tbody>
      </table>
      <button class="btn btn-primary" 
        @click="updateProductChangeCheck()">儲存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';

const route = useRoute();
const router = useRouter();
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

// 新增與修改共用此 model
const dataModel = ref({
  id: (route.query.id) ? route.query.id : null,

  paperType: '', // 紙張類型
  orderDate: '', // 開單日期
  changeProvisionNo: '', // 包裝機編號(不在excel中)
  changeProvisionName: '', // 包裝機名稱(不在excel中)
  changeMethod: '', // 更換包裝機編號(在excel中)

  // 原線上產品
  originalProductNo: '', // 原線上產品-產品編號
  originalPackageQty: '', // 原線上產品-包裝數

  // 更換產品
  changeProductNo: '', // 更換產品-產品編號
  changePackageQty: '', // 更換產品-包裝數

  // 生產餘數領用確認
  paperCupRemaining: null, // 更換產品前次紙杯餘料(pcs)
  // repackageQty: null, // 數量確認(pcs)
  filmRemaining: null, // 更換產品前次包裝膜餘料(捲)

  // 產品更換清空項目
  // cupClear: false, // 原線上產品的紙杯是否清空
  // filmClear: false, // 原線上產品的包裝膜是否清空
  // accessoryClear: false, // 原線上產品的紙箱、隔板是否清空
  // clearChecker: null, // 產品更換清空項目-確認人

  // 產品更換後檢查項目
  // specConfirm: false, // 包裝規格書是否正確
  // systemConfirm: false, // 系統產品編號、成型機生產機台是否正確
  // positionConfirm: false, // 備料紙箱放置位置是否正確
  // firstItemConfirm: false, // 首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書
  // labelConfirm: false, // 首件檢查，確認標籤確認符合規格書
  // lastConfirmChecker: null, // 產品更換後檢查項目-確認人

  planChangeTime: null, // 預計更換時間
  //actualChangeTime: null, // 實際更換時間
  //managerConfirm: null, // 組長確認
});

// 切換 包裝機編號
function changeProvisionNoFn(event) {
  const temp = changeProvisionNoList.value.filter(item => item.id === event.target.value)
  dataModel.value.changeProvisionName = (temp.length) ? temp[0].name : '';
}

// 新增或修改 更換產品確認單
async function updateProductChangeCheck() {
  const path = VITE_API_DOMAIN + api.Admin.updateProductChangeCheck;
  const param = JSON.parse(JSON.stringify(dataModel.value));
  param.orderDate = moment(param.orderDate).format('YYYY-MM-DD')
  param.planChangeTime = moment(param.planChangeTime).format('YYYY-MM-DDTHH:mm:ss');

  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    const msg = (dataModel.value.id) ? '修改成功' : '新增成功';
    popMsg(msg);
    router.push({ 
      name: 'AdminReplacementProductForm', 
      query: {
        pageNo: route.query.pageNo,
        date: route.query.date
      }
    });
  } else {
    popMsg(result.errorCode)
  }
}

// 撈取 包裝機編號 清單
const changeProvisionNoList = ref([]);
async function getPackagingList() {
  const path = VITE_API_DOMAIN + api.Admin.getPackagingList;
  const param = {
    provisionTypes: ['PACKAGING']
  };
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    changeProvisionNoList.value = result.data;
  } else {
    popMsg(result.errorCode);
  }
}

// 更換包裝機編號 清單
const changeMethodList = [
  { name: '1號換2號', value: 'ONE_TO_TWO' },
  { name: '2號換1號', value: 'TWO_TO_ONE' },
  { name: '4號換2號', value: 'FOUR_TO_TWO' },
  { name: '2號換4號', value: 'TWO_TO_FOUR' },
  { name: '1號', value: 'ONE' },
  { name: '2號', value: 'TWO' },
  { name: '3號', value: 'THREE' },
  { name: '4號', value: 'FOUR' },
  { name: '5號', value: 'FIVE' },
  { name: '11號', value: 'ELEVEN' }
];

// 撈取 產品編號 清單
const productList = ref([]);
async function getProductList() {
  const path = VITE_API_DOMAIN + api.Admin.productList;
  const param = {
    paging: {
    pageNo: 1,
      numberOfRowsPerPage: 9999999,
      dir: "DESC",
      sort: "createDate",
      totalRows: 0
    }
  }
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    productList.value = result.data;
  } else {
    popMsg(result.errorCode)
  }
}

getPackagingList();
getProductList();

// 有 id 代表是修改
if (route.query.id) {
  dataModel.value = JSON.parse(route.query.item);
}
</script>