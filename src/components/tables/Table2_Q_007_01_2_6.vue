<template>
  <!-- 2-Q-007-01-2.6生產品質檢驗表 -->
  <div class="custom-tables-box Table2_Q_007_01_2_6">
    <p>2-Q-007-01-2.6生產品質檢驗表</p>

    <div class="mb-5">
      <label class="form-label">班別</label>
      <!-- 提醒: 編輯不能改班別 -->
      <select class="form-select" :disabled="props.detailId.length"
        v-model="dataModel.shift">
        <option :value="''">請選擇</option>
        <option value="MORNING">早班</option>
        <option value="AFTERNOON">中班</option>
        <option value="NIGHT">晚班</option>
      </select>
    </div>
    
    <div class="mb-5">
      <div class="fs-2">
        包裝袋檢查<span class="fs-4 ms-2">(檢查數: 3個)</span>
      </div>
      <div class="ms-5">
        <h3 class="mt-3 ms-2">檢查為正常:</h3>
        <div class="row ms-1">
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="normalPrint" v-model="dataModel.normalPrint">
            <label class="form-check-label" for="normalPrint">印字正常</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="normalPrintAppearance" v-model="dataModel.normalPrintAppearance">
            <label class="form-check-label" for="normalPrintAppearance">印刷外觀正常</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="goodPackagingBackSeal" v-model="dataModel.goodPackagingBackSeal">
            <label class="form-check-label" for="goodPackagingBackSeal">包裝背封良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="goodPackagingUpperSeal" v-model="dataModel.goodPackagingUpperSeal">
            <label class="form-check-label" for="goodPackagingUpperSeal">包裝上封口良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="goodPackagingLowerSeal" v-model="dataModel.goodPackagingLowerSeal">
            <label class="form-check-label" for="goodPackagingLowerSeal">包裝下封口良好</label>
          </div>
          <div class="form-check col-3 mb-4">
            <input class="form-check-input" type="checkbox" id="normalPackagingBagWidth" v-model="dataModel.normalPackagingBagWidth">
            <label class="form-check-label" for="normalPackagingBagWidth">包裝袋寬幅正常</label>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增按鈕 -->
    <button class="btn btn-primary w-100 mt-4" 
      @click="updatePackagingBagInspection()" v-if="!props.detailId">送出</button>
    <!-- 修改按鈕 -->
    <button class="btn btn-primary w-100 mt-4" v-if="props.detailId">修改</button>

  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { useClientStore } from '@/stores/ClientStore'
import moment from 'moment'

const route = useRoute()
const rootStore = useRootStore()
const clientStore = useClientStore()
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const props = defineProps({
  detailId: String,
  seccessCallback: Function
})

const choiceShift = ref(clientStore.nowShift); 
// const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

const dataModel = ref({
  machineId: route.query.machineId,
  shift: clientStore.nowShift, // 班表, default 當前時間
  productionDate: moment().format('YYYY-MM-DD'),
  operatorName: '', // 操作員姓名 TODO... 哪邊來?????
  normalPrint: false, // 印字正常
  normalPrintAppearance: false, // 印刷外觀正常
  goodPackagingBackSeal: false, // 包裝背封良好
  goodPackagingUpperSeal: false, // 包裝上封口良好
  goodPackagingLowerSeal: false, // 包裝下封口良好
  normalPackagingBagWidth: false, // 包裝袋寬幅正常
});

// 儲存包裝膜檢查
async function updatePackagingBagInspection() {
  const path = VITE_API_DOMAIN + api.moldingMachine.updatePackagingBagInspection;
  const temp = dataModel.value;
  const param = {
    "machineId": route.query.machineId,
    "shift": choiceShift.value,
    "productionDate": temp.productionDate,
    "inspectionTime": '12:00:30',
    "operatorName": rootStore.loginUserInfo.name,
    "normalPrint": (temp.normalPrint) ? 'Y': 'N',
    "normalPrintAppearance": (temp.normalPrintAppearance) ? 'Y': 'N',
    "goodPackagingBackSeal": (temp.goodPackagingBackSeal) ? 'Y': 'N',
    "goodPackagingUpperSeal": (temp.goodPackagingUpperSeal) ? 'Y': 'N',
    "goodPackagingLowerSeal": (temp.goodPackagingLowerSeal) ? 'Y': 'N',
    "normalPackagingBagWidth": (temp.normalPackagingBagWidth) ? 'Y': 'N',
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出')
    props.seccessCallback();
  } else {
    popMsg(result.errorCode)
  }
}


// 更新前端判斷當前時段的班別
clientStore.checkNowShift()


// 撈取詳細資料
function getDetail() {
  const path = VITE_API_DOMAIN + api.moldingMachine.getPackagingBagInspectionDetail;
  console.log('撈取詳細資料', path);
}

if (props.detailId) {
  getDetail();
}
</script>