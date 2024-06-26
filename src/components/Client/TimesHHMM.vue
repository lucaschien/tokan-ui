<template>
  <input class="TimesHHMM form-control" type="text" maxlength="5" 
    v-model.trim="timeValue"
    :placeholder="placeholder" 
    @change="change()">
</template>

<script setup>
import { ref, onMounted, defineEmits, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const placeholder = ref('範例:00:00');
const timeValue = ref('');
const errorTimer = ref(null);

const emits = defineEmits(['update:modelValue']);

function change() {
  // 如果為全數字且為四碼
  if (!isNaN(timeValue.value) && timeValue.value.length === 4) {
    const { HH, MM } = { ...checkHHMM(timeValue.value.slice(0,2), timeValue.value.slice(2,4)) };
    // 加上 : 後回傳給父層
    timeValue.value = HH + ':' + MM;
    emits('update:modelValue', timeValue.value);
    return
  }
  // 如果為長度5且 ':' 在正確位置
  if (timeValue.value.length === 5 && timeValue.value.indexOf(':') === 2) {
    let tempHH = parseInt(timeValue.value.slice(0,2), 10);
    let tempMM = parseInt(timeValue.value.slice(3,5), 10);
    if (isNaN(tempHH) || isNaN(tempMM)) {
      triggerError();
      return 
    }
    // 補0
    tempHH = (tempHH <= 9) ? '0' + tempHH : tempHH;
    tempMM = (tempMM <= 9) ? '0' + tempMM : tempMM;
    let { HH, MM } = { ...checkHHMM(tempHH, tempMM) };
    // 加上 : 後回傳給父層
    timeValue.value = HH + ':' + MM;
    emits('update:modelValue', timeValue.value);
    return
  }

  // 不符合規則強制清空
  triggerError();
}

// 轉換小時與分鐘
function checkHHMM(_HH, _MM) {
  let HH = (_HH >= 24) ? 23 : _HH;
  let MM = (_MM >= 60) ? 59 : _MM;
  // if (HH === 23) {
  //   MM = 23;
  // }
  console.log('chenck...', MM)
  return { HH, MM }
}

// 輸入格式錯誤
function triggerError() {
  placeholder.value = '格式錯誤';
  timeValue.value = '';
  emits('update:modelValue', timeValue.value);
  errorTimer.value = setTimeout(() => {
    placeholder.value = '範例:00:00';
  }, 2000);
}

watch(() => props.modelValue, (newValue) => {
  timeValue.value = newValue;
});

onMounted(() => {
  timeValue.value = props.modelValue;
})
</script>