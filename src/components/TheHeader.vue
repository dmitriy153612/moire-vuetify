<template>
  <v-app-bar style="position: fixed" color="white">
    <v-toolbar class="main-container pl-4 pr-4" color="white">
      <v-btn
        icon
        aria-label="показать фильтр товаров"
        class="hidden-md-and-up"
        @click="openCatalogFilter"
        v-if="isFilterBtnVisible"
      >
        <v-icon size="x-large" color="pink"> mdi-filter </v-icon>
      </v-btn>

      <v-spacer class="hidden-md-and-up" />

      <router-link class="d-flex flex-grow-100" :to="{ name: 'catalog' }">
        <img src="@/assets/logo.svg" alt="Логотип" />
      </router-link>

      <v-spacer />

      <v-toolbar-items>
        <v-btn href="tel: +79999999999" class="hidden-sm-and-down">
          <template #prepend>
            <v-icon color="pink">mdi-phone</v-icon>
          </template>
          +7 999 999 99 99
        </v-btn>
        <v-btn href="tel: +79999999999" class="hidden-md-and-up" icon>
          <v-icon size="x-large" color="pink">mdi-phone</v-icon>
        </v-btn>

        <v-btn :to="{ name: 'basket' }" icon aria-label="Перейти в корзину" color="pink">
          <v-badge
            offset-x="4"
            offset-y="2"
            :content="basketAmount"
            :label="`товаров в корзине ${basketAmount}`"
          >
            <v-icon size="x-large">mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filterStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps({
  basketAmount: { type: Number, required: true }
})

const route = useRoute()
const filterStore = useFilterStore()

function openCatalogFilter() {
  filterStore.updatedIsFilterOpen = !filterStore.updatedIsFilterOpen
  if (filterStore.updatedIsFilterOpen) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }
}
const isFilterBtnVisible = computed<boolean>(() => (route.name === 'catalog' ? true : false))
</script>

<style lang="scss" scoped>
.v-btn :deep(.v-btn__overlay) {
  transition: all 0.2s ease;
}

.v-btn :deep(.v-badge__badge) {
  padding-right: 4px;
  padding-left: 4px;
  height: 1rem;
  font-size: 0.6rem;
}
</style>
