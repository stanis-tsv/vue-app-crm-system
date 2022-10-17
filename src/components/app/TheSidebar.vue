<template>
  <ul class="sidenav app-sidenav brown lighten-5" :class="{open: isOpen}">
    <router-link 
      v-for="link in links" 
      :key="link.url"
      :to="link.url"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
    >
      <li class="sidebar">
        <a :href="href" @click="navigate" :class="{active: isActive || isExactActive}" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { localeFilter } from '@/filters/locale.filter'
export default {
  props: ['isOpen'],
  setup() {
    return {
      links: [
        {title: localeFilter('Bill'), url: '/'},
        {title: localeFilter('History'), url: '/history'},
        {title: localeFilter('Planning'), url: '/planning'},
        {title: localeFilter('Record'), url: '/record'},
        {title: localeFilter('Categories'), url: '/categories'}
      ]
    }
  }
}
</script>
