<template>
  <n-message-provider>
    <div class="appContent">
      <RouterView></RouterView>
    </div>
  </n-message-provider>
</template>
 
<script lang="ts">
import { ref } from "vue";
import Vinput from "@/components/Vinput.vue";
import Vlabel from "@/components/Vlabel.vue";
import logo from '@/pages/authPage/images/logo.svg'
import { RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'
import "./app.scss";

export default {
  components: {
    RouterView,
    Vinput,
    Vlabel,
    NMessageProvider
  },
  setup() {
    const title = ref('hello')
    const count = ref(0)
    const logoSrc = ref(logo)

    const handleClick = () => {
      count.value++
    }

    return {
      title,
      count,
      handleClick,
      logoSrc
    }
  }
}
</script>