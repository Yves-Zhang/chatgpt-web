<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        登录
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <Vlabel :labelFor="'user account'" :label="'用户账号 邮箱/手机号'" />
          <Vinput :id="'user account'" :name="'user account'" :type="'email'" :autocomplete="'email'" :required="true" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <Vlabel :labelFor="'password'" :label="'密码'" />
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</a>
            </div>
          </div>
          <Vinput :id="'password'" :name="'password'" :type="'password'" :autocomplete="'current-password'"
            :required="true" />
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">登录</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        没有账号?
        <RouterLink to="/register">
          <span class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            免费使用14天
          </span>
        </RouterLink>
      </p>
    </div>
    <div>
      <p class="mt-10 text-center text-sm text-gray-400">
        ———— 第三方登录 ————
      </p>
      <img :src="qq" alt="" />
      <img :src="wechat" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import Vlabel from '@/components/Vlabel.vue'
import Vinput from '@/components/Vinput.vue'
import { RouterLink } from 'vue-router'
import qq from '@/pages/authpage/images/qq.svg'
import wechat from '@/pages/authpage/images/wechat.svg'

export default {
  components: {
    Vlabel,
    Vinput,
    RouterLink
  },
  setup() {
    return {
      qq,
      wechat
    }
  }
}
</script>