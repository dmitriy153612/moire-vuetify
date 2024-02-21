<template>
  <form class="product-form" @submit.prevent="emitForm">
    <div class="product-form__block">
      <app-counter v-model="updatedAmount" class="product-form__counter" />
      <strong class="product-form__price">{{ countedPrice }}</strong>
    </div>
    <div class="product-form__block">
      <app-fieldset legend="Цвет" class="product-form__color">
        <v-spacer></v-spacer>
        <app-color-picker
          type="radio"
          :color-list="colorList"
          name="product-form-product-colors"
          v-model="updatedSelectedColorId"
        />
      </app-fieldset>
      <app-fieldset legend="Размер" class="product-form__size">
        <v-select
          v-model="updatedSelectedSizeId"
          :items="sizeList"
          item-title="title"
          item-value="id"
          label="Размер"
          persistent-hint
          single-line
          hide-details
          density="compact"
        />
      </app-fieldset>
    </div>
    <v-btn
      class="product-form__btn"
      prepend-icon="mdi-cart"
      color="pink"
      size="x-large"
      type="submit"
      :loading="isLoadingAddToBascket"
    >
      В корзину
    </v-btn>
  </form>
</template>

<script setup lang="ts">
import AppCounter from '@/components/AppCounter.vue'
import AppFieldset from '@/components/AppFieldset.vue'
import AppColorPicker from '@/components/AppColorPicker.vue'
import { type FilterCheckbox, type FilterCategory } from '@/models/Filter'
import { formatPrice } from '@/helpers/formatPrice'
import { computed } from 'vue'

const props = defineProps({
  productId: { type: Number, required: true },
  colorList: { type: Array as () => FilterCheckbox[], required: true },
  sizeList: { type: Array as () => FilterCategory[], required: true },
  price: { type: Number, required: true },
  selectedColorId: { type: Number, required: true },
  selectedSizeId: { type: Number, required: true },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  isLoadingAddToBascket: { type: Boolean, defoult: false }
})

const emit = defineEmits(['basket'])

const updatedAmount = defineModel<number>('amount')
const countedPrice = computed(() => formatPrice(props.price * props.amount))

const updatedSelectedColorId = defineModel<number>('selectedColorId')
const updatedSelectedSizeId = defineModel<number>('selectedSizeId')

function emitForm() {
  emit('basket')
}
</script>

<style lang="scss" scoped>
.product-form {
  display: grid;
  row-gap: 30px;
  &__block {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
  }
  &__price {
    font-size: 2.1rem;
  }
  &__color {
    min-height: 72px;
  }
  &__btn {
    width: max-content;
  }
}

@media (max-width: 600px) {
  .product-form {
    &__block {
      justify-content: center;
    }
    &__btn {
      justify-self: center;
    }
  }
}
</style>
