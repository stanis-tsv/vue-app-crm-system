<template>
  <div class="col s12 m6 l8">
    <div class="card bill-card red lighten-2">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ localeFilter('HomeCurrency') }}</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>{{ localeFilter('Currency') }}</th>
            <th>{{ localeFilter('Rate') }}</th>
            <th>{{ localeFilter('Date') }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur in currencies" :key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(5) }}</td>
            <td>{{ dateFilter(date, 'date') }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFilter } from '@/filters/date.filter'
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: ['rates', 'date'],

  setup() {
    return {
      currencies: ['UAH', 'USD', 'EUR'],
      dateFilter,
      localeFilter
    }
  },
}
</script>