export function dateFilter(value, format = 'date') {
  const options = {}

  if (format.includes('date')) {
    options.year = 'numeric', 
    options.month = 'long', 
    options.day = '2-digit'
  }

  if (format.includes('time')) {
    options.hour = '2-digit', 
    options.minute = '2-digit', 
    options.second = '2-digit'
  }
  const locale = localStorage.getItem('locale') || 'uk-UA'
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}