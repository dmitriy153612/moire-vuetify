<template>
  <app-section>
    <app-title title="Корзина" descr1="Товаров:" />
    <app-breadcrumbs :items="items" />
  </app-section>
</template>

<script setup lang="ts">
import AppSection from '@/components/AppSection.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import { type Breadcrumbs } from '@/models/Common'

const items: Breadcrumbs[] = [
  {
    title: 'Каталог',
    disabled: false,
    to: { name: 'catalog' }
  },
  {
    title: 'Корзина',
    disabled: true,
    to: { name: 'basket' }
  }
]
</script>

<style scoped></style>
