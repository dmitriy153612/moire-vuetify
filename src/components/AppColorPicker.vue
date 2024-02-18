<template>
  <ul class="color-list">
    <li class="color-list__item color-btn" v-for="item in colorList" :key="item.id">
      <input
        class="color-btn__btn"
        :type="type"
        :name="name"
        :id="`${name}-${item.id}`"
        :value="item.id"
        v-model="updatedModelValue"
      />
      <label
        :style="{ 'background-color': item.code }"
        class="color-btn__label"
        :for="`${name}-${item.id}`"
      >
        {{ item.title }}
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type FilterCheckbox } from '@/models/Filter'

type TagType = 'radio' | 'checkbox'

defineProps({
  modelValue: { type: Array as () => number | number[], required: true },
  colorList: { type: Array as () => FilterCheckbox[], required: true },
  type: { type: String as () => TagType, defoult: 'checkbox' },
  name: { type: String, required: true }
})

const updatedModelValue = defineModel<number | number[]>('modelValue')
</script>

<style lang="scss" scoped>
.color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 6px;
}

.color-btn {
  &__btn {
    opacity: 0;
    position: absolute;
    z-index: -100;
    user-select: none;
  }
  &__label {
    position: relative;
    border: 2px solid transparent;
    display: block;
    aspect-ratio: 1 / 1;
    height: 100%;
    height: 33px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    font-size: 0;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }
  &__label::before {
    content: '';
    position: absolute;
    inset: -7px;
    border: 2px solid transparent;
    border-radius: 50%;
    transition: border-color 0.2s ease;
  }

  &__btn:focus + &__label {
    transform: scale(1.1);
  }
  &__btn:checked + &__label::before {
    border-color: var(--pink);
  }
}
</style>
@/models/filter
