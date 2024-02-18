import { type LocationQuery } from 'vue-router'
import { type Filter } from '@/models/Filter'
import { formatValueToNumber } from '@/helpers/formatValueToNumber'
import { ref, type Ref } from 'vue'
import { MAX_AVALIABLE_PRICE } from '@/variables'

export function useFilterQueryParams(): (routeQuery: LocationQuery) => Ref<Filter> {
  function getArrayOfNumbers(value: unknown): number[] {
    const result: number[] = []
    const addValidValueToArr = (val: unknown): void => {
      const num = formatValueToNumber(val)
      if (num !== 0) {
        result.push(num)
      }
    }
    if (Array.isArray(value)) {
      value.forEach((item) => {
        addValidValueToArr(item)
      })
    } else {
      addValidValueToArr(value)
    }
    return result
  }

  function formatValueToNumberFromQuery(key: string, routeQuery: LocationQuery): number {
    if (key in routeQuery) {
      return formatValueToNumber(routeQuery[key])
    }
    return 0
  }

  function getArrayOfNumbersFromQuery(key: string, routeQuery: LocationQuery): number[] {
    if (key in routeQuery) {
      return getArrayOfNumbers(routeQuery[key])
    }
    return []
  }

  function getFilterParamsFromRoute(routeQuery: LocationQuery): Ref<Filter> {
    return ref<Filter>({
      minPrice: formatValueToNumberFromQuery('minPrice', routeQuery),
      maxPrice: formatValueToNumberFromQuery('maxPrice', routeQuery) || MAX_AVALIABLE_PRICE,
      categoryId: formatValueToNumberFromQuery('categoryId', routeQuery),
      seasonIds: getArrayOfNumbersFromQuery('seasonIds', routeQuery),
      materialIds: getArrayOfNumbersFromQuery('materialIds', routeQuery),
      colorIds: getArrayOfNumbersFromQuery('colorIds', routeQuery)
    })
  }

  return getFilterParamsFromRoute
}
