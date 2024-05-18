<template>
  <header class="ClientHeader">
    <div>
      <RouterLink 
        class="home-link"
        :to="{ name: 'ClientHome' }"
        @click="showMenu = false">
        <img alt="回功能首頁" class="logo" src="/img/logo.svg" />
      </RouterLink>
      
      <div class="main-nav-box">
        <button :class="['btn btn-outline-primary menu-btn', { active: showMenu }]"
          @click="showMenu = !showMenu">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        <nav :class="[{ show: showMenu }]">
          <a class="me-1 logout-btn"
            @click="rootStore.logout()"><i class="fa fa-sign-out" aria-hidden="true"></i>登出</a>
          <RouterLink class="logout me-4"
            :to="{ name: 'AppHome' }">回平台選擇</RouterLink>

          <RouterLink 
            class="disabled"
            @click="showMenu = false">裁切機作業</RouterLink>
          <RouterLink 
            :class="[{ active: route.meta.nav === 'FormingMachine' }]" 
            :to="{ name: 'FormingMachine' }"
            @click="showMenu = false">成型機作業</RouterLink>
          <RouterLink 
            class="disabled"
            @click="showMenu = false">品檢室檢驗作業</RouterLink>
          <RouterLink 
            class="disabled"
            @click="showMenu = false">品質管理作業</RouterLink>
          <RouterLink 
            class="disabled"
            @click="showMenu = false">保修人員作業</RouterLink>
        </nav>
      </div>

    </div>

    <h5>
      <template v-for="(item, i) in route.meta.breadcrumb" :key="'breadcrumb'+i">
        {{ item }}
        <i class="fa fa-angle-right" aria-hidden="true" 
          v-if="i+1 < route.meta.breadcrumb.length">
        </i>
      </template>
    </h5>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useRootStore } from '@/stores/root'

const route = useRoute()
const rootStore = useRootStore()

const showMenu = ref(false)

</script>