import { createRouter, createWebHistory } from 'vue-router'
import AgendamentosView from '../views/AgendamentosView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/agendamentos'
  },
  {
    path: '/agendamentos',
    name: 'agendamentos',
    component: AgendamentosView,
    meta: {
      title: 'Agendamentos Cirúrgicos',
      requiresAuth: false
    }
  },
  {
    // Rota catch-all para 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/agendamentos'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Comportamento de scroll ao navegar
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard para atualizar título da página
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Fin-X`
  }
  next()
})

export default router
