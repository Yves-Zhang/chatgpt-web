<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="phone" label="用户账号（手机号）">
      <Vinput placeholder="请输入手机号" v-model:value="model.phone" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item ref="password" first path="password" label="密码">
      <div class="flex items-center justify-between">
        <div class="text-sm absolute top-[-28px] right-0 cursor-pointer">
          <RouterLink to="/reset">
            <span class="font-semibold text-indigo-600 hover:text-bg-blue-500">忘记密码</span>
          </RouterLink>
        </div>
      </div>
      <Vinput placeholder="请输入登录密码" v-model:value="model.password" @keydown.enter.prevent type="password" show-password-on="mousedown" />
    </n-form-item>
    <!-- <n-form-item path="rCaptcha" label="验证码">
      <VgraphicCaptchaVue placeholder="请输入图片中的验证码" v-model:value="model.password" type="password"
        @input="handlePasswordInput" @keydown.enter.prevent />
    </n-form-item> -->

    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <button :disabled="model.phone === null || model.password === null" round @click="getCaptcha"
            class="cursor-pointer flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50">
            {{ btnText }}
          </button>
        </div>
      </n-col>
    </n-row>
  </n-form>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="请验证">
    <div class="flex flex-col md:flex-row gap-4 mt-4 mb-4">
      <div class="w-full md:w-1/2 h-64 h-auto md:order-0 order-1">
        <Vinput placeholder="请输入验证码" v-model:value="verificationImgCode" @keydown.enter.prevent />
      </div>
      <div class="w-full md:w-1/2 h-64 h-auto md:order-1 order-0">
        <img class="cursor-pointer" :src="Img" alt="" @click="getCaptcha">
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end">
      <button :disabled="!onPositiveClick" round @click="onPositiveClick"
        class="cursor-pointer flex w-full justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        确定
      </button>
    </div>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import Vinput from '@/components/Vinput.vue'
import VgraphicCaptchaVue from '@/components/VgraphicCaptcha.vue'
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
  NButton,
  NForm,
  NFormItem,
  NCol,
  NRow,
  NModal
} from 'naive-ui'
import { RouterLink } from 'vue-router'
import { getCaptcha_http, login_http } from '../http/authHttp'
import { debounce, loginAfter, setCrossSubdomainCookie } from '@/utils/tool'

interface ModelType {
  phone: string | null
  password: string | null
  reenteredPassword: string | null
}

interface VformProps {
  btnText?: string
}

export default defineComponent({
  props: ['btnText'],
  components: {
    NButton,
    NForm,
    NFormItem,
    NCol,
    NRow,
    Vinput,
    VgraphicCaptchaVue,
    NModal
  },
  setup(props: VformProps) {
    const showModal = ref(false)
    const verificationImgCode = ref<string | null>(null)
    const Img = ref<string | undefined>(undefined)
    const { btnText } = toRefs(props)
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      phone: null,
      password: null,
      reenteredPassword: null
    })

    // 验证码弹窗 确认
    const onPositiveClick = async (e: MouseEvent) => {
      e.preventDefault()
      if (!verificationImgCode.value) {
        message.error('请输入验证码')
        return
      }

      await handleValidateButtonClick()
    }

    const rules: FormRules = {
      phone: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('请输入手机号')
            } else if (!/^1[3-9]\d{9}$/.test(value)) {
              return new Error('请输入正确的手机号')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
    }

    async function handleValidateButtonClick() {
      const res: any = await login_http({
        phone: modelRef.value.phone,
        password: modelRef.value.password,
        text: verificationImgCode.value
      })

      showModal.value = false

      if (res.code === 'success') {
        message.success('登录成功')
        loginAfter(res)
      } else {
        message.error(res.msg || '登录失败')
      }
    }

    const getCaptcha = debounce(() => {
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          showModal.value = true
          // LOGIN==1 REGISTER==2 UPDATE_PASSWORD==3
          getCaptcha_http({
            phone: modelRef.value.phone,
            type: 1
          }).then((res: any) => {
            if (res.code === 'success') {
              Img.value = res.data.img
            } else {
              message.error(res.msg || '获取验证码失败,请稍后重试')
            }
          }).catch((err: any) => {
            message.error(err.msg || '获取验证码失败,请稍后重试')
          })
        } else {
          console.log(errors)
          message.error('请检查输入是否正确')
        }
      })
    })

    return {
      Img,
      showModal,
      btnText,
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      onPositiveClick,
      getCaptcha,
      verificationImgCode
    }
  }
})
</script>