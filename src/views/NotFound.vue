<template>
  <Page :title="localeFilter('PageNotFound')" />
  <h4>{{ localeFilter('PageNotFound') }}</h4>
  <h5><router-link to="/login">{{ localeFilter('SignIn') }}</router-link></h5>
</template>

<script>
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    return {localeFilter}
  },
}
</script>

<style scoped>
h4 {
 color: aliceblue; 
}
h5 a {
 color: deepskyblue;
 text-decoration: underline;
}
</style>