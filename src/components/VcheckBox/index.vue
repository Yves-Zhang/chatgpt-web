<template>
  <div :class="`flex items-center ${className}`">
    <label class="inline-flex items-center cursor-pointer">
      <input type="checkbox" class="form-checkbox h-4 w-4 !rounded !border !border-gray-100 cursor-pointer mr-2"
        :checked="checked" />
      <span v-if="label" class="text-xs text-black">{{ label }}</span>
    </label>

    <span class="text-xs text-black cursor-pointer">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { toRefs } from 'vue'

interface CheckBoxProps {
  label?: string
  checked?: boolean
  className?: string
}

export default {
  props: [
    'label',
    'checked',
    'className'
  ],
  setup(props: CheckBoxProps) {
    const _props = toRefs(props)
    return {
      ..._props
    }
  }
}
</script>
