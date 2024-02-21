<template>
  <div class="catalog-card">
    <router-link :to="{ name: 'product', query }" class="catalog-card__link">
      <v-fade-transition>
        <img
          v-if="imgUrl"
          :src="imgUrl"
          alt=""
          class="catalog-card__img"
          @load="hideImgPreloader"
        />
      </v-fade-transition>

      <app-preloader :show="isImgLoading" />
      <div class="catalog-card__focus-layout"></div>
    </router-link>

    <div class="catalog-card__content">
      <h2 class="catalog-card__title">{{ catalogProduct.title }}</h2>
      <span class="catalog-card__price">{{ formattedPrice }}</span>
      <app-color-picker
        type="radio"
        :name="`catalog-card-color-${productId}`"
        :colorList="colorOptions"
        v-model="selectedColorId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppColorPicker from '@/components/AppColorPicker.vue'
import AppPreloader from '@/components/AppPreloader.vue'
import { formatPrice } from '@/helpers/formatPrice'
import { getColorOptions } from '@/helpers/getColorOptions'
import { type CatalogProduct, type ProductColorOption } from '@/models/Catalog'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  catalogProduct: { type: Object as () => CatalogProduct, required: true }
})

const productId = computed(() => props.catalogProduct.id)
const formattedPrice = computed(() => {
  return formatPrice(props.catalogProduct.price)
})
const selectedColorId = ref<number>(0)
const isImgLoading = ref<boolean>(true)
const query = computed(() => {
  return { id: productId.value, colorId: selectedColorId.value }
})

const colorOptions = computed(() => getColorOptions(props.catalogProduct.colors))

const imgUrl = computed(() => {
  const optionObj: ProductColorOption | undefined = colorOptions.value.find((item) => {
    return item.id === selectedColorId.value
  })
  return optionObj ? optionObj.imgUrl : ''
})

function hideImgPreloader() {
  isImgLoading.value = false
}

function setFirstAvaliableColor() {
  watch(
    () => colorOptions.value,
    (newValue) => {
      if (newValue.length) {
        selectedColorId.value = newValue[0].id
      }
    },
    { immediate: true }
  )
}

function showImgPreloader() {
  watch(
    () => imgUrl.value,
    () => {
      isImgLoading.value = true
    }
  )
}
setFirstAvaliableColor()
showImgPreloader()
</script>

<style lang="scss" scoped>
.catalog-card {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  &__content {
    display: grid;
    grid-template-rows: 1fr auto auto;
    row-gap: 10px;
    padding: 10px 20px 20px;
    border-top: 1px solid var(--red-lighten-2);
  }
  &__focus-layout {
    position: absolute;
    inset: 0;
    background-color: transparent;
    transition: background-color 0.2s ease;
  }
  &__link {
    display: block;
    position: relative;
    outline: none;
    overflow: hidden;
  }
  &__link:focus &__focus-layout {
    background-color: var(--grey-darken-33);
  }
  &__link:hover &__img {
    transform: scale(1.02);
  }
  &__img {
    display: block;
    aspect-ratio: 270 / 350;
    height: auto;
    width: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }
  &__title {
    font-size: 18px;
    font-weight: 400;
  }
  &__price {
    font-weight: 600;
  }
}
</style>
