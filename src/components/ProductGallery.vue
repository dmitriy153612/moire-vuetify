<template>
  <div class="gallery">
    <div class="gallery__img-wrapper">
      <img :src="imgUrl" alt="" class="gallery__img" />
    </div>

    <v-slide-group
      style="max-width: 100%; width: auto; height: 80px; justify-self: center"
      v-model="updatedSelectedColorId"
      selected-class="bg-primary"
      show-arrows
      mandatory
      center-active
    >
      <v-slide-group-item
        v-for="(option, index) in colorOptions"
        :key="index"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <button
          class="btn-slide mx-2"
          :class="[selectedClass, { selected: isSelected }]"
          @click="toggle"
          :aria-label="`картинка №${index + 1}`"
        >
          <img :src="option.imgUrl" alt="" class="btn-slide__img" />
        </button>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup lang="ts">
import { type ProductColorOption } from '@/models/Catalog'
import { computed } from 'vue'

const props = defineProps({
  colorOptions: { type: Array as () => ProductColorOption[], required: true },
  selectedColorId: { type: Number, required: true }
})

const emit = defineEmits(['update:selectedColorId'])

const updatedSelectedColorId = computed<number>({
  get: () => props.colorOptions.findIndex((item) => item.id === props.selectedColorId),
  set: (newValue) => {
    const colorId = props.colorOptions[newValue].id
    emit('update:selectedColorId', colorId)
  }
})

const imgUrl = computed<string>(() => {
  const colorOption = props.colorOptions.find((item) => item.id === props.selectedColorId)
  return colorOption ? colorOption.imgUrl : ''
})
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  &__img-wrapper {
    display: flex;
    justify-content: center;
    max-height: 640px;
    aspect-ratio: 494 / 640;
    width: 100%;
  }
  &__img {
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1);
  }
}

.btn-slide {
  border: 2px solid transparent;
  transition: border-color 0.2s ease;
  &.selected {
    border: 2px solid var(--pink);
  }

  height: 100%;
  background-color: var(--main-bg);
  &__img {
    height: 100%;
  }
}
</style>
