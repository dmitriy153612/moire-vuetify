<template>
  <!-- <v-app class="max-width" style="max-width: 1440px; margin: 0 auto"> -->
  <v-app class="main-container">
    <v-layout class="rounded rounded-md">
      <the-header :basket-amount="basketStore.basketAmount" />

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
    <the-footer />
  </v-app>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useBasketStore } from '@/stores/basketStore'

const basketStore = useBasketStore()

basketStore.fetchGetBasket()
</script>

<style scoped></style>
