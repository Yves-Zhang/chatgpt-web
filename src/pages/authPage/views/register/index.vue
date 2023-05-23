<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        注册账号
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
            <Vlabel :labelFor="'password'" :label="'设置密码'" />
          </div>
          <Vinput :id="'password'" :name="'password'" :type="'password'" :autocomplete="'current-password'"
            :required="true" />
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">注册账号</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        已有账号?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">登录你的账号</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vlabel from '@/components/Vlabel.vue'
import Vinput from '@/components/Vinput.vue'

export default {
  components: {
    Vlabel,
    Vinput
  },
  setup() {
    console.log('hello')



  }
}
</script>