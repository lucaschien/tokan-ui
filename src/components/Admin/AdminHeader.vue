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
    <RouterLink class="logout"
      :to="{ name: 'AppHome'}">登出</RouterLink>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()



</script>