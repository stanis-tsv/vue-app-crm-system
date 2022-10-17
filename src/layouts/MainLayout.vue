<template>

  <loader v-if="loading"></loader>

  <div class="app-main-layout" v-else :key="locale">
    <the-navbar @toggle="isOpen = !isOpen"></the-navbar>

    <the-sidebar :isOpen="isOpen"></the-sidebar>

    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link 
        class="btn-floating btn-large teal lighten-2" 
        to="/record" 
        v-tooltip="localeFilter('CreateNewRecord')" 
        data-position="left"
        :key="locale"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/app/TheNavbar'
import TheSidebar from '@/components/app/TheSidebar'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { localeFilter } from '@/filters/locale.filter'
export default {
  components: {TheNavbar, TheSidebar},
  setup() {
    const store = useStore()
    const isOpen = ref(true)
    const loading = ref(true)
    const getInfo = computed(() => store.getters.info)
    const locale = computed(() => store.getters.info.locale)

    onMounted(async () => {
      if (!Object.keys(getInfo.value).length) {
        await store.dispatch('fetchInfo')
      }
      loading.value = false
    })

    return {isOpen, loading, locale, localeFilter}
  }
}
</script>