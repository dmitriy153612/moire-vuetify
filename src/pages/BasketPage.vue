<template>
  <app-section>
    <app-breadcrumbs :items="items" />
    <app-title title="Корзина" descr1="Товаров: " :descr2="totalAmount" />
    <basket-list :basket-list="basket" v-if="basket.length"/>
  </app-section>
</template>

<script setup lang="ts">
import AppSection from '@/components/AppSection.vue'
import AppTitle from '@/components/AppTitle.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import BasketList from '@/components/BasketList.vue'
import { type Breadcrumbs } from '@/models/Common'
import { useRoute, useRouter } from 'vue-router'
import { useBasketStore } from '@/stores/basketStore'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const basketStore = useBasketStore()

const basket = computed(() => basketStore.basket)
const totalAmount = computed(() => basketStore.basketAmount)
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
