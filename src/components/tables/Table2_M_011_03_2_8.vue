<template>
  <!-- 2-M-011-03-2.8成型機生產報表240205 -->
  <!-- 一般的成型機日報表使用 -->
  <div class="custom-tables-box Table2_M_011_03_2_8">
    <p>2-M-011-03-2.8成型機生產報表240205</p>
    <div class="mb-3 row">
      <label class="form-label col-4">班別</label>
      <div class="fs-1 col-8">
        <template v-if="!props.detailItem">{{ clientStore.shiftName[props.createShift] }}</template>
        <template v-if="props.detailItem">{{ clientStore.shiftName[dataModel.shift] }}</template>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">原紙種類: </label>
      <div class="col-8">
        <select class="form-select" v-model="dataModel.paperType" disabled>
          <option value="GENERAL">一般原紙</option>
          <option value="FSC">FSC</option>
        </select>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">生產日期</label>
      <div class="col-8">
        <input type="date" class="form-control" v-model="dataModel.productionDate">
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">生產時間:</label>
      <div class="col-8 d-flex align-items-center">
        <div>
          <TimesHHMM v-model="dataModel.productionTimeStart"/>
          <!-- <input class="form-control" type="text" v-model.trim="dataModel.productionTimeStart"
            maxlength="5"
            placeholder="範例:00:00"> -->
        </div>
        <div class="ps-3 pe-3">~</div>
        <div>
          <TimesHHMM v-model="dataModel.productionTimeEnd"/>
          <!-- <input class="form-control" type="text" v-model.trim="dataModel.productionTimeEnd"
            maxlength="5"
            placeholder="範例:00:00"> -->
        </div>
      </div> 
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">成型速度:</label>
      <div class="col-8">
        <input class="form-control" type="number" v-model.trim="dataModel.formingSpeed">
      </div>
    </div>

    <div class="mb-3 row">
      <label class="form-label col-4">杯內檢查機電腦:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupInspectionComputer" id="cupInspectionComputerY" 
            value="Y"
            v-model.trim="dataModel.cupInspectionComputer">
          <label class="form-check-label" for="cupInspectionComputerY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupInspectionComputer" id="cupInspectionComputerN"
            value="N"
            v-model.trim="dataModel.cupInspectionComputer">
          <label class="form-check-label" for="cupInspectionComputerN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">杯身兩側&杯底加熱器:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupSideBottomHeater" id="cupSideBottomHeaterY"
            value="Y"
            v-model.trim="dataModel.cupSideBottomHeater">
          <label class="form-check-label" for="cupSideBottomHeaterY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupSideBottomHeater" id="cupSideBottomHeaterN"
            value="N"
            v-model.trim="dataModel.cupSideBottomHeater">
          <label class="form-check-label" for="cupSideBottomHeaterN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">2&3號杯口捲邊加熱器:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupCurlingHeater2And3" id="cupCurlingHeater2And3Y"
            value="Y"
            v-model.trim="dataModel.cupCurlingHeater2And3">
          <label class="form-check-label" for="cupCurlingHeater2And3Y">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupCurlingHeater2And3" id="cupCurlingHeater2And3N"
            value="N"
            v-model.trim="dataModel.cupCurlingHeater2And3">
          <label class="form-check-label" for="cupCurlingHeater2And3N">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">PM傳動皮帶檢查:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="pmDriveBeltInspection" id="pmDriveBeltInspectionY"
            value="Y"
            v-model.trim="dataModel.pmDriveBeltInspection">
          <label class="form-check-label" for="pmDriveBeltInspectionY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="pmDriveBeltInspection" id="pmDriveBeltInspectionN"
            value="N"
            v-model.trim="dataModel.pmDriveBeltInspection">
          <label class="form-check-label" for="pmDriveBeltInspectionN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">毛刷傳動皮帶檢查:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="brushDriveBeltInspection" id="brushDriveBeltInspectionY"
            value="Y"
            v-model.trim="dataModel.brushDriveBeltInspection">
          <label class="form-check-label" for="brushDriveBeltInspectionY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="brushDriveBeltInspection" id="brushDriveBeltInspectionN"
            value="N"
            v-model.trim="dataModel.brushDriveBeltInspection">
          <label class="form-check-label" for="brushDriveBeltInspectionN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">第一卷邊傳動皮帶檢查:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="firstRollEdgeDriveBeltInspection" id="firstRollEdgeDriveBeltInspectionY"
            value="Y"
            v-model.trim="dataModel.firstRollEdgeDriveBeltInspection">
          <label class="form-check-label" for="firstRollEdgeDriveBeltInspectionY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="firstRollEdgeDriveBeltInspection" id="firstRollEdgeDriveBeltInspectionN"
            value="N"
            v-model.trim="dataModel.firstRollEdgeDriveBeltInspection">
          <label class="form-check-label" for="firstRollEdgeDriveBeltInspectionN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">外觀確認:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="appearanceConfirmation" id="appearanceConfirmationY"
            value="Y"
            v-model.trim="dataModel.appearanceConfirmation">
          <label class="form-check-label" for="appearanceConfirmationY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="appearanceConfirmation" id="appearanceConfirmationN"
            value="N"
            v-model.trim="dataModel.appearanceConfirmation">
          <label class="form-check-label" for="appearanceConfirmationN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">破壞測試確認:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="destructionTestConfirmation" id="destructionTestConfirmationY"
            value="Y"
            v-model.trim="dataModel.destructionTestConfirmation">
          <label class="form-check-label" for="destructionTestConfirmationY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="destructionTestConfirmation" id="destructionTestConfirmationN"
            value="N"
            v-model.trim="dataModel.destructionTestConfirmation">
          <label class="form-check-label" for="destructionTestConfirmationN">異常</label>
        </div>
      </div>
    </div>
    <div class="mb-3 row">
      <label class="form-label col-4">杯底紙裁切完整度檢查:</label>
      <div class="col-8 d-flex">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupBottomPaperCuttingCompletenessCheck" id="cupBottomPaperCuttingCompletenessCheckY"
            value="Y"
            v-model.trim="dataModel.cupBottomPaperCuttingCompletenessCheck">
          <label class="form-check-label" for="cupBottomPaperCuttingCompletenessCheckY">正常</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="cupBottomPaperCuttingCompletenessCheck" id="cupBottomPaperCuttingCompletenessCheckN"
            value="N"
            v-model.trim="dataModel.cupBottomPaperCuttingCompletenessCheck">
          <label class="form-check-label" for="cupBottomPaperCuttingCompletenessCheckN">異常</label>
        </div>
      </div>
    </div>

    <!-- <div class="mb-3 row">
      <label class="form-label col-4">生產杯數(pcs):</label>
      <div class="col-8">
        <input class="form-control" type="number" disabled 
          v-model="dataModel.producedCups">
      </div>
    </div> -->

    <button class="btn btn-primary w-100 mt-4" :disabled="!canSaveBtn"
      @click="updateInspectionMoldingMachineProduction()">儲存</button>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import moment from 'moment'
import TimesHHMM from '@/components/Client/TimesHHMM.vue'

const route = useRoute()
const clientStore = useClientStore()
const popMsg = inject('popMsg')
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const props = defineProps({
  createShift: String,
  detailItem: String,
  seccessCallback: Function
})

const dataModel = ref({
  machineId: route.query.machineId,
  shift: props.createShift, // 班別
  productionDate: '', // 生產日期
  paperType: clientStore.lastMaterial.paperType, // 原紙種類
  productionTimeStart: '', // 生產時間 起
  productionTimeEnd: '', // 生產時間 迄
  //formingSpeed: 0, // 成型速度 TODO... 前端不用帶
  cupInspectionComputer: "N", // 杯內檢查機電腦
  cupSideBottomHeater: "N", // 杯身兩側&杯底加熱器
  cupCurlingHeater2And3: "N", // 2&3號杯口捲邊加熱器
  pmDriveBeltInspection: "N", // PM傳動皮帶檢查
  brushDriveBeltInspection: "N", // 毛刷傳動皮帶檢查
  firstRollEdgeDriveBeltInspection: "N", // 第一卷邊傳動皮帶檢查
  appearanceConfirmation: "N", // 外觀確認
  destructionTestConfirmation: "N", // 破壞測試確認
  cupBottomPaperCuttingCompletenessCheck: "N", // 杯底紙裁切完整度檢查
  //producedCups: 0, // 生產杯數(pcs) TODO... 前端不用帶
});

const canSaveBtn = computed(() => {
  if (
    !dataModel.value.productionDate ||
    !dataModel.value.productionTimeStart ||
    !dataModel.value.productionTimeEnd
  ) {
    return false;
  } else {
    return true;
  }
})

// 儲存一般成型機日報表部分項目 (新增與修改)
async function updateInspectionMoldingMachineProduction() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.updateInspectionMoldingMachineProduction;
  let temp = JSON.parse(JSON.stringify(dataModel.value));
  temp.productionDate = moment(temp.productionDate).format('YYYY-MM-DD') // 避免不同瀏覽器或裝置日期格式不同
  temp.productionTimeStart = temp.productionTimeStart + ':00'; // 將秒數加回去
  temp.productionTimeEnd = temp.productionTimeEnd + ':00'; // 將秒數加回去

  const result = await ajax.post(path, temp)
  if (ajax.checkErrorCode(result.errorCode)) {
    popMsg('資料已送出')
    props.seccessCallback();
  } else {
    popMsg(result.errorCode)
  }
}

// 撈取詳細資料
async function getDetail() {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getInspectionMoldingMachineProduction;
  const param = {
    machineId: props.detailItem.machineId,
    shift: props.detailItem.shift,
    productionDate: props.detailItem.productionDate,
    paperType: props.detailItem.paperType
  };
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    dataModel.value = result.data;
    // 將秒數長度截短程線
    if (dataModel.value.productionTimeStart) {
      dataModel.value.productionTimeStart = dataModel.value.productionTimeStart.slice(0,5);
    }
    if (dataModel.value.productionTimeEnd) {
      dataModel.value.productionTimeEnd = dataModel.value.productionTimeEnd.slice(0,5);
    }
  } else {
    popMsg(result.errorCode)
  }
}

if (props.detailItem) {
  getDetail();
}
</script>