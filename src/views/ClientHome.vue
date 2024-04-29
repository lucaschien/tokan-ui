<template>
  <div class="ClientHome">
    <div class="card-box">
      <div :class="['card m-2 align-items-center', { disabled: true }]">
        <RouterLink 
          :to="{}">裁切機作業</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: false }]">
        <RouterLink
          :to="{ name: 'FormingMachine' }">成型機作業</RouterLink>
      </div>
      <div class="card m-2 align-items-center disabled">
        <RouterLink 
          :to="{}">品檢室檢驗作業</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: true }]">
        <RouterLink 
          :to="{}">品質管理作業</RouterLink>
      </div>
      <div :class="['card m-2 align-items-center', { disabled: true }]">
        <RouterLink 
          :to="{}">保修人員作業</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

</script>
