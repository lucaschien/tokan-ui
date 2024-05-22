<template>
  <!-- 2-Q-007-01-2.6生產品質檢驗表 -->
  <div class="custom-tables-box Table2_Q_007_01_2_6">
    <p>2-Q-007-01-2.6生產品質檢驗表</p>

    <div class="mb-3">
      <label class="form-label">班別</label>
      <!-- 新增 -->
      <div class="fs-1" v-if="!props.detailItem">
        <template v-if="props.createShift === 'MORNING'">早班</template>
        <template v-if="props.createShift === 'AFTERNOON'">午班</template>
        <template v-if="props.createShift === 'NIGHT'">晚班</template>
      </div>
      <div class="fs-1" v-if="props.detailItem">
        <template v-if="dataModel.shift === 'MORNING'">早班</template>
        <template v-if="dataModel.shift === 'AFTERNOON'">午班</template>
        <template v-if="dataModel.shift === 'NIGHT'">晚班</template>
      </div>
    </div>

    <div  class="mb-5">
      <label class="form-label">檢查時間</label>
      <div class="d-flex align-items-center">
        <input type="text" class="form-control me-2" style="width:200px" 
          :disabled="props.detailItem"
          v-model="timeH" placeholder="範例 00"> 
        <span class="fs-3" >:</span>
        <input type="text" class="form-control ms-2" style="width:200px" 
          :disabled="props.detailItem"
          v-model="timeM" placeholder="範例 00">  
      </div>
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
      @click="updatePackagingBagInspection()" v-if="!props.detailItem">送出</button>
    <!-- 修改按鈕 -->
    <button class="btn btn-primary w-100 mt-4"
      @click="updatePackagingBagInspection()" v-if="props.detailItem">修改</button>

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
  createShift: String,
  detailItem: String,
  seccessCallback: Function
})


// const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

const dataModel = ref({
  machineId: route.query.machineId,
  shift: props.createShift,
  productionDate: moment().format('YYYY-MM-DD'),
  inspectionTime: '',
  operatorName: rootStore.loginUserInfo.name, // 操作員姓名
  normalPrint: false, // 印字正常
  normalPrintAppearance: false, // 印刷外觀正常
  goodPackagingBackSeal: false, // 包裝背封良好
  goodPackagingUpperSeal: false, // 包裝上封口良好
  goodPackagingLowerSeal: false, // 包裝下封口良好
  normalPackagingBagWidth: false, // 包裝袋寬幅正常
});
const timeH = ref(''); // 小時
const timeM = ref(''); // 分鐘

// 儲存包裝膜檢查 (新增與修改)
async function updatePackagingBagInspection() {
  const path = VITE_API_DOMAIN + api.moldingMachine.updatePackagingBagInspection;
  let temp = dataModel.value;
  temp.inspectionTime = timeH.value + ':' + timeM.value + ':00'; // 將秒數加回去

  const param = {
    "machineId": route.query.machineId,
    "shift": temp.shift,
    "productionDate": temp.productionDate,
    "inspectionTime": temp.inspectionTime,
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
async function getDetail() {
  const path = VITE_API_DOMAIN + api.moldingMachine.getPackagingBagInspectionDetail;
  const param = {
    machineId: props.detailItem.machineId,
    shift: props.detailItem.shift,
    productionDate: props.detailItem.productionDate,
    inspectionTime: props.detailItem.inspectionTime
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    
    timeH.value = result.data.inspectionTime.slice(0,2);
    timeM.value = result.data.inspectionTime.slice(3,5);

    dataModel.value.shift = result.data.shift;
    dataModel.value.productionDate = result.data.productionDate;
    dataModel.value.inspectionTime = result.data.inspectionTime;
    dataModel.value.operatorName = result.data.operatorName;
    dataModel.value.normalPrint = (result.data.normalPrint === 'Y') ? true : false;
    dataModel.value.normalPrintAppearance = (result.data.normalPrintAppearance === 'Y') ? true : false;
    dataModel.value.goodPackagingBackSeal = (result.data.goodPackagingBackSeal === 'Y') ? true : false;
    dataModel.value.goodPackagingUpperSeal = (result.data.goodPackagingUpperSeal === 'Y') ? true : false;
    dataModel.value.goodPackagingLowerSeal = (result.data.goodPackagingLowerSeal === 'Y') ? true : false;
    dataModel.value.normalPackagingBagWidth = (result.data.normalPackagingBagWidth === 'Y') ? true : false;
  } else {
    popMsg(result.errorCode)
  }
}

if (props.detailItem) {
  console.log('props.detailItem')
  getDetail();
}

</script>