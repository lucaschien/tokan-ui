<template>
  <div class="FormingMachineReplaceProduct p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachineId">
      <h1 class="me-5 mb-0">{{ oneFormingMachineInfo.name }}</h1>
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

    <div class="custom-tables-box">
      <div class="mb-3 row">
        <label class="form-label col-4">品名</label>
        <div class="col-8">
          <select class="form-select">
            <option>請選擇</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">成品規格</label>
        <div class="col-8">
          <select class="form-select">
            <option>請選擇</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">原紙種類</label>
        <div class="col-8">
          <select class="form-select">
            <option>請選擇</option>
          </select>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯身紙台車編號 xe giấy thân cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => {}"/>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底紙編號 giấy đế cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => {}"/>
        </div>
      </div>

      <button class="btn btn-primary w-100 mt-4" 
        @click="popMsg('資料已送出')">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import InputScanBarcode from '@/components/InputScanBarcode.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

</script>

