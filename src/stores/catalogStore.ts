import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { BASE_URL, CATALOG_PATH } from '@/variables'
import { type CatalogProduct, type Pagination } from '@/models/Catalog'
import { type Filter } from '@/models/Filter'

export const useCatalogStore = defineStore('catalogStore', () => {
  const catalog = ref<CatalogProduct[]>([])
  const pagination = ref<Pagination>({ page: 0, pages: 0, total: 0 })

  const isCatalogLoading = ref<boolean>(false)

  async function fetchCatalog(params: Partial<Filter> = {}) {
    try {
      isCatalogLoading.value = true
      const res: AxiosResponse<{ items: CatalogProduct[]; pagination: Pagination }> =
        await axios.get(`${BASE_URL}${CATALOG_PATH}`, { params: { limit: 8, page: 1, ...params } })
      pagination.value = res.data.pagination
      catalog.value = res.data.items
    } catch (err) {
      console.error(err)
    } finally {
      isCatalogLoading.value = false
    }
  }

  return {
    isCatalogLoading,
    catalog,
    pagination,
    fetchCatalog
  }
})
