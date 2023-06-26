<template>
  <div class="flex justify-between">
    <Vinput :placeholder="placeholder" />
    <div
      class="ml-2 px-4 block w-48 rounded-md border-boderColor border border-solid sm:border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex justify-center items-center cursor-pointer">
      <!-- 验证码 div 的内容 -->
      <div class="text-sm">
        <span class="font-semibold text-indigo-600 hover:text-bg-blue-500">获取验证码</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue'
import Vinput from './Vinput.vue'

interface InputProps {
  id?: string | undefined
  name?: string | undefined
  type?: string | undefined
  autocomplete?: string | undefined
  required: any
  placeholder?: string
}

export default {
  components:{
    Vinput
  },
  props: [
    'id',
    'name',
    'type',
    'autocomplete',
    'required',
    'placeholder'
  ],
  setup(props: InputProps, ctx) {
    const { id, name, type, autocomplete, required, placeholder } = toRefs(props)
    return {
      id,
      name,
      type,
      autocomplete,
      required,
      placeholder
    }
  }
}
</script>