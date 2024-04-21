<template>
  <div class="Full">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      <nav>
        <RouterLink :class="[{ active: route.name === 'HomeView' }]" :to="{ name: 'HomeView' }"
          >Home
        </RouterLink>
        <RouterLink :class="[{ active: route.name === 'AboutView' }]" :to="{ name: 'AboutView' }"
          >About
        </RouterLink>
      </nav>
    </header>
    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
console.log('route', route)
</script>
