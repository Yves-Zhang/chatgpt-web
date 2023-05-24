<template>
  <input :id="id" :name="name" :type="type" :autocomplete="autocomplete" :required="required" :placeholder="placeholder"
    class="border-boderColor border border-solid sm:border-0 px-4 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
    'required'
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