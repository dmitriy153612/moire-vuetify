<template>
  <ul class="chip-list" :class="{ 'pb-4': selectedFilterNames.length }">
    <li class="chip-list__item" v-for="(item, index) in selectedFilterNames" :key="index">
      <v-chip variant="elevated" density="compact"> {{ item.name }} </v-chip>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type FilterCategory, type FilterCheckbox, type Filter } from '@/models/Filter'
import { useFilterStore } from '@/stores/filterStore'
import { watchEffect } from 'vue'
import { ref } from 'vue'

const filterStore = useFilterStore()

const props = defineProps({
  selectedFilter: { type: Object as () => Filter, required: true },
  maxAvaliablePrice: { type: Number, required: true }
})

const selectedFilterNames = ref<SelectedFilterNames[]>([])

interface SelectedFilterNames {
  name: string
  type: string
  id?: number
}

function getNamesOfSelectedFilterValues(
  selectedFilter: Filter,
  seasons: FilterCheckbox[],
  materials: FilterCheckbox[],
  colors: FilterCheckbox[],
  categories: FilterCategory[]
): SelectedFilterNames[] {
  const filterEntries = Object.entries(selectedFilter)

  const selectedNames: SelectedFilterNames[] = []

  filterEntries.forEach(([key, value]) => {
    if (key === 'seasonIds' && seasons.length) {
      seasons?.forEach((item) => {
        if (value.includes(item.id)) {
          selectedNames.push({ name: item.title, type: 'seasonIds', id: item.id })
        }
      })
    } else if (key === 'materialIds') {
      materials?.forEach((item) => {
        if (value.includes(item.id)) {
          selectedNames.push({ name: item.title, type: 'materialIds', id: item.id })
        }
      })
    } else if (key === 'colorIds') {
      colors?.forEach((item) => {
        if (value.includes(item.id)) {
          selectedNames.push({ name: item.title, type: 'colorIds', id: item.id })
        }
      })
    } else if (key === 'categoryId') {
      categories?.forEach((item) => {
        if (value === item.id) {
          selectedNames.push({ name: item.title, type: 'categoryId', id: item.id })
        }
      })
    } else if (key === 'minPrice' && value !== 0) {
      selectedNames.push({ name: `От ${value.toString()}₽`, type: 'minPrice' })
    } else if (key === 'maxPrice' && value !== 0 && value !== props.maxAvaliablePrice) {
      selectedNames.push({ name: `До ${value.toString()}₽`, type: 'maxPrice' })
    }
  })
  return selectedNames
}

watchEffect(() => {
  selectedFilterNames.value = getNamesOfSelectedFilterValues(
    props.selectedFilter,
    filterStore.seasons,
    filterStore.materials,
    filterStore.colors,
    filterStore.categories
  )
})
</script>

<style lang="scss" scoped>
.chip-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: 6px;
}
</style>
@/models/filter
