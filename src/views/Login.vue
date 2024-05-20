<template>
  <div class="Login">
    <div>
      <div class="logo-box">
        <img class="logo" src="/img/logo.svg" alt="logo"/>
        <img class="company-name" src="/img/company_name.png" alt="company name"/>
        <h4 class="mt-2">管理平台</h4>
      </div>
      <label class="form-label">帳號</label>
      <input class="form-control" type="text" v-model="account">
      <label class="form-label">密碼</label>
      <input class="form-control" type="text" v-model="password">
      <button class="btn btn-primary mt-4" @click="login()">登入</button>
    </div>
  </div>
</template>

<script setup>
/*
  charlies_M
  lucas_A
  charlies_A
  charlies_N
  lucas_M
  _M 早班
  _N 晚班 
  _A 午班
*/

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import cookies from 'js-cookie'

const router = useRouter()
const popMsg = inject('popMsg')

const account = ref('')
const password = ref('')

const VITE_API_DOMAIN = import.meta.env.VITE_API_DOMAIN;


async function login() {
  //router.push({ name: 'AppHome' })
  //return ;
  const path = VITE_API_DOMAIN + api.app.login;
  const param = {
    userName: account.value,
    password: password.value
  };
  const result = await ajax.post(path, param);
  if (ajax.checkErrorCode(result.errorCode)) {
    // 將 token 寫到 ajax 的 header 的部分
    ajax.setAuthorization(result.data.accessToken)
    cookies.set('taiwantokanLoginInfo', JSON.stringify(result.data))
    router.push({ name: 'AppHome' })
  } else {
    popMsg('登入失敗'+result.errorCode)
  }
}

</script>
