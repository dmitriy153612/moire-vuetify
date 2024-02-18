import { type FilterCheckbox } from '@/models/Filter'

interface CatalogColorGallery {
  file: {
    url?: string
    name: string
    originalName: string
    extension: string
    size: string
  }
}

export interface ProductColorOption extends FilterCheckbox {
  imgUrl: string
}

export interface CatalogColor {
  id: number
  color: FilterCheckbox
  gallery: CatalogColorGallery[]
}

export interface CatalogProduct {
  id: number
  title: string
  slug: string
  price: number
  colors: CatalogColor[]
  seasons: FilterCheckbox[]
  materials: FilterCheckbox[]
}

export interface Pagination {
  page: number
  pages: number
  total: number
}
