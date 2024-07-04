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
    
    <div class="fs-4 text-center pt-4" v-if="isNoProductChangeCheckList">
      <p class="fs-1">查無任何更換單</p>
      <button class="btn btn-primary p-5 fs-1 mb-5" 
        @click="reWorking()">恢復生產</button>
    </div>
    <template v-if="!isNoProductChangeCheckList">
      <select class="form-select mb-3" v-model="choiceProductChangeCheck">
        <option value="">請選擇更換單</option>
        <option v-for="item in productChangeCheckList" :key="'list' + item.id"
          :value="item">[{{ item.orderDate }}] - [{{ changeMethodMap[item.changeMethod] }}] - [{{ item.changeProductNo }}]</option>
      </select>
      <template v-if="choiceProductChangeCheck">
        <div class="step-box mb-4 mt-5">
          <div :class="[{'active': displayStep >= 1 }]">1</div>
          <div :class="[{'active': displayStep >= 2 }]">2</div>
          <div :class="[{'active': displayStep >= 3 }]">3</div>
        </div>

        <!-- 更換產品選項 -->
        <div class="custom-tables-box" v-if="displayStep === 1">
          <div class="mb-3 row">
            <label class="form-label col-4">產品編號</label>
            <div class="col-8">
              <span class="fs-3">{{ choiceProductChangeCheck.changeProductNo }}</span>
            </div>
          </div>
          <div class="mb-3 row">
            <!-- <label class="form-label col-4">成品規格</label> -->
            <label class="form-label col-4">包裝數</label>
            <div class="col-8">
              <span class="fs-3">{{ choiceProductChangeCheck.changePackageQty }} P</span>
              <!-- <input type="text" class="form-control" v-model.trim="modifyFROM.specification"> -->
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">原紙種類</label>
            <div class="col-8">
              <select class="form-select" v-model="modifyFROM.paperType">
                <option value="">請選擇</option>
                <option value="GENERAL">一般原紙</option>
                <option value="FSC">FSC</option>
              </select>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">杯身紙台車編號 xe giấy thân cốc</label>
            <div class="col-8">
              <InputScanBarcode 
                :scanCallback="(val) => { modifyFROM.cupPaperCartNumber = val }"/>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">杯底紙編號 giấy đế cốc</label>
            <div class="col-8">
              <InputScanBarcode 
                :scanCallback="(val) => { modifyFROM.bottomPaperNumber = val }"/>
            </div>
          </div>

          <button class="btn btn-primary w-100 mt-4" 
            :disabled="!modifyFROM.paperType || !modifyFROM.cupPaperCartNumber || !modifyFROM.bottomPaperNumber"
            @click="saveModifyFROM()">送出</button>
        </div>

        <!-- 檢查更換產品確認單 -->
        <div class="custom-tables-box" v-if="displayStep === 2">
          <div class="mb-3 row">
            <lable class="form-label col-4">產品類型</lable>
            <div class="col-8 fs-3">
              {{ productTypeMap[choiceProductChangeCheck.productType] }}
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
              <template v-if="choiceProductChangeCheck.changeProvisionName">
                {{ choiceProductChangeCheck.changeProvisionName }}
              </template>
              <template v-else>
                {{ choiceProductChangeCheck.changeProvisionNo }}
              </template>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">更換包裝機編號</label>
            <div class="col-8 fs-3">
              {{ changeMethodMap[choiceProductChangeCheck.changeMethod] }}
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
              <div class="form-check mb-1 ms-3">
                <input type="checkbox" class="form-check-input" v-model="modifyREPLACE.remainingConfirm" />
                <label class="form-check-label">更換產品前次紙杯餘料
                  {{ choiceProductChangeCheck.paperCupRemaining }} pcs
                  需於本次生產進行重包，數量確認:{{ choiceProductChangeCheck.repackageQty }} pcs
                  <!-- <input type="text" class="form-control d-inline-flex" style="width: 200px"
                    v-model="modifyREPLACE.repackageQty"/> pcs -->
                </label>
                
              </div>
              <div class="form-check mt-1 ms-3">
                <input type="checkbox" class="form-check-input" v-model="modifyREPLACE.receiveConfirm" />
                <label class="form-check-label">更換產品前次包裝膜餘料
                  {{ choiceProductChangeCheck.filmRemaining }} 捲，需於本次生產使用
                </label>
              </div>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">產品更換清空項目</label>
            <div class="col-8">
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.cupClear" /><label class="form-check-label">原線上產品的紙杯是否清空</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.filmClear" /><label class="form-check-label">原線上產品的包裝膜是否清空</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.accessoryClear" /><label class="form-check-label">原線上產品的紙箱、隔板是否清空</label></div>
              <div class="fs-3">確認人 <input type="text" class="form-control" v-model.trim="modifyREPLACE.clearChecker" placeholder="請輸入"/></div>
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">產品更換後檢查項目</label>
            <div class="col-8">
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.specConfirm" /><label class="form-check-label">包裝規格書是否正確</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.systemConfirm" /><label class="form-check-label">系統產品編號、成型機生產機台是否正確</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.positionConfirm" /><label class="form-check-label">備料紙箱放置位置是否正確</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.firstItemConfirm" /><label class="form-check-label">首件檢查，確認紙杯、包裝膜、紙箱確認符合規格書</label></div>
              <div class="form-check"><input type="checkbox" class="form-check-input" v-model="modifyREPLACE.labelConfirm" /><label class="form-check-label">首件檢查，確認標籤確認符合規格書</label></div>
              <div class="fs-3">確認人 <input type="text" class="form-control" v-model="modifyREPLACE.lastConfirmChecker" placeholder="請輸入"/></div>
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
              <input class="form-control" type="date" v-model.trim="modifyREPLACE.actualChangeTime" />
              <TimesHHMM class="mt-2" v-model="modifyREPLACE.actualChangeTime_Hm"/>
              <!-- <input class="form-control mt-2" type="text" placeholder="範例 00:00" v-model.trim="modifyREPLACE.actualChangeTime_Hm"> -->
            </div>
          </div>
          <div class="mb-3 row">
            <label class="form-label col-4">組長確認</label>
            <div class="col-8">
              <input type="text" class="form-control" v-model.trim="modifyREPLACE.managerConfirm" placeholder="請輸入"/>
            </div>
          </div>

          <button class="btn btn-primary w-100 mt-4"
            :disabled="
              !modifyREPLACE.repackageQty || 
              !modifyREPLACE.remainingConfirm || 
              !modifyREPLACE.receiveConfirm || 
              !modifyREPLACE.cupClear || 
              !modifyREPLACE.filmClear || 
              !modifyREPLACE.accessoryClear || 
              !modifyREPLACE.clearChecker || 
              !modifyREPLACE.specConfirm || 
              !modifyREPLACE.systemConfirm || 
              !modifyREPLACE.positionConfirm || 
              !modifyREPLACE.firstItemConfirm || 
              !modifyREPLACE.labelConfirm || 
              !modifyREPLACE.lastConfirmChecker || 
              !modifyREPLACE.actualChangeTime || 
              !modifyREPLACE.actualChangeTime_Hm || 
              !modifyREPLACE.managerConfirm
            "
            @click="sendCheckerProductChangeCheck()">送出</button>
        </div>

        <!-- 完成更換產品 -->
        <div class="pt-3 text-center" v-if="displayStep === 3">
          <p class="fs-4">更換產品已填寫完畢點擊切換機器狀態</p>
          <button class="btn btn-primary p-5 fs-1 mb-5"
            @click="triggerCompleted()">更換產品完成</button>
        </div>

      </template>
    </template>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import InputScanBarcode from '@/components/InputScanBarcode.vue'
import TimesHHMM from '@/components/Client/TimesHHMM.vue'
import moment from 'moment';

const popMsg = inject('popMsg')
const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const isNoProductChangeCheckList = ref(false);

const displayStep = ref(1)

const productTypeMap = {
  GENERAL_PRODUCT: '一般產品',
  FSC_PRODUCT: 'FSC產品'
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

// 取得更換產品確認單列表
const choiceProductChangeCheck = ref('');
const productChangeCheckList = ref([]);
async function getProductChangeCheckList() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getProductChangeCheck;
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    productChangeCheckList.value = result.data;
    if (!result.data.length) {
      isNoProductChangeCheckList.value = true;
    }
  } else {
    popMsg(result.errorCode)
  }
}

// 編輯 for 更換產品選項
const modifyFROM = ref({
  machineId: route.query.machineId,
  shift: clientStore.nowShift,
  productionDate: moment().format('YYYY-MM-DD'),
  materialCollectionTime: moment().format('HH:mm:ss'),
  //productName: '', // 品名
  //specification: '', // 成品規格
  paperType: '', // 原紙種類
  cupPaperCartNumber: '', // 杯身紙台車編號
  bottomPaperNumber: '', // 杯底紙編號
  changeType: 'CHANGE', 
  provisionType: nowFormingMachineInfo.value.provisionType,
  // siliconeLubricant: 0,
  // whiteOil: 0,
});

// 儲存更換產品選項 (步驟1)
async function saveModifyFROM() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.saveModifyFROM;
  modifyFROM.value.provisionType = nowFormingMachineInfo.value.provisionType;
  const result = await ajax.post(path, modifyFROM.value)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出');
    displayStep.value = 2;
  } else {
    popMsg(result.errorCode);
  }
}

// 編輯 for 檢查更換產品卻認單
const modifyREPLACE = ref({
  id: null,
  repackageQty: null,
  remainingConfirm: false,
  receiveConfirm: false,
  cupClear: false,
  filmClear: false,
  accessoryClear: false,
  clearChecker: null,
  specConfirm: false,
  systemConfirm: false,
  positionConfirm: false,
  firstItemConfirm: false,
  labelConfirm: false,
  lastConfirmChecker: null,
  actualChangeTime: '',
  actualChangeTime_Hm: '',
  managerConfirm: '',
});

// 送出 檢查更換產品確認單 (步驟2)
async function sendCheckerProductChangeCheck() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.checkerProductChangeCheck;
  const param = JSON.parse(JSON.stringify(modifyREPLACE.value));
  param.id = choiceProductChangeCheck.value.id;
  param.actualChangeTime = param.actualChangeTime + 'T' + param.actualChangeTime_Hm;
  delete param.actualChangeTime_Hm;

  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出');
    displayStep.value = 3;
  } else {
    popMsg(result.errorCode);
  }
}

// 完成 (步驟3)
function triggerCompleted() {
  openConfirm('確定完成更換產品?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'ENABLE', 
      message: '生產中', 
      provisionStatus: 'IN_PRODUCTION'
    };
    clientStore.launchProduction(param, () => {
      popMsg('更換產品完成');
      router.push({ 
        name: 'FormingMachineFnEnter',
        query: {
          machineId: nowMachineId.value
        } 
      })
    });
  });
}

function reWorking() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '生產中', 
    provisionStatus: 'IN_PRODUCTION'
  };
  clientStore.launchProduction(param, () => {
    router.push({ 
      name: 'FormingMachineFnEnter',
      query: {
        machineId: nowMachineId.value
      } 
    })
  });
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
  getProductChangeCheckList();
})

</script>

