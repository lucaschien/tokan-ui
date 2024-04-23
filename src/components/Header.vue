<template>
  <header class="pageHeaber">
    <div>
      <RouterLink 
        class="home-link"
        :to="{ name: 'Home' }"
        @click="showMenu = false">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      </RouterLink>
      
      <div class="main-nav-box">
        <button :class="['btn btn-outline-primary menu-btn', { active: showMenu }]"
          @click="showMenu = !showMenu">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>
        <nav :class="[{ show: showMenu }]">
          <RouterLink class="disabled"
            @click="showMenu = false">裁切機作業</RouterLink>
          <RouterLink 
            :class="[{ active: route.name === 'FormingMachine' }]" 
            :to="{ name: 'FormingMachine' }"
            @click="showMenu = false">成型機作業</RouterLink>
          <RouterLink class="disabled"
            @click="showMenu = false">品檢室檢驗作業</RouterLink>
          <RouterLink class="disabled"
            @click="showMenu = false">品質管理作業</RouterLink>
          <RouterLink class="disabled"
            @click="showMenu = false">保修人員作業</RouterLink>
        </nav>
      </div>

    </div>

    <h5>{{ route.meta.breadcrumb[0] }}</h5>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
console.log('route', route.meta.breadcrumb[0])

const showMenu = ref(false);

</script>