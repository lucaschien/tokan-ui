<template>
  <div class="FormingMachinePicking p-3">
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

    <h4 class="text-center mt-4 mb-4">領料 <br>nhận nguyên liệu</h4>

    <div class="custom-tables-box">
      <div class="mb-4 row">
        <label class="form-label col-8">領料選項 <br>mục lựa chọn nhận nguyên liệu</label>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">杯身紙台車編號 <br>xe giấy thân cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => { test1 = val }"/>
        </div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">杯底紙編號 <br>giấy đế cốc</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => { test2 = val }"/>
        </div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">矽利康 <br>keo dính silicon</label>
        <div class="col-7">
          <input class="form-control" type="text" />
        </div>
        <div class="col-1 fs-3">公升</div>
      </div>
      <div class="mb-4 row">
        <label class="form-label col-4">白油 <br>dầu trắng</label>
        <div class="col-7">
          <input class="form-control" type="text" />
        </div>
        <div class="col-1 fs-3">公升</div>
      </div>
      <button class="btn btn-primary w-100 mt-4" @click="popMsg('TODO... 領料完成 / hoàn thành nhận nguyên liệu')">送出</button>
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

const test1 = ref('')
const test2 = ref('')

</script>