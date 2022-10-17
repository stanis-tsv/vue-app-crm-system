<template>
  <Page :title="localeFilter('Register')" />
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
          v-for="(error, index) in v$.email.$errors" 
          :key="index"
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
          v-for="(error, index) in v$.password.$errors" 
          :key="index"
        >{{ error.$message }}</small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="state.name"
          :class="{invalid: v$.name.$error}"
          @blur="v$.name.$touch"
        >
        <label for="name">{{ localeFilter('Name') }}</label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.name.$errors" 
          :key="index"
        >{{ error.$message }}</small>
      </div>

      <p>
        <label>
          <input 
            type="checkbox"
            v-model="state.agree"
          >
          <span>{{ localeFilter('RulsAgree') }}</span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit">
          {{ localeFilter('Register') }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ localeFilter('HaveAccount') }}
        <router-link to="/login">
          {{ localeFilter('SignIn') }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      email: '',
      password: '',
      name: '',
      agree: false
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
      },
      name: { 
        required: helpers.withMessage(localeFilter('Validate_EnterName'), required)
      },
      agree: {checked: v => v} 
    }

    const v$ = useVuelidate(rules, state)

    const onSubmit = async () => {
      if (!await v$.value.$validate()) return
      const formData = {
        email: state.email,
        password: state.password,
        name: state.name
      }
      try {
        await store.dispatch('register', formData)
        router.push('/')
      } catch (e) {}
    }

    return {
      state,
      v$,
      onSubmit,
      localeFilter
    }
  }
}
</script>