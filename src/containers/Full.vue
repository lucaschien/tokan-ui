<template>
  <div class="Full">
    <Header/>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>
