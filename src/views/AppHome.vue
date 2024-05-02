<template>
  <div class="AppHome">
    <img class="logo" src="/logo.svg" />
    <h1>請選擇進入平台</h1>
    <div>
      <RouterLink :to="{ name: 'ClientHome' }">作業平台</RouterLink>
      <RouterLink :to="{ name: 'AdminLogin' }">管理平台</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>