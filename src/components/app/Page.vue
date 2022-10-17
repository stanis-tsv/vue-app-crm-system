<template>
</template>

<script>
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup(props) {
    document.title = `${props.title} | ${localeFilter('OnlineAccounting')}`
  }
}
</script>