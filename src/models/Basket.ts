import { type CatalogColor, type CatalogProduct } from '@/models/Catalog'
import { type FilterCheckbox } from '@/models/Filter'

export interface BasketProduct {
  productId: string
  colorId: string
  sizeId: string
  quantity: string
}

export interface BasketItem {
  id: number
  price: number
  quantity: number
  color: CatalogColor
  product: CatalogProduct
  size: FilterCheckbox
}

export interface BasketData {
  id: number
  items: BasketItem[]
  user: {
    id: number
    accessKey: string
  }
}
