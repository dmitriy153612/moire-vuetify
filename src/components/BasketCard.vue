<template>
  <div class="basket-card">
    <!-- {{ card }} -->
    <h2>{{ title }}</h2>
    <router-link to="/">
      <img :src="colorOption.imgUrl" :alt="title" />
    </router-link>
    <div class="basket-cart__option">
      <span class="basket-cart__option-name">
        <strong>Размер:</strong>
      </span>
      <span class="basket-cart__option-value">{{ size }}</span>
    </div>
    <div class="basket-cart__option">
      <span class="basket-cart__option-name">
        <strong>Цвет:</strong>
      </span>
      <span class="basket-cart__option-value">
        <span class="basket-cart__color-indicator"></span>
        {{ colorOption.title }}
      </span>
    </div>
    <div class="basket-cart__id">Артикул: {{ productId }}</div>
    <app-counter v-model="updatedAmount" />
  </div>
</template>

<script setup lang="ts">
import { type BasketItem } from '@/models/Basket'
import { type ProductColorOption } from '@/models/Catalog'
// import { debounce } from '@/helpers/debounce'
import { computed, ref } from 'vue'
import { getColorOptions } from '@/helpers/getColorOptions'
import AppCounter from '@/components/AppCounter.vue'
import { useBasketStore } from '@/stores/basketStore'

const props = defineProps({
  card: { type: Object as () => BasketItem, required: true }
})

const basketStore = useBasketStore()

const colorOption = computed<ProductColorOption>(() => {
  const options: ProductColorOption[] = getColorOptions([props.card.color])
  return options[0]
})
const title = computed<string>(() => props.card.product.title)
const size = computed<string>(() => props.card.size.title)
const productId = computed<number>(() => props.card.product.id)
const basketCardId = computed<string>(() => props.card.id.toString())
const updatedAmount = computed<number>({
  get: () => props.card.quantity,
  set: (newValue) => changeCardAmount(newValue.toString())
})
const isChangeAmountLoading = ref<boolean>(false)

async function changeCardAmount(newAmount: string) {
  try {
    isChangeAmountLoading.value = true
    await basketStore.fetchChangeItemAmount(basketCardId.value, newAmount)
  } catch (err) {
    console.error(err)
  } finally {
    isChangeAmountLoading.value = false
  }
}
</script>

<style scoped></style>
