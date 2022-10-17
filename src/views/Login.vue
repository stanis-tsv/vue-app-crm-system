<template>
  <Page :title="localeFilter('SignIn')" />
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">{{ localeFilter('OnlineAccounting') }}</span>

      <div class="input-field">
        <input
          id="email"
          type="email"
          v-model.trim="state.email"
          :class="{invalid: v$.email.$error}"
          @blur="v$.email.$touch"
        >
        <label for="email">Email</label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.email.$errors" :key="index"
        >{{ error.$message }}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="state.password"
          :class="{invalid: v$.password.$error}"
          @blur="v$.password.$touch"
        >
        <label for="password">{{ localeFilter('Password') }}</label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.password.$errors" :key="index"
        >{{ error.$message }}</small>
      </div>

    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit">
          {{ localeFilter('SignIn') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localeFilter('NoAccount') }}
        <router-link to="/register">
          {{ localeFilter('Register') }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useRoute, useRouter } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/utils/notification'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const state = reactive({
      email: '',
      password: ''
    })

    const rules = {
      email: { 
        required: helpers.withMessage(localeFilter('Validate_EnterEmail'), required), 
        email: helpers.withMessage(localeFilter('Validate_CorrectEmail'), email) 
      }, 
      password: { 
        required: helpers.withMessage(localeFilter('Validate_EnterPassword'), required), 
        minLength: helpers.withMessage(
          ({$model,$params}) => `${localeFilter('Validate_LengthPassword1')} ${$params.min} ${localeFilter('Validate_LengthPassword2')} ${$model.length} ${localeFilter('Validate_LengthPassword3')}`, minLength(6))
      } 
    }

    const v$ = useVuelidate(rules, state)

    const onSubmit = async () => {
      if (!await v$.value.$validate()) return
      try {
        await store.dispatch('login', {
          email: state.email,
          password: state.password
        })
        router.push('/')
      } catch (e) {}
    }

    onMounted(() => {
      M.updateTextFields()
      if (route.query.message) {
        message(route.query.message)
      }
    })

    return {
      state,
      v$,
      onSubmit,
      localeFilter
    }
  }
}
</script>