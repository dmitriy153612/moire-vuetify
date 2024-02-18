export interface FilterCategory {
  id: number
  title: string
  slug?: string
}

export interface FilterCheckbox {
  id: number
  title: string
  code: string
}

export interface Filter {
  minPrice: number
  maxPrice: number
  categoryId: number
  seasonIds: number[]
  materialIds: number[]
  colorIds: number[]
  page?: number
}
