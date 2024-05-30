<template>
  <div class="FormingMachineTroubleshooting p-3">
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

    <h4 class="text-center mt-4 mb-4">故障排除</h4>

    <div class="mb-3">
      <div class="d-flex" v-if="!lookDetail">
        <select class="form-select text-center" style="width: 150px;" >
          <option value="MORNING">早班</option>
          <option value="AFTERNOON">午班</option>
          <option value="NIGHT">晚班</option>
        </select>
        <button class="btn btn-primary p-4 ms-1"
          @click="lookDetail = !lookDetail">新增</button>
      </div>
      <button class="btn btn-primary p-4" v-if="lookDetail"
        @click="lookDetail = !lookDetail">返回列表</button>
    </div>

    <!-- 列表 -->
    <template v-if="!lookDetail">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>班別</th>
            <th>生產日期</th>
            <th>處理人員</th>
          </tr>
        </thead>
      </table>
    </template>

    <!-- 內頁 -->
    <div class="custom-tables-box" v-if="lookDetail">
      {{ dataModel }}
      <div class="mb-3 row">
        <label class="form-label col-4">班別</label>
        <div class="col-8">
          <template>{{ clientStore.shiftName[dataModel.shift] }}</template>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">原紙種類</label>
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
        <label class="form-label col-4">狀況處理單位</label>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="PRODUCTION" name="issueHandlingUnit" id="issueHandlingUnit_PRODUCTION">
          <label class="form-check-label" for="issueHandlingUnit_PRODUCTION">生產</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="MAINTENANCE" name="issueHandlingUnit" id="issueHandlingUnit_MAINTENANCE">
          <label class="form-check-label" for="issueHandlingUnit_MAINTENANCE">維修</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" v-model="dataModel.issueHandlingUnit"
            value="MANAGEMENT" name="issueHandlingUnit" id="issueHandlingUnit_MANAGEMENT">
          <label class="form-check-label" for="issueHandlingUnit_MANAGEMENT">管理</label>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="form-label col-4">處理人員</label>
        <div class="col-8">
          <select class="form-select" v-model="dataModel.issueHandlingPersonnel">
            <option value="">請選擇</option>
            <option v-for="item in workerList" :key="item.id"
              :value="item.name">{{ item.name }}</option>
          </select>
        </div>
      </div>

      <div class="mb-3 row">
        <label class="form-label col-4">故障原因登載</label>
        <div class="col-8">
          <textarea class="form-control" row="3"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">故障排除記錄</label>
        <div class="col-8">
          <textarea class="form-control" row="3"></textarea>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">零件更換記錄</label>
        <div class="col-8">
          <textarea class="form-control" row="3"></textarea>
        </div>
      </div>

      <button class="btn btn-primary w-100 mt-4" 
        @click="popMsg('TODO...開發中')">送出</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api, formatPath } from '@/common/api'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const lookDetail = ref(false)

// 內頁資料 model
const dataModel = ref({
  paperType: clientStore.lastMaterial.paperType, // 原紙種類
  productionDate: '', // 生產日期
  shift: '', // 班別
  issueHandlingUnit: '', // 狀況處理單位
  issueHandlingPersonnel: '', // 處理人員
});

// 內頁的作業人員下拉人員清單
const workerList = ref([]);
async function getMoldingWorkerList() {
  const path = VITE_API_DOMAIN + formatPath(api.fmoldingMachine.roleUserList, 'MOLDING_WORKER');
  const result = await ajax.get(path);
  if (ajax.checkErrorCode(result.errorCode)) {
    workerList.value = result.data;
  } else {
    popMsg('撈取作業人員下拉人員清單失敗');
  }
}


onMounted(() => {
  nowMachineId.value = route.query.machineId;
  getMoldingWorkerList();
})

</script>