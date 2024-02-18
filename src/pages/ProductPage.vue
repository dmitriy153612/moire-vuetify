<template>
  <app-section class="pt-10 product-section" v-if="product && !productStore.isProductLoading">
    <!-- <app-breadcrumbs :items="breadcrumbs" /> -->
    <product-gallery
      class="product-section__gallery"
      :color-options="colorOptions"
      v-model:selected-color-id="selectedColorId"
    />
    <product-form
      class="product-section__form"
      :color-list="colorOptions"
      :size-list="sizes"
      :price="price"
      :product-id="productId"
      :title="title"
      v-model:selected-color-id="selectedColorId"
      v-model:selected-size-id="selectedSizeId"
      v-model:amount="amount"
      v-if="selectedColorId && selectedSizeId && price"
      @basket="addToBasket"
    />

    <product-info class="product-section__info" :materials="materials" />
  </app-section>
</template>

<script setup lang="ts">
import AppSection from '@/components/AppSection.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import ProductForm from '@/components/ProductForm.vue'
import ProductInfo from '@/components/ProductInfo.vue'
import { useRoute, useRouter } from 'vue-router'
import { useBasketStore } from '@/stores/basketStore'
import { formatValueToNumber } from '@/helpers/formatValueToNumber'
import { useProductStore } from '@/stores/productStore'
import { computed, ref, watch, watchEffect } from 'vue'
import { type Breadcrumbs } from '@/models/Common'
import { type FilterCategory, type FilterCheckbox } from '@/models/Filter'
import { type ProductColorOption } from '@/models/Catalog'
import { type Product } from '@/models/Product'

const productStore = useProductStore()
const basketStore = useBasketStore()
const route = useRoute()
const router = useRouter()

const productId = computed<number>(() => formatValueToNumber(route.query.id))
const selectedColorId = ref<number>(0)
const selectedSizeId = ref<number>(0)
const amount = ref<number>(1)
const product = computed<Product | null>(() => productStore.product)
const sizes = computed<FilterCategory[]>(() => (product.value ? product.value.sizes : []))
const materials = computed<FilterCheckbox[]>(() => (product.value ? product.value.materials : []))
const price = computed<number>(() => (product.value ? product.value.price : 0))
const colorOptions = computed<ProductColorOption[]>(() => {
  const colorsList: ProductColorOption[] = []
  if (!product.value) {
    return []
  }
  product.value.colors.forEach((item) => {
    const colorObj: ProductColorOption = {
      id: item.color.id,
      code: item.color.code,
      title: item.color.title,
      imgUrl: ''
    }
    if (item.gallery && item.gallery[0].file.url) {
      colorObj.imgUrl = item.gallery[0].file.url
    } else {
      colorObj.imgUrl = '/src/assets/unnamed.webp'
    }
    colorsList.push(colorObj)
  })
  return colorsList
})
const categoryTitle = computed<string>(() => product.value?.category.title || '')
const categoryId = computed<string>(() => (product.value?.category.id || 0).toString())
const title = computed<string>(() => product.value?.title || '')

const breadcrumbs = computed<Breadcrumbs[]>(() => [
  {
    title: 'Каталог',
    disabled: false,
    to: { name: 'catalog' }
  },
  {
    title: categoryTitle.value,
    disabled: false,
    to: {
      name: 'catalog',
      query: {
        categoryId: categoryId.value,
        page: '1'
      }
    }
  },
  {
    title: title.value,
    disabled: true,
    to: { name: 'product' }
  }
])

loadProduct()

watch(
  [() => selectedColorId.value, () => selectedSizeId.value],
  ([newColorId, newSizeId]) => {
    setcolorAndSizeToRoute(newColorId, newSizeId)
  },
);

function setcolorAndSizeToRoute(newColorId: number, newSizeId: number) {
  router.replace({
    query: {
      ...route.query,
      colorId: newColorId.toString(),
      sizeId: newSizeId.toString()
    }
  })
}

async function loadProduct() {
  if (typeof route.query.id === 'string') {
  await productStore.fetchProduct(route.query.id)
  setFirstAvaliableSizeId(sizes.value)
setFirstAvaliableColorId(colorOptions.value)
}
}

function setFirstAvaliableSizeId(sizes: FilterCategory[]) {
  if (!selectedSizeId.value && sizes.length) {
    selectedSizeId.value = sizes[0].id
    console.log(sizes[0])
  }
  
}
function setFirstAvaliableColorId(colors: ProductColorOption[]) {
  if (!selectedColorId.value && colors.length) {
    selectedColorId.value = colors[0].id
  }
}
function addToBasket() {
  const product = {
    productId: productId.value.toString(),
    colorId: selectedColorId.value.toString(),
    sizeId: selectedSizeId.value.toString(),
    quantity: amount.value.toString()
  }
  basketStore.fetchAddToBasket(product)
}
</script>

<style lang="scss" scoped>
.product-section {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  &__gallery {
    grid-column: 1;
    grid-row: 1 / 3;
  }
  &__form {
    grid-column: 2;
    grid-row: 1;
    align-self: flex-start;
  }
  &__info {
    grid-column: 2;
    grid-row: 2;
  }
}

@media (max-width: 960px) {
  .product-section {
    &__info {
      grid-column: 1 / 3;
      grid-row: 3;
    }
  }
}
@media (max-width: 600px) {
  .product-section {
    grid-template-columns: 1fr;
    &__gallery {
      grid-column: 1;
      grid-row: 1;
    }
    &__form {
      grid-column: 1;
      grid-row: 2;
      align-self: flex-start;
    }
    &__info {
      grid-column: 1;
      grid-row: 3;
    }
  }
}
</style>
