import { getDatabase, ref, get, set, push, child, update } from 'firebase/database'
import { error } from '@/utils/notification'

export default {
  actions: {
    async createCategory({ dispatch }, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const categories = ref(getDatabase(), `users/${uid}/categories`)
        const category = await push(categories)
        await set(category, {title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        error(e)
        throw e
      }
    },

    async updateCategory({ dispatch }, {title, limit, id}) {
      try {
        const uid = await dispatch('getUid')
        const updates = {}
        updates[`users/${uid}/categories/${id}`] = {title, limit}
        return await update(ref(getDatabase()), updates)
      } catch (e) {
        error(e)
        throw e
      }
    },

    async fetchCategories({ dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await get(child(ref(getDatabase()), `users/${uid}/categories`))).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        error(e)
        throw e
      }
    },

    async fetchCategoryById({ dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await get(child(ref(getDatabase()), `users/${uid}/categories/${id}`))).val() || {}
        return {...category, id}
      } catch (e) {
        error(e)
        throw e
      }
    }
  }
}