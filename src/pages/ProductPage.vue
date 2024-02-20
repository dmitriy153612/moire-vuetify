<template>
  <app-section class="pt-10 product-section" v-if="product && !productStore.isProductLoading">
    <app-breadcrumbs class="product-section__breadcrumbs" :items="breadcrumbs" />
    <product-gallery
      class="product-section__gallery"
      :color-options="colorOptions"
      v-model:selected-color-id="selectedColorId"
    />
    <div class="product-section__title-box">
      <span class="product-form__span">{{ `Артикул: ${productId}` }}</span>
      <app-title :title="title" />
    </div>
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
import AppTitle from '@/components/AppTitle.vue'
import AppSection from '@/components/AppSection.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import ProductForm from '@/components/ProductForm.vue'
import ProductInfo from '@/components/ProductInfo.vue'
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router'
import { useBasketStore } from '@/stores/basketStore'
import { formatValueToNumber } from '@/helpers/formatValueToNumber'
import { useProductStore } from '@/stores/productStore'
import { computed, ref, watch } from 'vue'
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

function setColorAndSizeToRoute(newColorId: number, newSizeId: number) {
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
    setFirstAvaliableSizeId(route.query.sizeId)
    setFirstAvaliableColorId(route.query.colorId)
  }
}

function setFirstAvaliableSizeId(querySizeId: LocationQueryValue | LocationQueryValue[]) {
  const sizeId = querySizeId ? formatValueToNumber(querySizeId) : null
  if (sizeId && checkIsSizeIdExist(sizeId)) {
    selectedSizeId.value = sizeId
  } else {
    selectedSizeId.value = sizes.value[0].id
  }
}
function setFirstAvaliableColorId(queryColorId: LocationQueryValue | LocationQueryValue[]) {
  const colorId = queryColorId ? formatValueToNumber(queryColorId) : null
  if (colorId && checkIsColorIdExist(colorId)) {
    selectedColorId.value = colorId
  } else {
    selectedColorId.value = colorOptions.value[0].id
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

function checkIsColorIdExist(colorId: number): boolean {
  return colorOptions.value.some((item) => item.id === colorId)
}
function checkIsSizeIdExist(sizeId: number): boolean {
  return sizes.value.some((item) => item.id === sizeId)
}

loadProduct()

watch([() => selectedColorId.value, () => selectedSizeId.value], ([newColorId, newSizeId]) => {
  setColorAndSizeToRoute(newColorId, newSizeId)
})

watch(
  [() => route.query.colorId, () => route.query.sizeId],
  ([newQueryColorId, newQuerySizeId]) => {
    setFirstAvaliableSizeId(newQuerySizeId)
    setFirstAvaliableColorId(newQueryColorId)
  }
)
</script>

<style lang="scss" scoped>
.product-section {
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'breadcrumbs breadcrumbs'
    'gallery title-box'
    'gallery form'
    'gallery info';
  row-gap: 20px;
  column-gap: 40px;
  &__title-box {
    grid-area: title-box;
  }
  &__breadcrumbs {
    grid-area: breadcrumbs;
  }
  &__gallery {
    grid-area: gallery;
  }
  &__form {
    grid-area: form;
    align-self: flex-start;
  }
  &__info {
    grid-area: info;
  }
}

@media (max-width: 960px) {
  .product-section {
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      'breadcrumbs breadcrumbs'
      'gallery title-box'
      'gallery form'
      'info info';
    column-gap: 20px;
  }
}
@media (max-width: 600px) {
  .product-section {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    grid-template-areas:
      'breadcrumbs'
      'title-box'
      'gallery'
      'form'
      'info';
    column-gap: 20px;
  }
}
</style>
