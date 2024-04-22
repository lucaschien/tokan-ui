<template>
  <div class="Home">
    <p class="mt-4">button</p>
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <button type="button" class="btn btn-link">Link</button>

    <p class="mt-4">Tooltip</p>
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="哈哈哈"
    >
      Tooltip on top
    </button>
    <span data-bs-toggle="tooltip" title="嘿嘿嘿" class="">abc</span>

    <p class="mt-4">環境變數</p>
    <div>{{ VITE_BACKEND_HOST }}</div>

    <p class="mt-4">font-awesome-4.7.0</p>
    <div class="h2">
      <i class="fa fa-address-book" aria-hidden="true"></i>
      <i class="fa fa-check-square" aria-hidden="true"></i>
      <i class="fa fa-check-circle" aria-hidden="true"></i>
    </div>

    <p class="mt-4">html5-qrcode </p>
    <div>
      <input v-model="searchValue">
      <button class="btn btn-primary" 
        @click="scanBarcode()">開始掃描</button>
      <button class="btn btn-primary" 
        @click="handleStop()">停止掃描</button>
      <!-- barcode 相機初始化 -->
      <div id="barcode-reader"></div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { useHtml5QrCode } from '@/hooks/html5-qr-code'

const VITE_BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST


let html5QrCode
const searchValue = ref('');
// 開始掃描
const scanBarcode = () => {
  html5QrCode.start(qrCodeSuccessCallback)
}
// 停止相機
const handleStop = () => {
  html5QrCode.handleStop()
}
// 掃描成功後的回呼函式
const qrCodeSuccessCallback = (decodedText) => {
  // 傳入 searchProductName 去做後續處理
  searchValue.value = decodedText
    // 停止相機
  handleStop()
}

onMounted(() => {
  let tooltipelements = document.querySelectorAll("[data-bs-toggle='tooltip']")
  tooltipelements.forEach((el) => {
    new Tooltip(el)
  })

  html5QrCode = useHtml5QrCode('barcode-reader')
  console.log('html5QrCode >>> ', html5QrCode)
})
</script>
