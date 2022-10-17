<template>
  <nav class="navbar teal lighten-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter(date, 'datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownRef"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">
                  account_circle
                </i>
                {{ localeFilter('Profile') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">
                  assignment_return
                </i>
                {{ localeFilter('LogoutText') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { dateFilter } from '@/filters/date.filter'
import { useStore } from 'vuex'
import { localeFilter } from '@/filters/locale.filter'
export default {
  emits: ['toggle'],

  setup() {
    const router = useRouter()
    const store = useStore()
    const dropdownRef = ref()
    let date = ref(new Date())
    const interval = ref(null)
    const dropdown = ref(null)

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login?message=logout')
    }

    onMounted(async () => {
      interval.value = setInterval(() => {
        date.value = new Date()
      }, 1000)

      dropdown.value = M.Dropdown.init(dropdownRef.value, {
        constrainWidth: false,
        alignment: 'right'
      })
    }),
    onBeforeUnmount(() => {
      clearInterval(interval.value)
      if (dropdown.value && dropdown.value.destroy) {
        dropdown.value.destroy()
      }
    })

    return {
      dropdownRef,
      logout,
      date,
      dateFilter,
      userName: computed(() => store.getters.info.name),
      localeFilter
    }
  }
  
}
</script>