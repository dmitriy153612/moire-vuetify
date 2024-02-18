<template>
  <ul class="catalog-list">
    <li class="catalog-list__item" v-for="(product, index) in catalog" :key="index">
      <catalog-card :catalog-product="product" v-if="catalog.length" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import CatalogCard from '@/components/CatalogCard.vue'
import { type CatalogProduct } from '@/models/Catalog'

defineProps({
  catalog: { type: Object as () => CatalogProduct[], required: true }
})
</script>

<style lang="scss" scoped>
.catalog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  column-gap: 20px;
  row-gap: 30px;
}
</style>
