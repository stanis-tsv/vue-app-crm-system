export function currencyFilter(value, currency = 'UAH') {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol'
  }).format(value)
}