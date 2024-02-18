<template>
  <v-navigation-drawer tag="aside" v-model="filterStore.updatedIsFilterOpen" mobile-breakpoint="md">
    <catalog-filter
      :categories="filterStore.categories"
      :colors="filterStore.colors"
      :seasons="filterStore.seasons"
      :materials="filterStore.materials"
      :selectedFilter="filterParams"
      :max-avaliable-price="MAX_AVALIABLE_PRICE"
      v-if="!filterStore.isFilterLoading"
    />
  </v-navigation-drawer>
  <app-section class="catalog-section pl-md-10 pt-6 pb-4">
    <app-title class="pb-4" title="Каталог" descr1="Товаров найдено: " :descr2="productAmount" />
    <catalog-filter-chips
      :selectedFilter="filterParams"
      :max-avaliable-price="MAX_AVALIABLE_PRICE"
    />
    <catalog-list :catalog="catalog" />
    <v-spacer></v-spacer>
    <catalog-pagination :pages="pages" v-if="pages" />
    <!-- <app-preloader type="screen" :show="catalogStore.isCatalogLoading"/> -->
  </app-section>
</template>

<script lang="ts" setup>
import AppTitle from '@/components/AppTitle.vue'
import CatalogFilter from '@/components/CatalogFilter.vue'
import AppSection from '@/components/AppSection.vue'
// import AppPreloader from '@/components/AppPreloader.vue'
import CatalogList from '@/components/CatalogList.vue'
import CatalogFilterChips from '@/components/CatalogFilterChips.vue'
import CatalogPagination from '@/components/CatalogPagination.vue'
import { MAX_AVALIABLE_PRICE } from '@/variables'
import { useFilterStore } from '@/stores/filterStore'
import { useCatalogStore } from '@/stores/catalogStore'
import { useFilterQueryParams } from '@/composable/useFilterQueryParams'
import { formatValueToNumber } from '@/helpers/formatValueToNumber'
import { computed, watch, type Ref } from 'vue'
import { type Filter } from '@/models/Filter'
import { type CatalogProduct } from '@/models/Catalog'
import { useRoute } from 'vue-router'

const filterStore = useFilterStore()
const catalogStore = useCatalogStore()
const route = useRoute()

filterStore.fetchFilter()

const getFilterParams = useFilterQueryParams()
const filterParams: Ref<Filter> = getFilterParams(route.query)

const pages = computed<number>(() => catalogStore.pagination.pages)
const productAmount = computed<number>(() => catalogStore.pagination.total)
const catalog = computed<CatalogProduct[]>(() => catalogStore.catalog)

watch(
  () => route.query,
  (newValue) => {
    filterParams.value = getFilterParams(newValue).value
    const page = formatValueToNumber(newValue?.page) || 1
    catalogStore.fetchCatalog({ ...filterParams.value, page })
  },
  { immediate: true }
)
</script>

<style scoped>
.catalog-section {
  display: flex;
  flex-direction: column;
}
</style>
