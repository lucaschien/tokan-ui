<template>
  <div class="AdminReplacementProductFormDetail">
    <RouterLink class="active"
      :to="{ name: 'AdminReplacementProductForm' }">回列表</RouterLink>
    <div>
      AdminReplacementProductFormDetail...
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isCreate = !route.query.id;

console.log('isCreate >>> ', isCreate)

</script>