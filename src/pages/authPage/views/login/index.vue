<template>
  <div class="login-content flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        登录账号
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <Vlabel labelFor="user account" label="用户账号(手机号)" />
          <Vinput id="user account" name="user account" type="email" autocomplete="email" :required="true"
            placeholder="请输入手机号" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <Vlabel labelFor="password" label="密码" />
            <div class="text-sm">
              <RouterLink to="/reset">
                <span class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</span>
              </RouterLink>
            </div>
          </div>
          <Vinput id="password" name="password" type="password" autocomplete="current-password" :required="true"
            placeholder="请输入密码" />
        </div>

        <div>
          <div class="flex items-center justify-between">
            <Vlabel labelFor="captcha" label="验证码" />
            <!-- <div class="text-sm">
              <span class="font-semibold text-indigo-600 hover:text-indigo-500">获取验证码</span>
            </div> -->
          </div>
          <VgraphicCaptchaVue placeholder="请输入图片中的验证码" />
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">登录</button>

          <div class="flex justify-between mt-4">
            <VcheckBox>
              同意使用条款
            </VcheckBox>
            <VcheckBox label="记住账号" />
          </div>
        </div>
      </form>

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
import Vlabel from '@/components/Vlabel.vue'
import Vinput from '@/components/Vinput.vue'
import VsocialLogin from '@/components/VsocialLogin/index.vue'
import VgraphicCaptchaVue from '@/components/VgraphicCaptcha.vue'
import VcheckBox from '@/components/VcheckBox/index.vue'
import { RouterLink, useRoute } from 'vue-router'

import './index.scss'

export default {
  components: {
    RouterLink,
    VsocialLogin,
    Vlabel,
    Vinput,
    VgraphicCaptchaVue,
    VcheckBox
  },
  setup(props: any) {
    const router = useRoute()
    console.log(router)

  }
}
</script>