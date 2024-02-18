<template>
  <app-fieldset legend="Цвет">
    <app-color-picker
      type="checkbox"
      name="filter-colors"
      :color-list="items"
      v-model="updatedModelValue"
    />
  </app-fieldset>
</template>

<script setup lang="ts">
import AppFieldset from '@/components/AppFieldset.vue'
import AppColorPicker from '@/components/AppColorPicker.vue'
import { type FilterCheckbox } from '@/models/Filter'

defineProps({
  modelValue: { type: Array as () => number[], required: true },
  items: { type: Array as () => FilterCheckbox[], required: true }
})

const updatedModelValue = defineModel<number[]>('modelValue')
</script>

@/models/filter
