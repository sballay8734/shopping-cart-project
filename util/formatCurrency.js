const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD'
})

export function formatCurrency(value) {
  return formatter.format(value)
}
