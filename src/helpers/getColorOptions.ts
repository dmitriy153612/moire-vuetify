import { type CatalogColor, type ProductColorOption } from '@/models/Catalog';

export function getColorOptions(galleryList: CatalogColor[]): ProductColorOption[] {
  const colorsList: ProductColorOption[] = []
  if (!galleryList.length) {
    return []
  }
  galleryList.forEach((item) => {
    const colorObj: ProductColorOption = {
      id: item.color.id,
      code: item.color.code,
      title: item.color.title,
      imgUrl: ''
    }
    if (item.gallery && item.gallery[0].file.url) {
      colorObj.imgUrl = item.gallery[0].file.url
    } else {
      colorObj.imgUrl = new URL('@/assets/images/unnamed.webp', import.meta.url).href
    }
    colorsList.push(colorObj)
  })
  return colorsList
}