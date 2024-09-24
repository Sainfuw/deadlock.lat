export const groupBy = <T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string
) =>
  array.reduce(
    (acc, value, index, array) => {
      ;(acc[predicate(value, index, array)] ||= []).push(value)
      return acc
    },
    {} as { [key: string]: T[] }
  )

export function groupFilters(price: number) {
  if (price <= 500) return '500'
  if (price <= 1250) return '1250'
  if (price <= 3000) return '3000+'
  return '6200+'
}
