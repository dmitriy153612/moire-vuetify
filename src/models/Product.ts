import { type FilterCategory } from '@/models/Filter'
import { type CatalogProduct } from '@/models/Catalog'

export interface Product extends CatalogProduct {
  sizes: FilterCategory[]
  category: FilterCategory
}
