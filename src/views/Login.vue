<template>
  <div class="Login">
    <div>
      <label class="form-label">帳號</label>
      <input class="form-control" type="text" v-model="account">
      <label class="form-label">密碼</label>
      <input class="form-control" type="text" v-model="password">
      <button class="btn btn-primary mt-4">登入</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const account = ref('')
const password = ref('')

</script>
