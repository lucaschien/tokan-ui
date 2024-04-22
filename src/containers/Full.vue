<template>
  <div class="Full">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
      <nav>
        <RouterLink :class="[{ active: route.name === 'Home' }]" :to="{ name: 'Home' }"
          >Home
        </RouterLink>
        <RouterLink :class="[{ active: route.name === 'About' }]" :to="{ name: 'About' }"
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
