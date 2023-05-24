import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register/index.vue'),
      props: {
        pageName: '账号注册',
        pageType: 'register'
      }
    },
    {
      path: '/reset',
      name: 'reset',
      component: () => import('../views/register/index.vue'),
      props: {
        pageName: '重置密码',
        pageType: 'reset'
      }
    },
    {
      path: '/termsOfUse',
      name: 'termsOfUse',
      component: () => import('../views/termsOfUse/index.vue')
    },
  ]
})

export default router
