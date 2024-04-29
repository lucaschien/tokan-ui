<template>
  <div class="FormingMachinePicking p-3">
    <div class="d-flex align-items-center mb-3" v-if="nowMachine">
      <h1 class="me-5 mb-0">#{{ nowMachine }}</h1>
      <RouterBackBtn 
        :btn-text="'選擇其它機號'"
        :router-name="'FormingMachine'"
      />
      <RouterBackBtn 
        :btn-text="'選擇其它功能'"
        :router-name="'FormingMachineFnEnter'"
        :router-query="{ 'machine': nowMachine }"
      />
    </div>

    <h4 class="text-center mt-4 mb-4">領料</h4>

    <div class="custom-tables-box">
      <div class="mb-3 row">
        <label class="form-label col-4">杯身紙台車</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => { test1 = val }"/>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">杯底紙</label>
        <div class="col-8">
          <InputScanBarcode 
            :scanCallback="(val) => { test2 = val }"/>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">矽利康</label>
        <div class="col-8">
          <input class="form-control" type="text" >
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">白油</label>
        <div class="col-8">
          <input class="form-control" type="text" >
        </div>
      </div>
      <button class="btn btn-primary w-100 mt-4" @click="popMsg('資料已送出')">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import RouterBackBtn from '@/components/RouterBackBtn.vue'
import InputScanBarcode from '@/components/InputScanBarcode.vue'

const popMsg = inject('popMsg')
const route = useRoute()

const nowMachine = ref(null)

onMounted(() => {
  nowMachine.value = route.query.machine;
})

const test1 = ref('')
const test2 = ref('')

</script>