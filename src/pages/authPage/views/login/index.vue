<template>
  <div class="login-content flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        登录账号
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Vform :btnText="'登录'" />
      <p class="mt-6 text-center text-sm text-gray-500">
        没有账号?
        <RouterLink to="/register">
          <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            免费使用14天
          </span>
        </RouterLink>
      </p>
    </div>
    <VsocialLogin />
  </div>
</template>

<script lang="ts">
import VsocialLogin from '@/components/VsocialLogin/index.vue'
import VcheckBox from '@/components/VcheckBox/index.vue'
import { RouterLink, useRoute } from 'vue-router'
import Vform from '../../components/LoginForm.vue'

import './index.scss'

export default {
  components: {
    RouterLink,
    VsocialLogin,
    Vform,
    VcheckBox
  },
  setup(props: any) {
    const router = useRoute()
    console.log(router)

  }
}
</script>