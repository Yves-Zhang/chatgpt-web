<template>
  <label :for="labelFor" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
</template>

<script lang="ts">
import { toRefs } from 'vue'

interface labelProps {
  label?: string | number
  labelFor?: string | undefined
}

export default {
  props: [
    'label',
    'labelFor'
  ],
  setup(props: labelProps, ctx) {
    const { label, labelFor } = toRefs(props)

    return {
      label,
      labelFor
    }
  },
}
</script>