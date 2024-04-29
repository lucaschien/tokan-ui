<template>
  <div class="InputScanBarcode">
    <input type="text" class="form-control me-2" v-model="barcodeValue">
    <button class="btn btn-primary" 
      @click="startScan()">
      <i class="fa fa-barcode" aria-hidden="true"></i>
    </button>
    <!-- barcode 相機初始化位置 -->
    <div class="barcode-reader-box" v-if="openScanView">
      <div id="barcode-reader"></div>
      <button class="btn btn-primary mt-4 w-100" 
        @click="stopScan()">停止掃描</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useHtml5QrCode } from '@/hooks/html5-qr-code'

const { scanCallback } = defineProps({
  scanCallback: {
    type: Function,
    default: () => {}
  }
})

let html5QrCode
const barcodeValue = ref('')
const openScanView = ref(false)
// 開始掃描
const startScan = () => {
  openScanView.value = true
  nextTick(() => {
    html5QrCode = useHtml5QrCode('barcode-reader')
    html5QrCode.start(successCallback)
  })
}
// 停止相機
const stopScan = () => {
  openScanView.value = false
  html5QrCode.handleStop()
}
// 掃描成功後的回呼函式
const successCallback = (decodedText) => {
  barcodeValue.value = decodedText
  scanCallback(decodedText)
  stopScan() // 停止相機
}

</script>