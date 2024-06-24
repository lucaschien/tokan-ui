<template>
  <div class="FormingMachineHandover p-3">
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

    <h4 class="text-center mt-4 mb-4">工作交接</h4>
    
    <div>
      <select class="form-select mb-4" v-model="workingType">
        <option :value="'MonitoringItems'"><template v-if="nowFormingMachineInfo.provisionType === 'FORMING_SF170'">SF170成型</template>監控項目確認</option>
        <option :value="'TeamLeaderWorkHandover'">組長工作交接事項</option>
        <option :value="null">工作交接完成</option>
      </select>
    </div>

    <!-- 監控項目確認 -->
    <MonitoringItems v-if="workingType === 'MonitoringItems'"/>
    <!-- 組長工作交接事項 -->
    <TeamLeaderWorkHandover v-if="workingType === 'TeamLeaderWorkHandover'"/>
    <!-- 工作交接完成 -->
    <div class="pt-3 text-center" v-if="!workingType">
      <p class="fs-4">工作交接均已填寫完畢點擊切換機器狀態</p>
      <button class="btn btn-primary p-5 fs-1 mb-5" 
        @click="triggerCompleted()">工作交接完成</button>
    </div>


    <div class="custom-tables-box" v-if="false">
      <div class="h3 mb-3">監控項目確認</div>
      <div class="mb-5">
        <div class="mb-3 row">
          <label class="form-label col-4">油視流器是否正常</label>
          <div class="col-8 d-flex">
            <div class="form-check me-3">
              <input class="form-check-input" type="radio" name="sample1" id="test1">
              <label class="form-check-label" for="test1">正常</label>
            </div>
            <div class="form-check me-3">
              <input class="form-check-input" type="radio" name="sample1" id="test2">
              <label class="form-check-label" for="test2">異常</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sample1" id="test3">
              <label class="form-check-label" for="test3">NA</label>
            </div>
          </div>
        </div>
        <div class="mb-3 row">
          <label class="form-label col-4">油幫浦壓力是否正常</label>
          <div class="col-8 d-flex">
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sample2" id="test4">
              <label class="form-check-label" for="test4">正常</label>
            </div>
            <input class="form-control ms-2 me-3" style="width: 25%;" type="text">
            <div class="form-check me-3">
              <input class="form-check-input" type="radio" name="sample2" id="test5">
              <label class="form-check-label" for="test5">異常</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="sample2" id="test6">
              <label class="form-check-label" for="test6">NA</label>
            </div>
          </div>
        </div>
      </div>

      <div class="h3 mb-3">組長工作交接事項</div>
      <textarea class="form-control mb-3" 
        rows="4"
        placeholder="請輸入"></textarea>

      <button class="btn btn-primary w-100 mt-4" 
        @click="popMsg('資料已送出')">送出</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import MonitoringItems from '@/components/Client/FormingMachineHandover/MonitoringItems.vue'
import TeamLeaderWorkHandover from '@/components/Client/FormingMachineHandover/TeamLeaderWorkHandover.vue'

const route = useRoute()
const router = useRouter()
const clientStore = useClientStore()
const popMsg = inject('popMsg')

const nowMachineId = ref(null);
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

const workingType = ref(null);

function triggerCompleted() {
  const param = {
    id: nowMachineId.value, 
    buttonType: 'ENABLE', 
    message: '生產中', 
    provisionStatus: 'IN_PRODUCTION'
  };
  clientStore.launchProduction(param, () => {
    popMsg('工作交接完成');
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
})
</script>