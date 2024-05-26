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

    <div class="custom-tables-box">
      <div class="mb-3 row">
        <label class="form-label col-4">狀況處理單位記錄</label>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" name="sample1" id="test1">
          <label class="form-check-label" for="test1">生產</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" name="sample1" id="test2">
          <label class="form-check-label" for="test2">維修</label>
        </div>
        <div class="form-check col-2">
          <input class="form-check-input" type="radio" name="sample1" id="test3">
          <label class="form-check-label" for="test3">管理</label>
        </div>
      </div>
      <div class="mb-3 row">
        <label class="form-label col-4">處理人員記錄</label>
        <div class="col-8">
          <textarea class="form-control" row="3"></textarea>
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
        @click="popMsg('資料已送出')">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const nowFormingMachineInfo = computed(() => clientStore.getNowFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})

</script>