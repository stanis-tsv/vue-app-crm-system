<template>
  <Page :title="localeFilter('Record')" />
  <div>
    <div class="page-title">
      <h3>{{ localeFilter('Record') }}</h3>
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!categories.length">
      {{ localeFilter('NoCategories') }}
      <router-link to="/categories">
        {{ localeFilter('AddNewCategory') }}
      </router-link> 
    </p>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="input-field" >
        <select ref="selectRef" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label>{{ localeFilter('SelectCategory') }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="state.type"
          >
          <span>{{ localeFilter('Income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="state.type"
          >
          <span>{{ localeFilter('Outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="state.amount"
          :class="{invalid: v$.amount.$error || !state.amount}"
          @blur="v$.amount.$touch"
        >
        <label for="amount"><span>{{ localeFilter('Amount') }}</span></label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.amount.$errors" 
          :key="index"
        >{{ error.$message }}</small>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="state.description"
          :class="{invalid: v$.description.$error}"
          @blur="v$.description.$touch"
        >
        <label for="description"><span>{{ localeFilter('Description') }}</span></label>
        <small 
          class="helper-text invalid"
          v-for="(error, index) in v$.description.$errors" 
          :key="index"
        >{{ error.$message }}</small>
      </div>

      <button class="btn waves-effect waves-light">
        {{ localeFilter('Btn_Create') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, helpers } from '@vuelidate/validators'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { message } from '@/utils/notification'
import { localeFilter } from '@/filters/locale.filter'
import Page from '@/components/app/Page'
export default {
	components: { Page },
  setup() {
    const store = useStore()
    const select = ref(null)
    const selectRef = ref(null)
    const categories = ref([])
    const loading = ref(true)
    const category = ref(null)
    const state = reactive({
      type: 'income',
      amount: 1,
      description: ''
    })

    const rules = {
      description: { 
        required: helpers.withMessage(localeFilter('Validate_EnterDescription'), required)
      }, 
      amount: {
        required: helpers.withMessage(localeFilter('Validate_EnterAmount'), required),
        minValue: helpers.withMessage(({$params}) => `${localeFilter('Validate_MinValue')} ${$params.min}`, minValue(1))
      } 
    }

    const v$ = useVuelidate(rules, state)

    const getBill = computed(() => store.getters.info.bill)

    const canCreateRecord = computed(() => {
      if (state.type === 'income') {
        return true
      }
      return getBill.value >= state.amount
    })

    const onSubmit = async () => {
      if (!await v$.value.$validate()) return
      if (canCreateRecord.value) {
        try {
          await store.dispatch('createRecord', {
            categoryId: category.value,
            amount: state.amount,
            description: state.description,
            type: state.type,
            date: new Date().toJSON()
          })

          const bill = state.type === 'income' 
            ? getBill.value + state.amount
            : getBill.value - state.amount

          await store.dispatch('updateInfo', {bill})
          message(localeFilter('Message_RecordCreated'))
          state.amount = 1
          state.description = ''
          v$.value.$reset()
        } catch (e) {}
      } else {
        message(`${localeFilter('Message_NoFunds')} (${state.amount - getBill.value})`)
      }
    }

    onMounted(async () => {
      categories.value = await store.dispatch('fetchCategories')
      loading.value = false

      if (categories.value.length) {
        category.value = categories.value[0].id
      }

      setTimeout(() => {
        select.value = M.FormSelect.init(selectRef.value)
        M.updateTextFields()
      }, 0)
    })

    onUnmounted(() => {
      if (select.value && select.value.destroy) {
        select.value.destroy()
      }
    })

    return {
      selectRef, loading, categories, category, state, v$, onSubmit, localeFilter
    }
  },
}
</script>