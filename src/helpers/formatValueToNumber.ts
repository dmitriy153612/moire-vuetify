export function formatValueToNumber(value: unknown): number {
  if (Number.isFinite(value)) {
    return value as number
  }
  const isNumeric = /^\d+(\.\d+)?$/
  if (typeof value !== 'string' || !isNumeric.test(value)) {
    return 0
  }
  return Number(value)
}
