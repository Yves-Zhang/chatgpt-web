import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/termsOfUse/index.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import('../views/termsOfService/index.vue')
    },
  ]
})

export default router
