<template>
  <div class="social-login">
    <p class="mt-8 text-center text-sm text-gray-400">
      ———— 使用微信、QQ登录 ————
    </p>
    <div class="flex justify-center items-center">
      <div v-for="(item, index) in images" :key="index"
        class="mx-2 w-10 h-10 rounded-full border border-gray-400 my-5 cursor-pointer hover:bg-gray-100" :class="`logo-${item.name}`">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'

import './index.scss'

export default {
  setup() {
    const images = reactive([
      {
        name: 'qq',
      },
      {
        name: 'wechat',
      }
    ])
    return {
      images
    }
  }
}
</script>