import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  actions: {
    async fetchCurrency() {
      const res = await fetch('https://api.exchangerate.host/latest?symbols=USD,EUR,UAH')
      return await res.json()
    }
  },
  modules: {
    auth, info, category, record
  }
})
