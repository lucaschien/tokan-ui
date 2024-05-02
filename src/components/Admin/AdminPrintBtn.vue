<template>
  <button class="btn btn-outline-secondary ms-2 AdminPrintBtn" 
    @click="printFn()">
    <i class="fa fa-print" aria-hidden="true"></i>
  </button>
</template>

<script setup>
function printFn() {
  print()
}
</script>