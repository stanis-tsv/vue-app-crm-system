<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localeFilter('CategoryCreate') }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input 
            id="title" 
            type="text" 
            v-model.trim="state.title"
            :class="{invalid: v$.title.$error}"
            @blur="v$.title.$touch"
          >
          <label for="title">{{ localeFilter('Title') }}</label>
          <small 
            class="helper-text invalid"
            v-for="(error, index) in v$.title.$errors" 
            :key="index"
          >{{ error.$message }}</small>
        </div>

        <div class="input-field">
          <input 
            id="limit" 
            type="number" 
            v-model.number="state.limit"
            :class="{invalid: v$.limit.$error}"
            @blur="v$.limit.$touch"
          >
          <label for="limit">{{ localeFilter('Limit') }}</label>
          <small 
            class="helper-text invalid"
            v-for="(error, index) in v$.limit.$errors" 
            :key="index"
          >{{ error.$message }}</small>
        </div>

        <button class="btn waves-effect waves-light">
          {{ localeFilter('Btn_Create') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'
import { reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/utils/notification'
import { localeFilter } from '@/filters/locale.filter'
export default {
  setup(_, {emit}) {
    const store = useStore()
    const state = reactive({
      title: '',
      limit: 100
    })
    const rules = {
      title: { 
        required: helpers.withMessage(localeFilter('Validate_EnterTitle'), required)
      }, 
      limit: {
        minValue: helpers.withMessage(({$params}) => `${localeFilter('Validate_LessLimit')} ${$params.min}`, minValue(100))
      } 
    }
    const v$ = useVuelidate(rules, state)
    const onSubmit = async () => {
      if (!await v$.value.$validate()) return
      try {
        const category = await store.dispatch('createCategory', {
          title: state.title,
          limit: state.limit
        })
        state.title = ''
        state.limit = 100
        v$.value.$reset()
        emit('created', category)
        message(localeFilter('Message_CategoryCreated'))
      } catch (e) {}
    }

    onMounted(() => {
      M.updateTextFields()
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
