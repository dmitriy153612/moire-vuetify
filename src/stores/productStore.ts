import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { BASE_URL, PRODUCT_PATH } from '@/variables'
import { type Product } from '@/models/Product'

export const useProductStore = defineStore('productStore', () => {
  const product = ref<Product | null>(null)

  const isProductLoading = ref<boolean>(false)

  async function fetchProduct(id: string) {
    try {
      isProductLoading.value = true
      const res: AxiosResponse<Product> = await axios.get(`${BASE_URL}${PRODUCT_PATH}${id}`)

      product.value = res.data
    } catch (err) {
      console.error(err)
    } finally {
      isProductLoading.value = false
    }
  }

  return {
    isProductLoading,
    product,
    fetchProduct
  }
})
