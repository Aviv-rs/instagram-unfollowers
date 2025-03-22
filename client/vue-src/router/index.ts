import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Base configuration
const baseUrl = import.meta.env.BASE_URL || '/'

// Routes configuration
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Instagram Unfollowers Tracker' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'Page Not Found' }
  }
]

// Router instance
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update page title
router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (title) {
    document.title = `${title} - Unfollower Tracker`
  }
  next()
})

export default router