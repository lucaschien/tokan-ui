<template>
  <div class="FormingMachineRestSwitch p-3">
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

    <h4 class="text-center mt-4 mb-4">休息狀態切換</h4>

    <div class="custom-tables-box text-center">
      <h5 class="mb-4">當前狀態: 生產中</h5>
      <button class="btn btn-primary change-status-btn"
        @click="enterRest()">進入休息</button>
      <button class="btn btn-success change-status-btn"
        @click="resumeWork()">恢復生產</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import RouterBackBtn from '@/components/RouterBackBtn.vue'

const popMsg = inject('popMsg')
const openConfirm = inject('openConfirm')
const route = useRoute()

const nowMachine = ref(null)

onMounted(() => {
  nowMachine.value = route.query.machine;
})

//
function enterRest() {
  openConfirm('是否進入休息?', () => {
    popMsg('已進入休息狀態')
  })
}

//
function resumeWork() {
  popMsg('已恢復生產作業')
}
</script>