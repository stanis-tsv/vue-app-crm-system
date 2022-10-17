<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localeFilter('Amount') }}</th>
        <th>{{ localeFilter('Date') }}</th>
        <th>{{ localeFilter('Category') }}</th>
        <th>{{ localeFilter('Type') }}</th>
        <th>{{ localeFilter('Open') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ currencyFilter(record.amount, 'UAH') }}</td>
        <td>{{ dateFilter(record.date, 'datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span 
          class="white-text badge" 
          :class="[record.typeClass]">
            {{ record.typeText }}
          </span>
        </td>
        <td>
          <button
            v-tooltip="localeFilter('WatchRecord')"
            data-position="top"
            class="btn-small btn teal lighten-2" 
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { currencyFilter } from '@/filters/currency.filter'
import { dateFilter } from '@/filters/date.filter'
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
  setup() {
    return {currencyFilter, dateFilter, localeFilter}
  }
}
</script>

<style>

</style>