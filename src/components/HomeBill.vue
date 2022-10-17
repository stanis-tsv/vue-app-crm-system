<template>
  <div class="col s12 m6 l4">
    <div class="card bill-card cyan darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{ localeFilter('HomeBill') }}</span>
        <p 
          class="currency-line"
          v-for="cur in currencies"
          :key="cur"
        >
          <span>
            {{ currencyFilter(getCurrency(cur), cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { currencyFilter } from '@/filters/currency.filter'
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: ['rates'],
  setup(props) {
    const store = useStore()
    const currencies = ref(['UAH', 'USD', 'EUR'])
    const base = computed(() => store.getters.info.bill / (props.rates['UAH'] / props.rates['EUR']))

    const getCurrency = currency => {
      return Math.floor(base.value * props.rates[currency])
    }
    return {
      currencies, getCurrency, currencyFilter, localeFilter
    }
  }
}
</script>