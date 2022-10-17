<template>
  <Page :title="localeFilter('Bill')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Bill') }}</h3>
      <button class="btn waves-effect waves-light btn-small teal lighten-2" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading"></loader>

    <div class="row" v-else>
      
      <home-bill
        :rates="currency.rates"
      ></home-bill>

      <home-currency
        :rates="currency.rates"
        :date="currency.date"
      ></home-currency>

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
  components: {HomeBill, HomeCurrency, Page},
  setup() {
    const loading = ref(true)
    const currency = ref(null)
    const store = useStore()

    onMounted(async () => {
      currency.value = await store.dispatch('fetchCurrency')
      loading.value = false 
    })

    const refresh = async () => {
      loading.value = true
      currency.value = await store.dispatch('fetchCurrency')
      loading.value = false
    } 

    return {
      loading, currency, refresh, localeFilter
    }
  }
}
</script>
