import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader'
import tooltipDirective from '@/directives/tooltip.directive'
import Paginate from 'vuejs-paginate-next'

const firebaseConfig = {
  apiKey: "AIzaSyAn8s7xjMhCa0Gyh6Wn_Rk-X1IUfHRcYMU",
  authDomain: "vue-crm-b1e94.firebaseapp.com",
  projectId: "vue-crm-b1e94",
  storageBucket: "vue-crm-b1e94.appspot.com",
  messagingSenderId: "252954078631",
  appId: "1:252954078631:web:069c0877c19de28c1c5a82"
}

const fbApp = initializeApp(firebaseConfig)
const auth = getAuth(fbApp)
const database = getDatabase(fbApp)

let app
onAuthStateChanged(getAuth(), () => {
  if (!app) {
    app = createApp(App)
    app.directive('tooltip', tooltipDirective)
    app.component('Loader', Loader)
    app.component('Paginate', Paginate)
    app.use(store)
    app.use(router)
    app.mount('#app')
  }
})





