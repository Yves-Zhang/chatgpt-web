<template>
  <n-message-provider>
    <div class="appContent">
      <RouterView></RouterView>
    </div>
  </n-message-provider>
</template>
 
<script lang="ts">
import { RouterView } from 'vue-router'
import { NMessageProvider, useMessage } from 'naive-ui'
import "./app.scss";

export default {
  components: {
    RouterView,
    NMessageProvider
  }
}
</script>