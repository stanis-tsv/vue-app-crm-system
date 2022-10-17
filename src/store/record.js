import { getDatabase, ref, set, push, get, child } from 'firebase/database'
import { error } from '@/utils/notification'

export default {
  actions: {
    async createRecord({ dispatch }, recordData) {
      try {
        const uid = await dispatch('getUid')
        const records = ref(getDatabase(), `users/${uid}/records`)
        const record = await push(records)
        await set(record, recordData)
        return {...recordData}
      } catch (e) {
        error(e)
        throw e
      }
    },
    async fetchRecords({ dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const records = (await get(child(ref(getDatabase()), `users/${uid}/records`))).val() || {}
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        error(e)
        throw e
      }
    },
    async fetchRecordById({ dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await get(child(ref(getDatabase()), `users/${uid}/records/${id}`))).val() || {}
        return {...record, id}
      } catch (e) {
        error(e)
        throw e
      }
    }
  }
}