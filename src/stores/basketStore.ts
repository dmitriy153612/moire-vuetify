import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { BASE_URL, BASKET_PATH, ADD_TO_BASKET_PATH } from '@/variables'
import { type BasketProduct, type BasketData, type BasketItem } from '@/models/Basket'

export const useBasketStore = defineStore('basketStore', () => {
  const basket = ref<BasketItem[]>([])
  const basketAmount = computed<number>(() => {
    return basket.value.reduce((acc, item) => acc + item.quantity, 0)
  })
  const isBasketLoading = ref<boolean>(false)
  const isAddtoBasketLoading = ref<boolean>(false)

  function setTokenToLS(token: string) {
    localStorage.setItem('moire-token', JSON.stringify(token))
  }

  async function getTokenFromLS(): Promise<string> {
    const data = localStorage.getItem('moire-token')
    return data ? await JSON.parse(data) : ''
  }

  async function fetchGetBasket() {
    try {
      isBasketLoading.value = true
      const token: string = await getTokenFromLS()
      const res = await axios.get<BasketData>(`${BASE_URL}${BASKET_PATH}`, {
        params: {
          userAccessKey: token
        }
      })
      const basketList: BasketItem[] = res.data.items
      basket.value = basketList
      setTokenToLS(res.data.user.accessKey)
    } catch (err) {
      console.error(err)
    } finally {
      isBasketLoading.value = false
    }
  }

  async function fetchAddToBasket(product: BasketProduct) {
    try {
      isAddtoBasketLoading.value = true
      const token = await getTokenFromLS()

      const config = {
        params: { userAccessKey: token }
      }
      const res = await axios.post<BasketData>(`${BASE_URL}${ADD_TO_BASKET_PATH}`, product, config)
      const basketList: BasketItem[] = res.data.items
      basket.value = basketList
      setTokenToLS(res.data.user.accessKey)
    } catch (err) {
      console.error(err)
    } finally {
      isAddtoBasketLoading.value = false
    }
  }

  return {
    basket,
    basketAmount,
    isAddtoBasketLoading,
    fetchGetBasket,
    fetchAddToBasket
  }
})
