<template>
  <div class="title-row d-flex align-end ga-4">
    <h1 class="text-h4">{{ title }}</h1>
    <span v-if="descr1 || descr2">
      <span style="color: #757575">{{ descr1 }}</span>
      <span style="color: #757575">{{ descr2 }}</span>
    </span>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: { type: String, required: true },
  descr1: [String, Number],
  descr2: [String, Number]
})
</script>
