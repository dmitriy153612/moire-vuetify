<template>
  <ul class="basket-list">
    <li class="basket-list__item" v-for="(card, index) in basketList" :key="index">
      <basket-card :card="card"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BasketCard from '@/components/BasketCard.vue'
import { type BasketItem } from '@/models/Basket';

defineProps({
  basketList: { type: Array as () => BasketItem[], required: true },
})

</script>

<style scoped>

</style>