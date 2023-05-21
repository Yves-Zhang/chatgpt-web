<template>
  <div class="appContent">
    <div>{{ title }}</div>
    <div>{{ count }}</div>
    <div class="btn" @click="handleClick">按钮</div>
  </div>
</template>
 
<script lang="ts">
import { ref } from "vue";
import "./app.scss";

export default {
  setup() {
    const title = ref("hello")
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