<template>
  <app-fieldset :legend="legend">
    <ul>
      <li v-for="item in items" :key="item.id">
        <v-checkbox
          v-model="updatedModelValue"
          :label="item.title"
          :value="item.id"
          density="compact"
          hide-details
        />
      </li>
    </ul>
  </app-fieldset>
</template>

<script setup lang="ts">
import { defineModel } from 'vue'
import AppFieldset from '@/components/AppFieldset.vue'
import { type FilterCheckbox } from '@/models/Filter'

defineProps({
  modelValue: { type: Array as () => number[], required: true },
  legend: { type: String, required: true },
  items: { type: Array as () => FilterCheckbox[], required: true }
})

const updatedModelValue = defineModel<number[]>('modelValue')
</script>

<style scoped>
.v-input :deep(.v-selection-control) {
  min-height: auto;
  height: 30px;
}
</style>
@/models/filter
