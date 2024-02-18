<template>
  <v-form class="d-flex flex-column gr-4 pa-4 pt-10">
    <catalog-filter-price
      :max-avaliable-price="maxAvaliablePrice"
      :min-price="filter.minPrice"
      :max-price="filter.maxPrice"
      @price-range="setPriceRangeToFilter"
    />
    <catalog-filter-category :items="categories" v-model="filter.categoryId" v-if="categories" />
    <catalog-color-picker
      :items="colors"
      v-model="filter.colorIds"
      v-if="colors"
      name="filter-color-picker"
    />
    <catalog-filter-checkboxes
      legend="Сезон"
      :items="seasons"
      v-model="filter.seasonIds"
      v-if="seasons"
    />
    <catalog-filter-checkboxes
      legend="Материал"
      :items="materials"
      v-model="filter.materialIds"
      v-if="materials"
    />
    <v-btn color="pink" @click="setFilterToRoute">Применить</v-btn>
    <v-btn color="black" density="compact" @click="clearFilterAndFilterQuery">Сбросить</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import CatalogFilterPrice from '@/components/CatalogFilterPrice.vue'
import CatalogFilterCategory from '@/components/CatalogFilterCategory.vue'
import CatalogFilterCheckboxes from '@/components/CatalogFilterCheckboxes.vue'
import CatalogColorPicker from '@/components/CatalogColorPicker.vue'
import { type FilterCategory, type FilterCheckbox, type Filter } from '@/models/Filter'
import { ref } from 'vue'
import { useRouter, useRoute, type LocationQueryRaw } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  categories: { type: Array as () => FilterCategory[], required: true },
  colors: { type: Array as () => FilterCheckbox[], required: true },
  seasons: { type: Array as () => FilterCheckbox[], required: true },
  materials: { type: Array as () => FilterCheckbox[], required: true },
  selectedFilter: { type: Object as () => Filter, required: true },
  maxAvaliablePrice: { type: Number, required: true }
})

const filter = ref<Filter>({ ...props.selectedFilter })

function setFilterToRoute() {
  const query: LocationQueryRaw = { ...route.query, page: 1 }
  for (let key in filter.value) {
    const filterKey = key as keyof Filter
    if (
      filter.value[filterKey] === 0 ||
      (filterKey === 'maxPrice' && filter.value[filterKey] === props.maxAvaliablePrice)
    ) {
      query[filterKey] = undefined
    } else {
      query[filterKey] = filter.value[filterKey]
    }
  }
  router.replace({ query })
}

function clearFilter() {
  filter.value = {
    minPrice: 0,
    maxPrice: props.maxAvaliablePrice,
    categoryId: 0,
    seasonIds: [],
    materialIds: [],
    colorIds: []
  }
}

function clearFilterQuery() {
  const query: LocationQueryRaw = { ...route.query, page: 1 }
  for (let key in filter.value) {
    query[key as keyof Filter] = undefined
  }
  router.replace({ query })
}

function setPriceRangeToFilter([minPrice, maxPrice]: [number, number]) {
  filter.value.minPrice = minPrice
  filter.value.maxPrice = maxPrice
}

function clearFilterAndFilterQuery() {
  clearFilter()
  clearFilterQuery()
}
</script>
@/models/filter
