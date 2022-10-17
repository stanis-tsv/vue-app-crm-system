import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'
import NotFound from '@/views/NotFound'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'empty',
      auth: false     
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty',
      auth: false     
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Categories.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/History.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main',
      auth: true
    },
    component: () => import('@/views/Record.vue')
  },
  {
    path: '/:notFound(.*)', 
    component: () => import('@/views/NotFound.vue')
  }
]





const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.auth
  const user = getAuth().currentUser
  if (requireAuth && !user) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
