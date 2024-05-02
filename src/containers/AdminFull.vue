<template>
  <div class="AdminFull">
    <AdminMenu />
    <AdminHeader/>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AdminMenu from '@/components/Admin/AdminMenu.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'

</script>
