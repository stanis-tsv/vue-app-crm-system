import { error } from '@/utils/notification'
import { getDatabase, ref, get, child, update } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      localStorage.setItem('locale', info.locale)
      state.info = info
    }
  },
  actions: {
    async updateInfo({ getters, commit, dispatch }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updates = {}
        updates[`users/${uid}/info`] = {...getters.info, ...toUpdate}
        commit('setInfo', {...getters.info, ...toUpdate})
        return await update(ref(getDatabase()), updates)
      } catch (e) {
        error(e)
        throw e
      }
    },
    async fetchInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const info = (await get(child(ref(getDatabase()), `users/${uid}/info`))).val()
        commit('setInfo', info)
      } catch (e) {
        error(e)
        throw e
      }
    }
  },
  getters: {
    info(state) {
      return state.info
    }
  }
}