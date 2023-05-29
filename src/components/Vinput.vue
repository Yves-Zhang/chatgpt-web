<template>
  <n-input v-bind="$attrs" v-on="$attrs" class="rounded-md shadow-sm"
    style="--n-border-hover: 1px solid #3b82f680;--n-border-focus:1px solid #87A1FA;--n-caret-color:1px solid #87A1FA">
    <slot></slot>
  </n-input>
</template>
<script lang="ts">
import { NInput } from 'naive-ui'

export default {
  components: {
    NInput
  }
}
</script>