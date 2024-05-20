<template>
  <div class="FormingMachineHandover p-3">
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

    <h4 class="text-center mt-4 mb-4">工作交接</h4>

    <div class="custom-tables-box">
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
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/ClientStore'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const route = useRoute()
const clientStore = useClientStore()

const nowMachineId = ref(null)
const oneFormingMachineInfo = computed(() => clientStore.getOneFormingMachineInfo); // 當前成型機資料

onMounted(() => {
  nowMachineId.value = route.query.machineId;
})


</script>