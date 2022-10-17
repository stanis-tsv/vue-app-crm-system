<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localeFilter('CategoryEdit') }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="selectRef" v-model="state.current">
            <option 
              v-for="cat in categories" 
              :key="cat.id"
              :value="cat.id"
            >{{ cat.title }}</option>
          </select>
          <label>{{ localeFilter('SelectCategory') }}</label>
        </div>

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
          {{ localeFilter('Btn_Update') }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'
import { reactive, onMounted, ref, onUnmounted, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/utils/notification'
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  setup(props, {emit}) {
    const store = useStore()
    const select = ref(null)
    const selectRef = ref(null)
    const state = reactive({
      title: '',
      limit: '',
      current: null
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
        const categoryData = {
          id: state.current,
          title: state.title,
          limit: state.limit
        }
        await store.dispatch('updateCategory', categoryData)
        message(localeFilter('Message_CategoryUpated'))
        emit('updated', categoryData)
      } catch (e) {}
    }

    watch(() => state.current, catId => {
      const {title, limit} = props.categories.find(c => c.id === catId)
      state.title = title
      state.limit = limit
    })

    onBeforeMount(() => {
      const {id, title, limit} = props.categories[0]
      state.current = id
      state.title = title
      state.limit = limit
    })

    onMounted(() => {
      M.updateTextFields()
      select.value = M.FormSelect.init(selectRef.value)
    })

    onUnmounted(() => {
      if (select.value && select.value.destroy) {
        select.value.destroy()
      }
    })

    return {
      state,
      selectRef,
      v$,
      onSubmit,
      localeFilter
    }
  }
}
</script>
