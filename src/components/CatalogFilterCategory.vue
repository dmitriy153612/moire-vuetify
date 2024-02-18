<template>
  <app-fieldset legend="Категория">
    <v-select
      v-model="updatedModelValue"
      :items="allItems"
      item-title="title"
      item-value="id"
      label="Категории"
      single-line
      density="comfortable"
      hide-details
    />
  </app-fieldset>
</template>

<script setup lang="ts">
import AppFieldset from '@/components/AppFieldset.vue'
import { computed, defineModel } from 'vue'
import { type FilterCategory } from '@/models/Filter'

const props = defineProps({
  modelValue: { type: Number, required: true },
  items: { type: Array as () => FilterCategory[], required: true }
})

const updatedModelValue = defineModel<number>('modelValue')

const standartItem: FilterCategory = { title: 'Все категории', id: 0 }
const allItems = computed<FilterCategory[]>(() => [standartItem, ...props.items])
</script>
@/models/filter
