<template>
  <Page :title="localeFilter('History')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('HistoryTitle') }}</h3>
    </div>

    <div class="history-chart">
      <Doughnut
        :chart-options="chartOptions"
        :chart-data="chartData"
      />
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!paginated.allItems.length">
      {{ localeFilter('NoRecord') }} 
      <router-link to="/record">
        {{ localeFilter('AddFirstRecord') }}
      </router-link>
    </p>

    <section v-else>
      <history-table :records="paginated.items"></history-table>

      <paginate
        v-model="paginated.page"
        :pageCount="paginated.pageCount"
        :clickHandler="paginated.pageChange"
        :prevText="localeFilter('Prev')"
        :nextText="localeFilter('Next')"
        :containerClass="'pagination'"
        :pageClass="'waves-effect'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

import { pagination } from '@/utils/pagination'
import HistoryTable from '@/components/HistoryTable'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { HistoryTable, Doughnut, Page },

  setup() {
    const store = useStore()
    const route = useRoute()
    const paginated = ref(null)
    const loading = ref(true)
    const chartData = ref({})
    const chartOptions = ref({})

    onMounted(async () => {
      const categories = await store.dispatch('fetchCategories')
      const records = await store.dispatch('fetchRecords')

      paginated.value = pagination(records.map(record => {
        return {
          ...record,
          categoryName: categories.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? localeFilter('Income') : localeFilter('Outcome')
        }
      }), route)

      chartData.value = {
        labels: categories.map(c => c.title),
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#FC8403', '#f003fc', '#fc032d', '#03befc', '#fceb03', '#03fc4a', '#7303fc', '#03fcf8'],
          data: categories.map(c => {
            return records.reduce((total, r) => {
              if (r.categoryId === c.id && r.type === 'outcome') {
                total += +r.amount
              }
              return total
            }, 0)
          })
        }]
      }

      chartOptions.value = {
        responsive: true,
        maintainAspectRatio: false
      }

      loading.value = false
    })

    return {
      loading, 
      paginated,
      chartData,
      chartOptions,
      localeFilter
    }
  }
}
</script>
