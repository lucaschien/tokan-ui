<template>
  <div class="AppHome">
    請選擇進入平台<br>
    <RouterLink :to="{ name: 'ClientHome' }">作業平台</RouterLink>
    <br>
    <RouterLink :to="{ name: 'AdminLogin' }">管理平台</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>