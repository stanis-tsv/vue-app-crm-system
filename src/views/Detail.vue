<template>
  <Page :title="localeFilter('RecordDetail')" />
  <loader v-if="loading"></loader>
  <div v-else-if="record.date">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{ localeFilter('History') }}</router-link>
      <a @click.prevent class="breadcrumb">
        {{ record.type === 'income' ? localeFilter('Income') : localeFilter('Outcome') }}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="{
          'red': record.type === 'outcome',
          'green': record.type === 'income'
        }">
          <div class="card-content white-text">
            <p>{{ `${localeFilter('Description')}: ${record.description}` }}</p>
            <p>{{ `${localeFilter('Amount')}: ${currencyFilter(record.amount)}` }}</p>
            <p>{{ `${localeFilter('Category')}: ${record.categoryName}` }}</p>
            <small>{{ dateFilter(record.date, 'datetime') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>
    {{ `${localeFilter('RecordNotFount')}: ${$route.params.id}` }} 
  </p>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { currencyFilter } from '@/filters/currency.filter'
import { dateFilter } from '@/filters/date.filter'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const store = useStore()
    const route = useRoute()
    const record = ref(null)
    const loading = ref(true)

    onMounted(async () => {
      const id = route.params.id
      const fetchRecord = await store.dispatch('fetchRecordById', id)
      const category = await store.dispatch('fetchCategoryById', fetchRecord.categoryId)
      record.value = {
        ...fetchRecord,
        categoryName: category.title
      }
      
      loading.value = false
    })

    return {
      loading, record, currencyFilter, dateFilter, localeFilter
    }
  },
}
</script>