<template>
  <header class="AdminHeader">
    <div class="breadcrumb-box">
      <template v-for="(item, i) in route.meta.breadcrumb" :key="'breadcrumb'+i">
        {{ item }}
        <i class="fa fa-angle-right" aria-hidden="true" 
          v-if="i+1 < route.meta.breadcrumb.length">
        </i>
      </template>
    </div>
    <div>
      <RouterLink class="logout me-2"
        :to="{ name: 'AppHome'}">回平台選擇</RouterLink>
      <a class="logout"
        href="javascript:;"
        @click="rootStore.logout()">登出</a>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root'

const route = useRoute()
const rootStore = useRootStore()


</script>