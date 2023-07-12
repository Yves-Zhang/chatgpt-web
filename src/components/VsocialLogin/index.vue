<template>
  <div class="social-login">
    <p class="mt-8 text-center text-sm text-gray-400">
      ———— 使用微信登录 ————
    </p>
    <div class="flex justify-center items-center">
      <div v-for="(item, index) in images" :key="index" @click="item.onClick"
        class="mx-2 w-10 h-10 rounded-full border border-gray-400 my-5 cursor-pointer hover:bg-gray-100"
        :class="`logo-${item.name}`">
      </div>
    </div>
  </div>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog">
    <div class="w-full tify-center items-center h-[400px]">
      <iframe class="w-full tify-center items-center h-full"
        src="https://open.weixin.qq.com/connect/qrconnect?appid=wx12b42dfa93930821&redirect_uri=https%3A%2F%2Fai.koudingtu.com&response_type=code&scope=snsapi_login"
        frameborder="0"></iframe>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import {
  NModal, useMessage
} from 'naive-ui'
import { getUrlParams, loginAfter, removeUrlParameter } from "@/utils/tool";
import './index.scss'
import { wxLogin_http } from '@/pages/authPage/http/authHttp';

const params = getUrlParams()
export default {
  components: {
    NModal
  },
  setup() {
    const message = useMessage()

    async function login() {
      const res: any = await wxLogin_http({
        wxCode: code
      });

      if (res.code === 'success') {
        message.success('登录成功');
        loginAfter(res);
      } else {
        message.error(res.msg || '登录失败');
      }
      removeUrlParameter('code');
    }


    const { code } = params

    if (code) {
      login();
    }

    const showModal = ref<boolean>(false)
    const wxDiv = ref<HTMLElement | null>(null)
    const images = reactive([
      {
        name: 'wechat',
        onClick: () => {
          showModal.value = true
        }
      }
    ])

    return {
      images,
      showModal,
      wxDiv
    }
  }
}
</script>