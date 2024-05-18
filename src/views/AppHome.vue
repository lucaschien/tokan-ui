<template>
  <div class="AppHome p-4">
    <img class="logo" src="/img/logo.svg" />
    <h1>請選擇進入平台</h1>
    <div>
      <RouterLink :to="{ name: 'ClientHome' }">作業平台</RouterLink>
      <RouterLink :to="{ name: 'AdminDefectiveUtilization' }">管理平台</RouterLink>
    </div>
    <button class="btn btn-link mt-4" @click="rootStore.logout()">登出</button>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useRootStore } from '@/stores/root'

const rootStore = useRootStore()

</script>