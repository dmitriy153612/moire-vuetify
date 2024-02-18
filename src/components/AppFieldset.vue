<template>
  <fieldset class="pt-1">
    <legend>{{ legend }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script setup lang="ts">
defineProps({
  legend: { type: String, required: true }
})
</script>

<style scoped>
legend {
  font-size: 18px;
}
</style>
