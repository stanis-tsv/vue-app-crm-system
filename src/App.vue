<template>
  <component :is="layout + '-layout'">
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout || 'empty') 
    }
  },
  components: {EmptyLayout, MainLayout}
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
