import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Germán Riveros | Inicio',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Germán Riveros | About',
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Germán Riveros | Página No Encontrada',
      },
    },
  ],
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'Germán Riveros' // título por defecto
  }
})

export default router
