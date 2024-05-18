<template>
  <div class="ClientFull">
    <ClientHeader/>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import ClientHeader from '@/components/Client/ClientHeader.vue'

</script>
