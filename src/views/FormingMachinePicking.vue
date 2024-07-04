<template>
  <div class="FormingMachinePicking p-3">
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

    <h4 class="text-center mt-4 mb-4">領料 <br>nhận nguyên liệu</h4>

    <div class="custom-tables-box">
      <div class="mb-4 row">
        <label class="form-label col-8">領料選項 <br>mục lựa chọn nhận nguyên liệu</label>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">杯身紙台車編號 <br>xe giấy thân cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => { dataModel.cupPaperCartNumber = val }"/>
        </div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">杯底紙編號 <br>giấy đế cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => {  dataModel.bottomPaperNumber = val }"/>
        </div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">矽利康 <br>keo dính silicon</label>
        <div class="col-7">
          <input class="form-control" type="text" v-model="dataModel.siliconeLubricant"/>
        </div>
        <div class="col-1 fs-3">公升</div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">白油 <br>dầu trắng</label>
        <div class="col-7">
          <input class="form-control" type="text" v-model="dataModel.whiteOil"/>
        </div>
        <div class="col-1 fs-3">公升</div>
      </div>
      <!-- TODO... 使用當前最後領料記錄中的紙張類型,所以不提供界面設定
      <div class="mb-4 row">
        <lable class="form-label col-4">原紙種類</lable>
        <div class="form-check col-2">
          <input class="form-check-input" 
            v-model="dataModel.paperType"
            type="radio" 
            name="paperType" 
            id="paperType1"
            value="GENERAL">
          <label class="form-check-label" for="paperType1">一般原紙</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" 
            v-model="dataModel.paperType"
            type="radio" 
            name="paperType" 
            id="paperType2"
            value="FSC">
          <label class="form-check-label" for="paperType2">FSC</label>
        </div>
      </div> -->

      <button class="btn btn-primary w-100 mt-4" :disabled="!canSave"
        @click="saveMoldingMachineMaterialRecord()">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import InputScanBarcode from '@/components/InputScanBarcode.vue'
import { popMsg } from '@/common/alert';
import moment from 'moment';

const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const dataModel = ref({
  machineId: null,
  shift: clientStore.nowShift,
  productionDate: null,
  materialCollectionTime: null,
  paperType: clientStore.lastMaterial.paperType, // 使用當日最後一筆領料資料內的紙張類型
  cupPaperCartNumber: null, // 杯身紙台車編號
  bottomPaperNumber: null, // 杯底紙編號
  siliconeLubricant: null, // 矽利康
  whiteOil: null, // 白油
  changeType: 'ALONG_TAKE',
  provisionType: nowFormingMachineInfo.value.provisionType,
});

const canSave = computed(() => {
  if (
    !dataModel.value.cupPaperCartNumber && 
    !dataModel.value.bottomPaperNumber && 
    !dataModel.value.siliconeLubricant && 
    !dataModel.value.whiteOil
  ) {
    return false
  }
  return true
});

async function saveMoldingMachineMaterialRecord() {
  dataModel.value.productionDate = moment().format('YYYY-MM-DD');
  dataModel.value.materialCollectionTime = moment().format('HH:mm:ss');

  // 空字串轉null
  dataModel.value.cupPaperCartNumber = (dataModel.value.cupPaperCartNumber) ? dataModel.value.cupPaperCartNumber : null;
  dataModel.value.bottomPaperNumber = (dataModel.value.bottomPaperNumber) ? dataModel.value.bottomPaperNumber : null;
  dataModel.value.siliconeLubricant = (dataModel.value.siliconeLubricant) ? dataModel.value.siliconeLubricant : null;
  dataModel.value.whiteOil = (dataModel.value.whiteOil) ? dataModel.value.whiteOil : null;
  dataModel.value.provisionType = nowFormingMachineInfo.value.provisionType;

  const path = VITE_API_DOMAIN + api.fmoldingMachine.saveMoldingMachineMaterialRecord;
  const param = dataModel.value;
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('領料完成 / hoàn thành nhận nguyên liệu')
    // 恢復預設值
    dataModel.value.cupPaperCartNumber = null; 
    dataModel.value.bottomPaperNumber = null;
    dataModel.value.siliconeLubricant = null;
    dataModel.value.whiteOil = null;

    // 更新機器狀態
    const param = {
      id: nowMachineId.value, 
      buttonType: 'ENABLE', 
      message: '生產中', 
      provisionStatus: 'IN_PRODUCTION'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId, () => {
        router.push({ name: 'FormingMachineFnEnter', query: { machineId: nowMachineId.value } });
      });
    });

  } else {
    popMsg('領料失敗')
  }
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
  dataModel.value.machineId = route.query.machineId;
})
</script>