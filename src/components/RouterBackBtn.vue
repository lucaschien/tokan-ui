<template>
  <button class="RouterBackBtn btn btn-outline-primary ms-3"
    @click="back()">{{ btnText }}</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const { btnText, routerName, routerQuery } = defineProps({
  btnText: {
    type: String,
    default: '返回'
  },
  routerName: {
    type: String,
    required: true
  },
  routerQuery: {
    default: {}
  }
})

const back = () => {
  router.push({ name: routerName, query: routerQuery })
}

</script>