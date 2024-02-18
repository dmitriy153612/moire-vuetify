<template>
  <v-fade-transition>
    <div class="overlay" v-if="show" :style="overlayStyle">
      <span class="loader" :style="loaderStyle"></span>
    </div>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, defoult: false },
  type: { type: String as () => 'card' | 'screen', default: 'card' }
})

const overlayStyle = computed<string>(() => {
  const style = {
    card: 'position: absolute; z-index: 10;',
    screen: 'position: fixed; z-index: 1000;'
  }
  return style[props.type]
})

const loaderStyle = computed<string>(() => {
  const style = {
    card: 'width: 68px; height: 68px; border-width: 28px',
    screen: 'width: 98px; height: 98px; border-width: 18px'
  }
  return style[props.type]
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.overlay {
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--grey-darken-33);
}
.loader {
  border-width: 18px;
  border: 12px dotted var(--pink);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
