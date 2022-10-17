import { localeFilter } from '@/filters/locale.filter'

export const keys = {
  'logout': 'Logout',
  'login': 'Login',
  'auth/user-not-found': 'EmailNotFound',
  'auth/wrong-password': 'WrongPassword',
  'auth/email-already-in-use': 'EmailInUse'
}

export function message(html) {
  M.toast({html: keys[html] 
    ? localeFilter(keys[html]) 
    : keys[html] 
    || html
  })
}

export function error(html) {
  M.toast({html: keys[html] 
    ? `${localeFilter('Error')}: ${localeFilter(keys[html])}` 
    : localeFilter('UnknownError')
  })
}