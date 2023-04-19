import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const authStore = useAuthStoreWithout()
    if (!authStore.session) {
      try {
        await authStore.getSession()
        next()
      }
      catch (error) {
        if (to.path !== '/login')
          next({ name: 'login' })
        else
          next()
      }
    }
    else {
      next()
    }
  })
}
