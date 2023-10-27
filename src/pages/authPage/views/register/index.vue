<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {{ pageName }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Vform :btnText="pageType === 'reset' ? '重置' : '注册账号'" :pageType="pageType" />
      <p class="mt-6 text-center text-sm text-gray-500" v-if="pageType === 'register'">
        已有账号?
        <RouterLink :to="{ path: '/', query: router.query }">
          <span class="font-semibold leading-6 text-indigo-600 hover:text-bg-blue-500">
            登录你的账号
          </span>
        </RouterLink>
      </p>

      <p class="mt-6 text-center text-sm text-gray-500" v-if="pageType === 'reset'">
        <RouterLink :to="{ path: '/', query: router.query }">
          <span class="font-semibold leading-6 text-indigo-600 hover:text-bg-blue-500">
            返回登录
          </span>
        </RouterLink>
      </p>
    </div>
    <VsocialLogin v-if="pageType === 'register'" />
  </div>
</template>

<script lang="ts">
import VsocialLogin from '@/components/VsocialLogin/index.vue'
import Vform from '../../components/RegisterForm.vue'
import { toRefs } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

interface PageProps {
  pageName?: string
  pageType?: string
}

export default {
  props: ['pageName', 'pageType'],
  components: {
    VsocialLogin,
    Vform,
    RouterLink
  },
  setup(props: PageProps) {
    const { pageName, pageType } = toRefs(props)
    const router = useRoute()

    return {
      pageName,
      pageType,
      router
    }
  }
}
</script>