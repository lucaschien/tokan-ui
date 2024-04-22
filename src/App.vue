<template>
  <RouterView />
</template>

<script setup>
import { provide } from 'vue';
import { popMsg, openConfirm, openWarnConfirm, timerMsg } from '@/common/alert';
import { RouterView } from 'vue-router'

provide('popMsg', popMsg);
provide('openConfirm', openConfirm);
provide('timerMsg', timerMsg);
provide('openWarnConfirm', openWarnConfirm);

</script>
