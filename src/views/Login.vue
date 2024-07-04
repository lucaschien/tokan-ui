<template>
  <div class="Login">
    <div>
      <div class="logo-box">
        <img class="logo" src="/img/logo.svg" alt="logo"/>
        <img class="company-name" src="/img/company_name.png" alt="company name"/>
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
/* 角色:
  BOSS("老闆"),
  PACKAGING_WORKER("包裝作業員"),
  CUTTING_WORKER("裁切作業員"),
  MOLDING_WORKER("成型作業員"),
  ASSISTANT("助理"),
  ACCOUNTANT("會計"),
  TEAM_LEADER("組長"),
  MAINTENANCE("保修"),
  QUALITY_MANAGER("品管"),
  QUALITY_INSPECTOR("品檢"),
  DEPUTY_FACTORY_MANAGER("副廠長"),
  FACTORY_MANAGER("廠長");
*/

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { ajax } from '@/common/ajax'
import { api } from '@/common/api'
import cookies from 'js-cookie'
import { useRootStore } from '@/stores/root'

const router = useRouter()
const rootStore = useRootStore()
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

    // 登入者資訊
    await rootStore.getLoginUserInfoData(() => {
      console.log('rootStore.loginUserInfo >>> ', rootStore.loginUserInfo);

      // 成型作業員
      if (rootStore.loginUserInfo.roleCode === 'MOLDING_WORKER') {
        router.push({ name: 'FormingMachine' }) // 直接進入"選擇成型機機號"頁
        return 
      }

      router.push({ name: 'AppHome' })
    }) 

    
  } else {
    popMsg('登入失敗'+result.errorCode)
  }
}

</script>
