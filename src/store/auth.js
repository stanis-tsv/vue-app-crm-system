import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, set, ref } from 'firebase/database'
import { error } from '@/utils/notification'

export default {
  actions: {
    async login({}, {email, password}) {
      try {
        await signInWithEmailAndPassword(getAuth(), email, password)
      } catch (e) {
        error(e.code)
        throw e
      }
    },

    async register({}, {email, password, name}) {
      try {
        const createdUser = await createUserWithEmailAndPassword(getAuth(), email, password)
        const uid = createdUser.user.uid
        await set(ref(getDatabase(), `users/${uid}/info`), {
          name,
          locale: 'uk-UA',
          bill: 10000
        })
      } catch (e) {
        error(e.code)
        throw e
      }
    },

    getUid() {
      const user = getAuth().currentUser
      return user ? user.uid : null
    },

    async logout() {
      await signOut(getAuth())
    }
  }
}