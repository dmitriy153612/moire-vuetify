<template>
  <app-fieldset legend="Цена" class="filter-price d-flex flex-column gr-2">
    <div class="d-flex flex-no-wrap gc-4">
      <v-text-field
        class="price"
        v-model.number="priceRange[0]"
        hide-details="auto"
        single-line
        type="number"
        color="var(--red-lighten-2)"
        density="compact"
        hide-spin-buttons
        bg-color="var(--red-lighten-5)"
        :aria-label="`цена от ${priceRange[0]}`"
      >
        <v-label for="input-7">От</v-label>
      </v-text-field>
      <v-text-field
        class="price"
        v-model.number="priceRange[1]"
        hide-details
        single-line
        type="number"
        color="var(--red-lighten-2)"
        density="compact"
        hide-spin-buttons
        bg-color="var(--red-lighten-5)"
        :aria-label="`цена до ${priceRange[1]}`"
      >
        <v-label for="input-9">До</v-label>
      </v-text-field>
    </div>
    <v-range-slider
      v-model="priceRange"
      :max="maxAvaliablePrice"
      :min="0"
      :step="1"
      hide-details
      strict
      class="align-center"
    />
  </app-fieldset>
</template>

<script setup lang="ts">
import AppFieldset from '@/components/AppFieldset.vue'
import { type Ref, ref, onMounted, watchEffect } from 'vue'

const emit = defineEmits(['priceRange'])

const props = defineProps({
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  maxAvaliablePrice: { type: Number, required: true }
})

const priceRange = ref<[number, number]>([props.minPrice, props.maxPrice])

watchEffect(() => {
  emit('priceRange', priceRange.value)
})

watchEffect(() => {
  priceRange.value[0] = props.minPrice
  priceRange.value[1] = props.maxPrice
})

function stopSliderIntersection(range: Ref<[number, number]>) {
  if (range.value[0] > range.value[1]) {
    range.value[0] = range.value[1]
  } else if (range.value[1] < range.value[0]) {
    range.value[1] = range.value[0]
  }
}

function setAriaLabelForRangeFieldset() {
  const catalogFilter: HTMLElement | null = document.querySelector('.filter-price')
  if (catalogFilter) {
    const vRangeSliderButns: NodeListOf<Element> | null = catalogFilter.querySelectorAll(
      '.v-slider-thumb.v-locale--is-ltr'
    )
    if (vRangeSliderButns && vRangeSliderButns[0] && vRangeSliderButns[1]) {
      vRangeSliderButns[0].setAttribute('aria-label', 'выбрать минимальную цену')
      vRangeSliderButns[1].setAttribute('aria-label', 'выбрать максимальную цену')
    }
  }
}

onMounted(() => {
  setAriaLabelForRangeFieldset()
})
watchEffect(() => {
  stopSliderIntersection(priceRange)
})
</script>

<style scoped lang="scss">
.v-text-field :deep(input) {
  padding-top: 16px;
}
.v-label {
  position: absolute;
  top: 4px;
  font-size: 12px;
  font-weight: 400;
  color: black;
}

.v-input {
  position: relative;
}

.price.v-input::before {
  position: absolute;
  content: '₽';
  right: 4px;
  top: 24px;
}
</style>
