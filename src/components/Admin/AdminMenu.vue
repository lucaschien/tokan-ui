<template>
  <div class="AdminMenu">
    <img class="logo" src="/logo.svg" alt="logo"/>
    <div class="menu-box">
      <RouterLink :class="[{active: route.name === 'AdminDefectiveUtilization'}]"
        :to="{ name: 'AdminDefectiveUtilization' }">不良率與稼動率統計</RouterLink>
      <RouterLink :class="[{active: route.name === 'AdminFormingMachineFailureHistory'}]"
      :to="{ name: 'AdminFormingMachineFailureHistory' }">成型機故障履歷的統計</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const route = useRoute()


</script>