<template>
  <label class="inline-flex items-center mt-4 cursor-pointer">
    <input type="checkbox" class="form-checkbox h-5 w-5 !rounded !border !border-gray-100 cursor-pointer" :checked="checked" />
    <span class="ml-2 text-xs text-black">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { toRefs } from 'vue'

interface CheckBoxProps {
  label: string
  checked?: boolean
}

export default {
  props: [
    'label',
    'checked'
  ],
  setup(props: CheckBoxProps) {
    const _props = toRefs(props)
    return {
      ..._props
    }
  }
}
</script>
