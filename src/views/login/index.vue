<script setup lang='ts'>
import { computed, ref } from 'vue'
import {
  NButton, NCheckbox, NInput, NSpace, useMessage,
} from 'naive-ui'
// import { fetchVerify } from '@/api'
import { useAuthStore } from '@/store'
// 使用import语句导入SVG文件
import ChatIcon from '@/assets/chat.svg'
import { enCrypto } from '@/utils/crypto'
import { fetchLogin } from '@/api'

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')
const keepKey = ref(true)
const chatIcon = ChatIcon

const disabled = computed(() => !token.value.trim() || loading.value)

async function handleVerify() {
  const secretKey = token.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    // 先对 密钥 加密
    const encodeKey = enCrypto(secretKey)
    const res = await fetchLogin({ key: encodeKey })
    // console.log(res, 999)

    // await fetchVerify(secretKey)
    // authStore.setToken(secretKey)
    // ms.success('success')
    // window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <div class="p-10 mt-10 bg-white rounded dark:bg-slate-800 w-[500px] m-auto">
    <div class="space-y-4">
      <header class="space-y-2">
        <p class="text-xl font-bold text-center text-slate-500 dark:text-neutral-200">
          <img :src="chatIcon" alt="" class="w-16 inline-block mr-2"> <span class="bottom-0"> 请填写openai key</span>
        </p>
        <!-- <p class="text-base text-center text-slate-500 dark:text-slate-500">
                            {{ $t('common.unauthorizedTips') }}
                          </p> -->
        <!-- <Icon403 class="w-[200px] m-auto" /> -->
      </header>
      <NInput v-model:value="token" type="password" placeholder="" @keypress="handlePress" />
      <NSpace item-style="display: flex;" align="center">
        <NCheckbox v-model:checked="keepKey" size="small">
          <span class="text-l font-bold text-center text-slate-500 dark:text-neutral-200">
            记住key
          </span>
        </NCheckbox>
      </NSpace>
      <NButton block type="primary" :disabled="disabled" :loading="loading" @click="handleVerify">
        {{ $t('common.verify') }}
      </NButton>
    </div>
  </div>
</template>
