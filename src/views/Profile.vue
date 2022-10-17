<template>
  <Page :title="localeFilter('Profile')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Profile') }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="state.name"
          :class="{invalid: v$.name.$error}"
          @blur="v$.name.$touch"
        >
        <label for="description">{{ localeFilter('Name') }}</label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.name.$errors" 
          :key="index"
        >{{ error.$message }}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isUaLocale">
          <span class="lever"></span>
          Українська
        </label>
      </div>

      <button class="btn waves-effect waves-light">
        {{ localeFilter('Btn_Update') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useStore } from 'vuex'
import { ref, onMounted, reactive } from 'vue'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const store = useStore()
    const isUaLocale = ref(true)
    const state = reactive({
      name: ''
    })

    const rules = {
      name: { 
        required: helpers.withMessage(localeFilter('Validate_EnterName'), required)
      }
    }

    const v$ = useVuelidate(rules, state)

    const onSubmit = async () => {
      if (!await v$.value.$validate()) return
      try {
        await store.dispatch('updateInfo', {
          ...state,
          locale: isUaLocale.value ? 'uk-UA' : 'en-US'
        })
      } catch (e) {}
    }

    onMounted(() => {
      state.name = store.getters.info.name

      isUaLocale.value = store.getters.info.locale === 'uk-UA'

      setTimeout(() => {
        M.updateTextFields()
      })
    })

    return {
      isUaLocale,
      localeFilter,
      state,
      v$,
      onSubmit
    }
  },
}
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>