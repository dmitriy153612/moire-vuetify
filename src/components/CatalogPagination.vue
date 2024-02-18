<template>
  <v-pagination class="pagination pt-6" v-model="page" :length="pages" rounded="10"></v-pagination>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { watch } from 'vue'
import { formatValueToNumber } from '@/helpers/formatValueToNumber'

const route = useRoute()
const router = useRouter()

defineProps({
  pages: { type: Number, required: true }
})

const page = ref<number>(1)

function setPageToRoute(page: number) {
  router.replace({ query: { ...route.query, page } })
}

if (!route.query.page) {
  setPageToRoute(1)
} else {
  page.value = formatValueToNumber(route.query.page)
}

watch(
  () => page.value,
  (newValue) => {
    setPageToRoute(newValue)
  }
)
</script>

<style scoped></style>
