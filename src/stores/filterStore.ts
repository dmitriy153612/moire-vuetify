import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type FilterCategory, type FilterCheckbox } from '@/models/Filter'
import { BASE_URL, CATEGORIES_PATH, SEASONS_PATH, MATERIALS_PATH, COLORS_PATH } from '@/variables'

export const useFilterStore = defineStore('filterStore', () => {
  const categories = ref<FilterCategory[]>([])
  const seasons = ref<FilterCheckbox[]>([])
  const materials = ref<FilterCheckbox[]>([])
  const colors = ref<FilterCheckbox[]>([])
  const isFilterLoading = ref<boolean>(false)
  const isFilterOpen = ref(true)

  if (window.innerWidth <= 960) {
    isFilterOpen.value = false
  }

  const updatedIsFilterOpen = computed<boolean>({
    get: () => isFilterOpen.value,
    set: (newValue) => (isFilterOpen.value = newValue)
  })

  async function fetchCategories(): Promise<FilterCategory[]> {
    const res = await axios.get(`${BASE_URL}${CATEGORIES_PATH}`)
    return res.data.items
  }

  async function fetchSeasons(): Promise<FilterCheckbox[]> {
    const res = await axios.get(`${BASE_URL}${SEASONS_PATH}`)
    return res.data.items
  }

  async function fetchMaterials(): Promise<FilterCheckbox[]> {
    const res = await axios.get(`${BASE_URL}${MATERIALS_PATH}`)
    return res.data.items
  }
  async function fetchColors(): Promise<FilterCheckbox[]> {
    const res = await axios.get(`${BASE_URL}${COLORS_PATH}`)
    return res.data.items
  }

  type FilterData = [
    PromiseSettledResult<FilterCategory[]>,
    PromiseSettledResult<FilterCheckbox[]>,
    PromiseSettledResult<FilterCheckbox[]>,
    PromiseSettledResult<FilterCheckbox[]>
  ]

  async function fetchFilter() {
    try {
      isFilterLoading.value = true
      const [categoriesPromise, seasonsPromise, materialsPromise, colorsPromise]: FilterData =
        await Promise.allSettled([
          fetchCategories(),
          fetchSeasons(),
          fetchMaterials(),
          fetchColors()
        ])

      categories.value = categoriesPromise.status === 'fulfilled' ? categoriesPromise.value : []
      seasons.value = seasonsPromise.status === 'fulfilled' ? seasonsPromise.value : []
      materials.value = materialsPromise.status === 'fulfilled' ? materialsPromise.value : []
      colors.value = colorsPromise.status === 'fulfilled' ? colorsPromise.value : []
    } catch (err) {
      console.error(err)
    } finally {
      isFilterLoading.value = false
    }
  }

  return {
    categories,
    seasons,
    materials,
    colors,
    fetchFilter,
    isFilterLoading,
    updatedIsFilterOpen
  }
})
