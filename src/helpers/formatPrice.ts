export function formatPrice(sum: number | string): string {
  return `${sum.toLocaleString('ru-RU')} ₽`
}
