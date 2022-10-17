<template>
  <Page :title="localeFilter('Planning')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Planning') }}</h3>
      <h4>{{ currencyFilter(getBill, 'UAH') }}</h4>
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!categories.length">
      {{ localeFilter('NoCategories') }}
      <router-link to="/categories">
        {{ localeFilter('AddNewCategory') }}
      </router-link> 
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ currencyFilter(cat.spend) }} 
          {{ localeFilter('From') }}
          {{ currencyFilter(cat.limit) }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip" data-position="top">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import {currencyFilter} from '@/filters/currency.filter'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const store = useStore()
    const loading = ref(true)
    const categories = ref([])
    const getBill = computed(() => store.getters.info.bill)

    onMounted(async () => {
      const records = await store.dispatch('fetchRecords')
      const fetchedCategories = await store.dispatch('fetchCategories')

      categories.value = fetchedCategories.map(cat => {
        const spend = records
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === 'outcome')
          .reduce((total, record) => {
            return total += +record.amount
          }, 0)
        
        const percent = 100 * spend / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red'
        
        const tooltipValue = cat.limit - spend
        const tooltip = `${tooltipValue < 0 ? localeFilter('Excess') : localeFilter('Remains')} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })

      loading.value = false
    })

    return {
      loading, categories, getBill, currencyFilter, localeFilter
    }
  },
}
</script>