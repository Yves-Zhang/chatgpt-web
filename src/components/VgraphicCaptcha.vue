<template>
  <div class="flex justify-between">
    <input :id="id" :name="name" :type="type" :autocomplete="autocomplete" :required="required" :placeholder="placeholder"
      class="mr-2 px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
    <div
      class="px-4 block w-48 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex justify-center items-center">
      <!-- 验证码 div 的内容 -->
      <div class="text-sm">
        <span class="font-semibold text-indigo-600 hover:text-indigo-500">获取验证码</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue'

interface InputProps {
  id?: string | undefined
  name?: string | undefined
  type?: string | undefined
  autocomplete?: string | undefined
  required: any
  placeholder?: string
}

export default {
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