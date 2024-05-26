<template>
  <div class="FormingMachinePatrol p-3">
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
    <h4 class="text-center mt-4 mb-4">巡查</h4>
    <div>
      <select class="form-select mb-4" v-if="!lookDetail"
        v-model="choiceTable"
        @change="changeWork()">
        <option :value="null">巡查已完成</option>
        <!-- SF170的成型機日報表使用: 2-M-011-13-1.4 SF-170成型機生產報表  -->
        <option v-if="nowFormingMachineInfo.provisionType === 'FORMING_SF170'" 
          value="2_M_011_13_1_4_SF_170">巡查未完成 - SF170成型日報表部分項目</option>

        <!-- 一般的成型機日報表使用: 2-M-011-03-2.8成型機生產報表240205 -->
        <option v-if="nowFormingMachineInfo.provisionType === 'FORMING'" 
          value="2_M_011_03_2_8">巡查未完成 - 成型日報表部分項目</option>

        <option value="2_Q_007_11_1_0">巡查未完成 - 紙杯破壞試驗檢查表</option>
        <option value="2_Q_007_01_2_6">巡查未完成 - 包裝膜檢查</option>
      </select>

      <div class="mb-3">
        <div class="d-flex" v-if="!lookDetail && choiceTable">
          <select class="form-select text-center" style="width: 150px;" 
            v-model="createType">
            <option value="MORNING">早班</option>
            <option value="AFTERNOON">午班</option>
            <option value="NIGHT">晚班</option>
          </select>
          <button class="btn btn-primary p-4 ms-1" :disabled="canUseCreateBtn"
            @click="lookDetail = true; lookDetailItem=null;">新增</button>
        </div>
        <button class="btn btn-primary p-4" v-if="lookDetail && choiceTable"
          @click="backList()">返回列表</button>
      </div>

      <!-- 列表 -->
      <template v-if="!lookDetail">
        <!-- SF170的成型機日報表項目 列表 -->
        <table class="table" v-if="choiceTable === '2_M_011_13_1_4_SF_170'">
          <thead>
            <tr>
              <th>#</th>
              <th>班別</th>
              <th>生產日期</th>
              <th>原紙種類</th>
              <th>生產時間</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="'2_M_011_13_1_4_SF_170' + item.shift">
              <td class="fs-1">{{index + 1}}</td>
              <td class="fs-3">{{ clientStore.shiftName[item.shift] }}</td>
              <td class="fs-3">{{ item.productionDate }}</td>
              <td class="fs-3">
                <template v-if="item.paperType === 'GENERAL'">一般原紙</template>
                <template v-if="item.paperType === 'FSC'">FSC</template>
              </td>
              <td class="fs-3">{{ item.productionTimeStart }}~{{ item.productionTimeEnd }}</td>
              <td>
                <button class="btn btn-outline-primary" @click="setDetailObj(item)">
                  <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="6">查無資料</td></tr>
          </tbody>
        </table>

        <!-- 一般成型日報表部分項目 列表 -->
        <table class="table" v-if="choiceTable === '2_M_011_03_2_8'">
          <thead>
            <tr>
              <th>#</th>
              <th>班別</th>
              <th>生產日期</th>
              <th>原紙種類</th>
              <th>生產時間</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="'2_M_011_03_2_8' + item.shift">
              <td class="fs-1">{{index + 1}}</td>
              <td class="fs-3">{{ clientStore.shiftName[item.shift] }}</td>
              <td class="fs-3">{{ item.productionDate }}</td>
              <td class="fs-3">
                <template v-if="item.paperType === 'GENERAL'">一般原紙</template>
                <template v-if="item.paperType === 'FSC'">FSC</template>
              </td>
              <td class="fs-3">{{ item.productionTimeStart }}~{{ item.productionTimeEnd }}</td>
              <td>
                <button class="btn btn-outline-primary" @click="setDetailObj(item)">
                  <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="6">查無資料</td></tr>
          </tbody>
        </table>

        <!-- 紙杯破壞試驗檢查表 列表 -->
        <table class="table" v-if="choiceTable === '2_Q_007_11_1_0'">
          <thead>
            <tr>
              <th width="80">#</th>
              <th width="250">生產日期</th>
              <th width="200">班別</th>
              <th>組長</th>
              <th>時間/檢查結果</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in listData" :key="'2_Q_007_11_1_0' + i">
              <td class="fs-1">1</td>
              <td class="fs-3">{{ item[i]['productionDate'] }}</td>
              <td class="fs-3">{{ clientStore.shiftName[item[i]['shift']] }}</td>
              <td class="fs-4">{{ item[i]['teamLeader'] }}</td>
              <td>
                <div v-for="(jtem, j) in item" :key="'2_Q_007_11_1_0' + i + j">
                  <template v-if="jtem.inspectionTime">
                    {{ jtem.inspectionTime.slice(0,5) }}
                  </template>
                  {{ jtem.testResult }}
                </div>
              </td>
              <td>
                <button class="btn btn-outline-primary fs-2" @click="setDetailObj(item)">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="6">查無資料</td></tr>
          </tbody>
        </table>

        <!-- 包裝膜檢查 列表 -->
        <table class="table" v-if="choiceTable === '2_Q_007_01_2_6'">
          <thead>
            <tr>
              <th width="200">#</th>
              <th>班別</th>
              <th>檢查結果</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="'2_Q_007_01_2_6' + item.shift">
              <td class="fs-1">{{ index+1 }}</td>
              <td class="fs-3">
                {{ clientStore.shiftName[item.shift] }}
                <div>{{ item.productionDate }}</div>
                <template v-if="item.inspectionTime">
                  {{ item.inspectionTime.slice(0,5) }}
                </template>
              </td>
              <td>
                <div>印字正常: {{ item.normalPrint }}</div>
                <div>印刷外觀正常: {{ item.normalPrintAppearance }}</div>
                <div>包裝背封良好: {{ item.goodPackagingBackSeal }}</div>
                <div>包裝上封口良好: {{ item.goodPackagingUpperSeal }}</div>
                <div>包裝下封口良好: {{ item.goodPackagingLowerSeal }}</div>
                <div>包裝袋寬幅正常: {{ item.normalPackagingBagWidth }}</div>
              </td>
              <td>
                <button class="btn btn-outline-primary" @click="setDetailObj(item)">
                  <i class="fa fa-pencil fs-2" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            <tr v-if="listIsempty"><td class="pt-5 pb-5 text-center text-secondary" colspan="4">查無資料</td></tr>
          </tbody>
        </table>
      </template>

      <!-- 內頁 -->
      <template v-if="lookDetail">
        <!-- SF170成型機日報表部分項目 -->
        <Table2_M_011_13_1_4_SF_170 v-if="choiceTable === '2_M_011_13_1_4_SF_170'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />

        <!--- 一般成型機日報表部分項目 -->
        <Table2_M_011_03_2_8 v-if="choiceTable === '2_M_011_03_2_8'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />

        <!-- 紙杯破壞試驗檢查表 -->
        <Table2_Q_007_11_1_0 v-if="choiceTable === '2_Q_007_11_1_0'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />

        <!-- 包裝膜檢查 -->
        <Table2_Q_007_01_2_6 v-if="choiceTable === '2_Q_007_01_2_6'"
          :createShift="createType"
          :detailItem="lookDetailItem" 
          :seccessCallback="tableModifyCall"
        />
      </template>

    </div>

    <div class="pt-3 text-center" v-if="!choiceTable">
      <p class="fs-4">巡查項目均已填寫完畢點擊切換機器狀態</p>
      <button class="btn btn-primary p-5 fs-1 mb-5" 
        @click="triggerCompleted()">巡查完成</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import moment from 'moment'

import RouterBackBtn from '@/components/RouterBackBtn.vue'
import Table2_M_011_13_1_4_SF_170 from '@/components/tables/Table2_M_011_13_1_4_SF_170.vue'
import Table2_M_011_03_2_8 from '@/components/tables/Table2_M_011_03_2_8.vue'
import Table2_Q_007_11_1_0 from '@/components/tables/Table2_Q_007_11_1_0.vue'
import Table2_Q_007_01_2_6 from '@/components/tables/Table2_Q_007_01_2_6.vue'

const popMsg = inject('popMsg')
const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const choiceTable = ref(null)
const listData = ref([]) // 所有列表共用此變數
const listIsempty = ref(false)
const lookDetail = ref(false)
const lookDetailItem = ref(null)

const createType = ref('MORNING') // 新增樣式下拉選單

// 是否可以使用新增按鈕
const canUseCreateBtn = computed(() => {
  let re = false;
  // 紙杯破壞試驗檢查表的資料格式跟大家不同
  if (choiceTable.value === '2_Q_007_11_1_0') {
    listData.value.forEach((item) => {
      if (item.length) {
        item.forEach((jtem) => {
          if (createType.value === jtem.shift) {
            re = true;
          }
        });
      }
    });
  }
  if (choiceTable.value !== '2_Q_007_11_1_0') {
    listData.value.forEach((item) => {
      if (createType.value === item.shift) {
        re = true;
      }
    });
  }
  
  return re;
});

// 切換巡查下拉選單
function changeWork() {
  listData.value = []
  listIsempty.value = false
  lookDetail.value = false
  lookDetailItem.value = null

  const param = {
    machineId: nowMachineId.value,
    productionDate: moment().format('YYYY-MM-DD'),
  }
  nextTick(() => {
    // 撈取SF170成型日報表部分項目
    if (choiceTable.value === '2_M_011_13_1_4_SF_170') {
      get2_M_011_13_1_4_SF_170List(param);
    }
    // 撈取列表資料 依照不同下拉呼叫不同的函式
    if (choiceTable.value === '2_M_011_03_2_8') {
      get2_M_011_03_2_8List(param)
    }
    // 紙杯破壞試驗檢查表
    if (choiceTable.value === '2_Q_007_11_1_0') {
      get2_Q_007_11_1_0List(param)
    }
    // 包裝膜檢查
    if (choiceTable.value === '2_Q_007_01_2_6') {
      get2_Q_007_01_2_6List(param)
    }
  })
}

// 撈取SF170成型日報表部分項目
async function get2_M_011_13_1_4_SF_170List(param) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getInspectionSF170MoldingMachineProductions;
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      listData.value = result.data;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg('撈取SF170成型日報表部分項目列表失敗')
  }
}

// 撈取成型日報表部分項目列表
async function get2_M_011_03_2_8List(param) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getInspectionMoldingMachineProductions;
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      listData.value = result.data;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg('撈取成型日報表部分項目列表失敗')
  }
}

// 撈取紙杯破壞試驗檢查表列表
async function get2_Q_007_11_1_0List(param) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getCupDestructionTestInspections;
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      // 依照班別將四個時段整理成一行
      const MORNING = result.data.filter((item) => item.shift === 'MORNING');
      const AFTERNOON = result.data.filter((item) => item.shift === 'AFTERNOON');
      const NIGHT = result.data.filter((item) => item.shift === 'NIGHT');
      const temp = [];
      if (MORNING.length) {
        temp.push(MORNING)
      }
      if (AFTERNOON.length) {
        temp.push(AFTERNOON)
      }
      if (NIGHT.length) {
        temp.push(NIGHT)
      }
      listData.value = temp;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg('撈取紙杯破壞試驗檢查表列表失敗')
  }
}

// 撈取包裝膜檢查列表
async function get2_Q_007_01_2_6List(param) {
  const path = VITE_API_DOMAIN + api.fmoldingMachine.getPackagingBagInspections
  const result = await ajax.post(path, param)
  if (ajax.checkErrorCode(result.errorCode)) {
    if (result.data.length) {
      listData.value = result.data;
    } else {
      listIsempty.value = true;
    }
  } else {
    popMsg('撈取包裝膜檢查列表失敗')
  }
}

// 設定要觀看的物件
function setDetailObj(item) {
  lookDetailItem.value = item;
  nextTick(() => {
    lookDetail.value = true;
  })
}

// 詳細頁儲存後的回呼函式
function tableModifyCall () {
  lookDetailItem.value = null;
  nextTick(() => {
    lookDetail.value = false;
    changeWork();
  });
}

// 返回列表
function backList() {
  lookDetailItem.value = null;
  nextTick(() => {
    lookDetail.value = false; 
    changeWork();
  })
}

// 巡查完成
function triggerCompleted() {
  openConfirm('確定完成巡查?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'ENABLE', 
      message: '生產中', 
      provisionStatus: 'IN_PRODUCTION'
    };
    clientStore.launchProduction(param, () => {
      popMsg('巡查完成');
      router.push({ 
        name: 'FormingMachineFnEnter',
        query: {
          machineId: nowMachineId.value
        } 
      })
    });
  });
}

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})
</script>