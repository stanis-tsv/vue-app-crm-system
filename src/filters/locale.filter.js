import uk from '@/locales/uk.json'
import en from '@/locales/en.json'

const locales = {
  'uk-UA': uk,
  'en-US': en
}

export function localeFilter(key) {
  const locale = localStorage.getItem('locale') || 'uk-UA'
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}