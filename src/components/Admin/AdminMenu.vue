<template>
  <div class="AdminMenu">
    <img class="logo" src="/img/logo.svg" alt="logo"/>
    <div class="menu-box">
      <RouterLink :class="[{active: route.name === 'AdminDefectiveUtilization'}]"
        :to="{ name: 'AdminDefectiveUtilization' }">不良率與稼動率統計</RouterLink>
      <RouterLink :class="[{active: route.name === 'AdminFormingMachineFailureHistory'}]"
        :to="{ name: 'AdminFormingMachineFailureHistory' }">成型機故障履歷的統計</RouterLink>
      <RouterLink :class="[{active: route.name === 'AdminReport'}]"
        :to="{ name: 'AdminReport' }">報表下載</RouterLink>
      <RouterLink :class="[{
          active: route.name === 'AdminReplacementProductForm' || route.name === 'AdminReplacementProductFormDetail', 
        }]"
        :to="{ name: 'AdminReplacementProductForm' }">更換產品確認單</RouterLink>
      <RouterLink :class="[{active: route.name === 'AdminProductManagement'}]"
        :to="{ name: 'AdminProductManagement' }">產品管理</RouterLink>
      <RouterLink :class="[{active: route.name === 'AdminFormingMachineMonitoringItemList'}]"
        :to="{ name: 'AdminFormingMachineMonitoringItemList' }">監控項目</RouterLink>


        

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'

const route = useRoute()


</script>