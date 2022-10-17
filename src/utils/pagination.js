import { ref } from 'vue'
import _ from 'lodash'
import router from '@/router/index'

export function pagination(records, route) {
  const page = ref(+route.query.page || 1)
  const pageSize = ref(5)
  const allItems = ref(_.chunk(records, pageSize.value))
  const pageCount = ref(_.size(allItems.value))
  const items = ref(allItems.value[page.value - 1] || allItems.value[0])

  const pageChange = page => {
    router.push(`${route.path}?page=${page}`)
    items.value = allItems.value[page - 1] || allItems.value[0]
  }

  return {items, pageCount, allItems, page, pageChange}
}
