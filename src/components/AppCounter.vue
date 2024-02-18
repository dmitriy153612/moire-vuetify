<template>
  <div class="counter">
    <v-btn
      icon="mdi-plus"
      size="small"
      aria-label="уменьшить количество товара"
      color="pink"
      class="counter__btn"
      @click="decrement"
    ></v-btn>
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
      v-model="amount"
    />
    <v-btn
      icon="mdi-plus"
      size="small"
      aria-label="увелиить количество товара"
      color="pink"
      class="counter__btn"
      @click="incrememt"
    ></v-btn>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ref } from 'vue'

const props = defineProps({
  amount: { type: Number, default: 1 }
})

const emit = defineEmits(['update:amount'])

const amount = ref<number>(props.amount)

function incrememt() {
  amount.value++
}
function decrement() {
  if (amount.value <= 1) {
    return
  }
  amount.value--
}

watch(
  () => amount.value,
  (newValue) => {
    if (newValue < 1) {
      amount.value = 1
    }
    emit('update:amount', amount.value)
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
