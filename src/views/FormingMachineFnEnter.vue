<template>
  <div class="FormingMachineFnEnter p-3">
    <!-- 功能介面 -->
    <div class="d-flex align-items-center mb-3" v-if="nowFormingMachineInfo">
      <h1 class="me-5 mb-0">{{ nowFormingMachineInfo.name }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
    </div>
    <div class="card-box">
      <!-- 巡查 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]"
        v-if="rootStore.loginUserInfo.roleCode !== 'MOLDING_WORKER'">
        <a href="javascript:;"
          @click="gotoFormingMachinePatrol()">巡查</a>
      </div>
      <!-- 工作交接 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]"
        v-if="rootStore.loginUserInfo.roleCode !== 'MOLDING_WORKER'">
        <a href="javascript:;"
          @click="gotoFormingMachineHandover()">工作交接</a>
      </div>
      <!-- 領料 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="gotoFormingMachinePicking()">領料<span class="fs-3">nhận nguyên liệu</span></a>
      </div>
      <!-- 漏水調機 -->
      <div :class="['card m-2 align-items-center', { disabled: true }]">
        <a href="javascript:;" class="flex-column"
          @click="gotoFormingMachineWaterLeakageAdjustment()">漏水調機<span class="fs-3">Điều chỉnh máy khi rò nước</span></a>
      </div>
      <!-- 故障排除 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]"
        v-if="rootStore.loginUserInfo.roleCode !== 'MOLDING_WORKER'">
        <a href="javascript:;"
          @click="gotoFormingMachineTroubleshooting()">故障排除</a>
      </div>
      <!-- 更換產品 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]"
        v-if="rootStore.loginUserInfo.roleCode !== 'MOLDING_WORKER'">
        <a href="javascript:;"
          @click="gotoFormingMachineReplaceProduct()">更換產品</a>
      </div>
      <!-- 休息中 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="confirmToBreak()">休息中<span class="fs-3">Nghỉ giải lao</span></a>
      </div>
      <!-- 機台清潔 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="gotoFormingMachineClean()">機台清潔<span class="fs-3">Vệ sinh máy</span></a>
      </div>
      <!-- 模具更換 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]"
        v-if="rootStore.loginUserInfo.roleCode !== 'MOLDING_WORKER'">
        <a href="javascript:;"
          @click="moldReplacement()">模具更換</a>
      </div>
      <!-- 停機待修 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="shutdownAndRepair()">停機待修<span class="fs-3">Dừng máy chờ sửa chữa</span></a>
      </div>
      <!-- 生產中斷 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="gotoFormingMachineProductionInterruption()">生產中斷<span class="fs-3">Gián đoạn sản xuất</span></a>
      </div>
      <!-- 關機 -->
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <a href="javascript:;" class="flex-column"
          @click="shutDown()">關機<span class="fs-3">Tắt máy</span></a>
      </div>
    </div>
    <!-- 停止作業中的介面 -->
    <StopWorkView
      :nowMachineId="nowMachineId"/>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { useClientStore } from '@/stores/ClientStore'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import StopWorkView from '@/components/Client/StopWorkView.vue'

const popMsg = inject('popMsg')
const openConfirm = inject('openConfirm')
const route = useRoute()
const router = useRouter()
const rootStore = useRootStore()
const clientStore = useClientStore()
const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

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
  return false;
  // const param = {
  //   id: nowMachineId.value, 
  //   buttonType: 'ENABLE', 
  //   message: '漏水調機中', 
  //   provisionStatus: 'MACHINE_CALIBRATION'
  // };
  // // 注意呼叫的 函式 不同
  // clientStore.lockProduction(param, () => {
  //   clientStore.getFormingMachineInfo(route.query.machineId);
  //   router.push({ name: 'FormingMachineWaterLeakageAdjustment', query: { machineId: nowMachineId.value } });
  // });
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

onMounted(async () => {
  nowMachineId.value = route.query.machineId;
  await clientStore.getFormingMachineInfo(nowMachineId.value);
  await clientStore.getLastMaterial(nowMachineId.value);
})
</script>