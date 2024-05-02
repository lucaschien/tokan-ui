<template>
  <div class="AdminLogin">
    <div>
      <div class="logo-box">
        <img class="logo" src="/logo.svg" alt="logo"/>
        <img class="company-name" src="/company_name.png" alt="company name"/>
        <h4 class="mt-2">管理平台</h4>
      </div>
      <label class="form-label">帳號</label>
      <input class="form-control" type="text" v-model="account">
      <label class="form-label">密碼</label>
      <input class="form-control" type="text" v-model="password">
      <button class="btn btn-primary mt-4" @click="login()">登入</button>
      <button class="btn btn-outline-secondary mt-3" @click="back()">回平台選擇</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const account = ref('')
const password = ref('')

function login() {
  router.push({ name: 'AdminDefectiveUtilization' })
}

function back() {
  router.push({ name: 'AppHome' })
}

</script>
