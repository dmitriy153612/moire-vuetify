<template>
  <div class="counter">
    <v-btn
      icon="mdi-minus"
      size="small"
      aria-label="уменьшить количество товара"
      color="pink"
      class="counter__btn"
      @click="decrement"
    />
    <v-text-field
      class="counter__input"
      aria-label="количество товара"
      variant="underlined"
      active
      density="compact"
      type="number"
      hide-spin-buttons
      hide-details
      style="width: 54px"
      single-line
      v-model="updatedModelValue"
    />
    <v-btn
      icon="mdi-plus"
      size="small"
      aria-label="увелиить количество товара"
      color="pink"
      class="counter__btn"
      @click="incrememt"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 }
})

const emit = defineEmits(['update:modelValue'])

const updatedModelValue = ref<number>(props.modelValue)

function incrememt() {
  updatedModelValue.value++
}
function decrement() {
  if (updatedModelValue.value <= 1) {
    return
  }
  updatedModelValue.value--
}

watch(
  () => updatedModelValue.value,
  (newValue) => {
    if (newValue < 1) {
      updatedModelValue.value = 1
    }
    emit('update:modelValue', updatedModelValue.value)
  }
)
</script>

<style lang="scss" scoped>
.counter {
  &__btn:hover {
    @media (min-width: 961px) {
      background-color: black !important;
    }
  }
}
.counter {
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: 10px;
  justify-content: flex-start;
  & :deep(.v-field__input) {
    padding: 0;
    font-size: 1.8em;
  }
  &__input :deep(input) {
    text-align: center;
  }
}
</style>
