<template>
  <div class="FormingMachineFnEnter p-3">
    <!-- 功能介面 -->
    <template v-if="!enterRestingView">
      <div class="d-flex align-items-center mb-3" v-if="nowFormingMachineInfo">
        <h1 class="me-5 mb-0">{{ nowFormingMachineInfo.name }}</h1>
        <RouterBackBtn 
          :btn-text="'選擇其它機號'"
          :router-name="'FormingMachine'"
        />
      </div>
      <div class="card-box">
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachinePatrol()">巡查</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineHandover()">工作交接</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;" class="flex-column"
            @click="gotoFormingMachinePicking()">領料<span class="fs-3">nhận nguyên liệu</span></a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineWaterLeakageAdjustment()">漏水調機</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineTroubleshooting()">故障排除</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineReplaceProduct()">更換產品</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="confirmToBreak()">休息中</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineClean()">機台清潔</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="moldReplacement()">模具更換</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="shutdownAndRepair()">停機待修</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="gotoFormingMachineProductionInterruption()">生產中斷</a>
        </div>
        <div :class="['card m-2 align-items-center', { disabled: false }]">
          <a href="javascript:;"
            @click="shutDown()">關機</a>
        </div>
      </div>
    </template>
    <!-- 休息中介面 -->
    <RestingView  v-if="enterRestingView"
      :nowMachineId="nowMachineId"/>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import RestingView from '@/components/Client/RestingView.vue'
import { popMsg } from '@/common/alert';

const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料
const enterRestingView = ref(false) // 進入休息中的介面


// 巡查
function gotoFormingMachinePatrol() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '生產中', 
    provisionStatus: 'IN_PRODUCTION'
  };
  clientStore.launchProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachinePatrol', query: { machineId: nowMachineId.value } });
  }); 
}

// 工作交接
function gotoFormingMachineHandover() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '生產中', 
    provisionStatus: 'IN_PRODUCTION'
  };
  clientStore.launchProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachineHandover', query: { machineId: nowMachineId.value } });
  }); 
}

// 領料
function gotoFormingMachinePicking() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '領料中', 
    provisionStatus: 'MATERIAL_ISSUANCE'
  };
  clientStore.launchProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachinePicking', query: { machineId: nowMachineId.value } });
  }); 
}

// 漏水調機 注意呼叫的 函式 不同
function gotoFormingMachineWaterLeakageAdjustment() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '漏水調機中', 
    provisionStatus: 'MACHINE_CALIBRATION'
  };
  // 注意呼叫的 函式 不同
  clientStore.lockProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachineWaterLeakageAdjustment', query: { machineId: nowMachineId.value } });
  });
}

// 故障排除 注意呼叫的 函式 不同
function gotoFormingMachineTroubleshooting() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '故障排除中', 
    provisionStatus: 'TROUBLESHOOTING'
  };
  // 注意呼叫的 函式 不同
  clientStore.lockProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachineTroubleshooting', query: { machineId: nowMachineId.value } });
  });
}

// 更換產品
function gotoFormingMachineReplaceProduct() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'DISABLE', 
    message: '更換產品中', 
    provisionStatus: 'PRODUCT_CHANGE'
  };
  clientStore.launchProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachineReplaceProduct', query: { machineId: nowMachineId.value } });
  });
}

// 休息中
function confirmToBreak() {
  openConfirm('確認休息?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'DISABLE', 
      message: '休息中', 
      provisionStatus: 'RESTING'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId);
    });
  })
}

// 機台清潔 
function gotoFormingMachineClean() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'DISABLE', 
    message: '機台清潔中', 
    provisionStatus: 'MACHINE_CLEANING'
  };
  clientStore.launchProduction(param, () => {
    clientStore.getFormingMachineInfo(route.query.machineId);
    router.push({ name: 'FormingMachineClean', query: { machineId: nowMachineId.value } });
  }); 
}

// 模具更換
function moldReplacement() {
  openConfirm('確認模具更換?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'DISABLE', 
      message: '模具更換中', 
      provisionStatus: 'MOLD_CHANGE'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId);
    });
  })
}

// 停機待修
function shutdownAndRepair() {
  openConfirm('確認停機與請求待修?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'DISABLE', 
      message: '停機待修中', 
      provisionStatus: 'MACHINE_STOPPED_FOR_REPAIR'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId);
    });
  })
}

// 生產中斷 
function gotoFormingMachineProductionInterruption() {
  openConfirm('確認生產中斷中?', () => {
    const param = {
      id: nowMachineId.value, 
      buttonType: 'DISABLE', 
      message: '生產中斷中', 
      provisionStatus: 'PRODUCTION_INTERRUPTED'
    };
    clientStore.launchProduction(param, () => {
      clientStore.getFormingMachineInfo(route.query.machineId);
      router.push({ name: 'FormingMachineProductionInterruption', query: { machineId: nowMachineId.value } });
    });
  })
}

// 關機
function shutDown() {
  openConfirm('確認關機?', async () => {
    const path = VITE_API_DOMAIN + api.fmoldingMachine.startAndStopMachine
    const param = {
      provisionId: nowMachineId.value,
      buttonType: "DISABLE",
      message: "關機中",
      provisionStatus: "MACHINE_CLOSED"
    }
    const result = await ajax.post(path, param);
    if (ajax.checkErrorCode(result.errorCode)) {
      popMsg('執行關機成功')
      router.push({ name: 'FormingMachine' });
    } else {
      popMsg('執行關機失敗')
    }
  })
}


// watch
watch(() => nowFormingMachineInfo.value, (newVal) => {
  // 是休息中進入休息中的介面
  if (newVal.status === 'RESTING') {
    enterRestingView.value = true;
  } else {
    enterRestingView.value = false;
  }
});


onMounted(async () => {
  nowMachineId.value = route.query.machineId;
  await clientStore.getFormingMachineInfo(nowMachineId.value);
  await clientStore.getLastMaterial(nowMachineId.value);

  // IN_PRODUCTION  RESTING
  if (nowFormingMachineInfo.value.status === 'RESTING') {
    enterRestingView.value = true;
  }
})
</script>