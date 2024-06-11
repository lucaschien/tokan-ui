<template>
  <div class="FormingMachineReplaceProduct p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ nowFormingMachineInfo.name }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
      <RouterBackBtn 
        :btn-text="'選擇其它功能'"
        :router-name="'FormingMachineFnEnter'"
        :router-query="{ 'machineId': nowMachineId }"
      />
    </div>

    <h4 class="text-center mt-4 mb-4">更換產品</h4>
    
    <select class="form-select mb-3" v-model="choiceProductChangeCheck">
      <option value="">請選擇更換單</option>
      <option v-for="item in productChangeCheckList" :key="'list' + item.id"
        :value="item">[{{ item.orderDate }}] - [{{ changeMethodMap[item.changeMethod] }}] - [{{ item.changeProductNo }}]</option>
    </select>

    <template v-if="choiceProductChangeCheck">
      <select class="form-select mb-3" v-model="displayView">
        <option value="FROM">更換產品選項</option>
        <option value="REPLACE">檢查更換產品確認單</option>
        <option value="COMPLATE">更換產品已完成</option>
      </select>

      <div class="pt-3 text-center" v-if="displayView === 'COMPLATE'">
        <p class="fs-4">更換產品已填寫完畢點擊切換機器狀態</p>
        <button class="btn btn-primary p-5 fs-1 mb-5">更換產品完成</button>
      </div>

      <div class="custom-tables-box" v-if="displayView === 'FROM'">
        TODO... 開發中
        <div class="mb-3 row">
          <label class="form-label col-4">品名</label>
          <div class="col-8">
            <select class="form-select">
              <option>請選擇</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">成品規格</label>
          <div class="col-8">
            <select class="form-select">
              <option>請選擇</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">原紙種類</label>
          <div class="col-8">
            <select class="form-select">
              <option>請選擇</option>
            </select>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">杯身紙台車編號 xe giấy thân cốc</label>
          <div class="col-8">
            <InputScanBarcode 
              :scanCallback="(val) => {}"/>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">杯底紙編號 giấy đế cốc</label>
          <div class="col-8">
            <InputScanBarcode 
              :scanCallback="(val) => {}"/>
          </div>
        </div>

        <button class="btn btn-primary w-100 mt-4" 
          @click="popMsg('資料已送出')">送出</button>
      </div>

      <!-- 檢查更換產品確認單 -->
      <div class="custom-tables-box" v-if="displayView === 'REPLACE'">
        TODO... 開發中

            <div class="mb-3 row">
              <lable class="form-label col-4">紙張類型</lable>
              <div class="col-8 fs-3">
                {{ paperTypeMap[choiceProductChangeCheck.paperType] }}
              </div>
            </div>
            <div class="mb-3 row">
              <lable class="form-label col-4">開單日期</lable>
              <div class="col-8 fs-3">
                {{ choiceProductChangeCheck.orderDate }}
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">包裝機編號</label>
              <div class="col-8 fs-3">
                {{ choiceProductChangeCheck.changeProvisionNo }}
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">更換包裝機編號</label>
              <div class="col-8 fs-3">
                {{ choiceProductChangeCheck.changeMethod }}
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">原線上產品</label>
              <div class="col-8">
                <div class="fs-3">產品編號: 
                  {{ choiceProductChangeCheck.originalProductNo }}
                </div>
                <div class="mt-2 fs-3">包裝數: 
                  {{ choiceProductChangeCheck.originalPackageQty }}
                </div>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">更換產品</label>
              <div class="col-8 fs-3">
                <div>產品編號: 
                  {{ choiceProductChangeCheck.changeProductNo }}
                </div>
                <div class="mt-2 fs-3">包裝數: 
                  {{ choiceProductChangeCheck.changePackageQty }}
                </div>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">生產餘數領用確認</label>
              <div class="col-8 fs-3">
                <div class=mb-1>
                  更換產品前次紙杯餘料
                  {{ choiceProductChangeCheck.paperCupRemaining }} pcs
                </div>
                <div class="mt-1 mb-1">  
                  需於本次生產進行重包，數量確認:
                  <input type="text" class="form-control d-inline-flex" style="width: 200px"
                    v-model="choiceProductChangeCheck.repackageQty"/> pcs
                </div>
                <div class="mt-1">更換產品前次包裝膜餘料
                  {{ choiceProductChangeCheck.filmRemaining }} 捲，需於本次生產使用
                </div>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">產品更換清空項目</label>
              <div class="col-8">
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.cupClear" /><label class="form-check-label">原線上產品的紙杯是否清空</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.filmClear" /><label class="form-check-label">原線上產品的包裝膜是否清空</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.accessoryClear" /><label class="form-check-label">原線上產品的紙箱、隔板是否清空</label></div>
                <div class="fs-3">確認人 <input type="text" class="form-control" v-model="choiceProductChangeCheck.clearChecker" placeholder="請輸入"/></div>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">產品更換後檢查項目</label>
              <div class="col-8">
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.specConfirm" /><label class="form-check-label">包裝規格書是否正確</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.systemConfirm" /><label class="form-check-label">系統產品編號、成型機生產機台是否正確</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.positionConfirm" /><label class="form-check-label">備料紙箱放置位置是否正確</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.firstItemConfirm" /><label class="form-check-label">首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書</label></div>
                <div class="form-check"><input type="checkbox" class="form-check-input" v-model="choiceProductChangeCheck.labelConfirm" /><label class="form-check-label">首件檢查，確認標籤確認符合規格書</label></div>
                <div class="fs-3">確認人 <input type="text" class="form-control" v-model="choiceProductChangeCheck.lastConfirmChecker" placeholder="請輸入"/></div>
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">預計更換時間</label>
              <div class="col-8 fs-3">
                {{ moment(choiceProductChangeCheck.planChangeTime).format('yyyy-MM-DD HH:mm') }}
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">實際更換時間</label>
              <div class="col-8">
                <input class="form-control" type="date" v-model="choiceProductChangeCheck.actualChangeTime" />
                <input class="form-control mt-2" type="text" placeholder="範例00:00" >
              </div>
            </div>
            <div class="mb-3 row">
              <label class="form-label col-4">組長確認</label>
              <div class="col-8">
                <input type="text" class="form-control" v-model="choiceProductChangeCheck.managerConfirm" placeholder="請輸入"/>
              </div>
            </div>

      </div>
    </template>


  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import InputScanBarcode from '@/components/InputScanBarcode.vue'
import moment from 'moment';

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const displayView = ref('COMPLATE')

const paperTypeMap = {
  GENERAL: '一般產品',
  FSC: 'FSC產品'
}

const changeMethodMap = {
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
};

// 更換產品確認單
const choiceProductChangeCheck = ref('');
const productChangeCheckList = ref([]);
async function getProductChangeCheckList() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getProductChangeCheck;
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    productChangeCheckList.value = result.data;
  } else {
    popMsg(result.errorCode)
  }
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;

  getProductChangeCheckList();
})

</script>

