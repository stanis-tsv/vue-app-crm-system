<template>
  <Page :title="localeFilter('Categories')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Categories') }}</h3>
    </div>
    <section>
      <loader v-if="loading"></loader>
      <div class="row" v-else>
        
        <category-create 
          @created="addNewCategory"
        ></category-create>
        
        <category-edit
          v-if="categories.length" 
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        ></category-edit>

        <p v-else class="center">{{ localeFilter('NoCategories') }}</p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
  components: {CategoryCreate, CategoryEdit, Page},
  setup() {
    const store = useStore()
    const categories = ref([])
    const loading = ref(true)
    const updateCount = ref(0)

    const addNewCategory = (category) => {
      categories.value.push(category)
    }

    const updateCategories = category => {
      const index = categories.value.findIndex(c => c.id === category.id)
      categories.value[index].title = category.title
      categories.value[index].limit = category.limit
      updateCount.value++
    }

    onMounted(async () => {
      categories.value = await store.dispatch('fetchCategories')
      loading.value = false
    })

    return {
      addNewCategory, categories, loading, updateCategories, updateCount, localeFilter
    }
  }
}
</script>