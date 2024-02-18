<template>
  <v-breadcrumbs :items="items">
    <template v-slot:title="{ item }">
      {{ item.title }}
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { type Breadcrumbs } from '@/models/Common'

defineProps({
  items: {
    type: Array as () => Breadcrumbs[],
    required: true
  }
})
</script>

<style scoped></style>
