<template>
  <div class="appContent">
    <div>{{ title }}</div>
    <div>{{ count }}</div>
    <div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="handleClick">按钮</div>
  </div>
</template>
 
<script lang="ts">
import { ref } from "vue";
import "./app.scss";

export default {
  setup() {
    const title = ref('hello')
    const count = ref(0)

    const handleClick = () => {
      count.value++
    }

    return {
      title,
      count,
      handleClick
    }
  }
}
</script>