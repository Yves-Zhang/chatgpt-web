import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/termsOfUse',
      name: 'termsOfUse',
      component: () => import('../views/termsOfUse/index.vue')
    },
  ]
})

export default router
