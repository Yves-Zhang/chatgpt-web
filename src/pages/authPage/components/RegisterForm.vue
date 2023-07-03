<!-- 
"age": 0,
"code": "string",
"email": "string",
"name": "string",
"password": "string",
"phone": "string",
"verificationCode": "string" -->
<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="phone" label="手机号">
      <Vinput placeholder="请输入手机号" v-model:value="model.phone" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="password" label="密码">
      <Vinput placeholder="请设置密码" v-model:value="model.password" type="password" @input="handlePasswordInput"
        @keydown.enter.prevent show-password-on="mousedown" />
    </n-form-item>
    <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
      <Vinput placeholder="请再次确认密码" v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
        @keydown.enter.prevent show-password-on="mousedown" />
    </n-form-item>
    <n-form-item ref="rCaptcha" first path="captcha" label="手机验证码">
      <div class="flex items-center justify-between">
        <div class="text-sm absolute top-[-28px] right-0 cursor-pointer">
          <span class="font-semibold text-indigo-600 hover:text-bg-blue-500" @click="getCaptcha">获取验证码</span>
        </div>
      </div>
      <Vinput placeholder="请输入手机验证码" v-model:value="model.verificationCode" @keydown.enter.prevent />
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <button
            :disabled="model.reenteredPassword === null || model.password === null || model.phone === null || model.verificationCode === null"
            round @click="handleValidateButtonClick"
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

import { getCaptcha_http, register_http, resetPassword_http, sendVerify_http } from '../http/authHttp'
import { debounce } from '@/utils/tool'
import { useRouter } from 'vue-router'

interface ModelType {
  phone: string | null
  password: string | null
  reenteredPassword: string | null
  verificationCode: string | null
}

interface VformProps {
  btnText?: string
  pageType: 'reset' | 'register'
}

export default defineComponent({
  props: ['btnText', 'pageType'],
  components: {
    NButton,
    NForm,
    NFormItem,
    NCol,
    NRow,
    Vinput,
    NModal
  },
  setup(props: VformProps) {
    const { btnText, pageType } = toRefs(props)
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      phone: null,
      password: null,
      reenteredPassword: null,
      verificationCode: null
    })
    const showModal = ref(false)
    const verificationImgCode = ref<string | null>(null)
    const Img = ref<string | undefined>(undefined)
    const router = useRouter();
    // 验证码弹窗 确认
    const onPositiveClick = async () => {
      if (!verificationImgCode.value) {
        message.error('请输入验证码')
        return
      }

      try {
        const res: any = await sendVerify_http({
          phone: modelRef.value.phone,
          text: verificationImgCode.value,
          type: pageType.value === 'register' ? 2 : 3
        })
        if (res.code === 'success') {
          message.success('手机验证码已发送成功，请查收。')
        }

        if (res.code === 'error') {
          message.error(res.msg || '手机验证码发送失败，请重试。')
        }
        showModal.value = false
      } catch (e: any) {
        message.error(e.msg || '手机验证码发送失败，请重试。')
      }
    }

    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password
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
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('请输入密码')
            } else if (!/^[0-9a-zA-Z_]{6,8}$/.test(value)) {
              return new Error('密码6到8位数，由数字字母下划线组成')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
      ],
      verificationCode: [{ required: true, message: '请输入验证码' }]
    }

    const getCaptcha = debounce(() => {
      if (!modelRef.value.phone) {
        message.error('手机号不能为空')
        return
      }
      showModal.value = true
      // LOGIN==1 REGISTER==2 UPDATE_PASSWORD==3
      getCaptcha_http({
        phone: modelRef.value.phone,
        type: pageType.value === 'register' ? 2 : 3
      }).then((res: any) => {
        if (res.code === 'success') {
          Img.value = res.data.img
        } else {
          message.error(res.msg || '获取验证码失败,请稍后重试')
        }
      }).catch((err: any) => {
        message.error(err.msg || '获取验证码失败,请检查手机号')
      })
    })


    return {
      btnText,
      pageType,
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate(async (errors) => {
          if (!errors) {
            try {
              let res: any
              if (pageType.value === 'register') {
                res = await register_http({
                  "code": modelRef.value.verificationCode,
                  "name": modelRef.value.phone,
                  "password": modelRef.value.password,
                  "phone": modelRef.value.phone,
                })
              }

              if (pageType.value === 'reset') {
                res = await resetPassword_http({
                  "code": modelRef.value.verificationCode,
                  "password": modelRef.value.password,
                  "phone": modelRef.value.phone,
                })
              }

              const errorMsg = pageType.value === 'register' ? '注册失败，请检查输入' : '重置密码失败，请检查输入'
              const successMsg = pageType.value === 'register' ? '注册成功' : '重置密码成功'

              if (res.code === 'error') {
                message.error(res.msg || errorMsg)
                return
              }

              message.success(successMsg)
              // 返回登录页
              setTimeout(() => {
                router.push('/login');
              }, 1000)
            } catch (e: any) {
              const errorMsg = pageType.value === 'register' ? '注册失败，请检查输入' : '重置密码失败，请检查输入'
              message.error(e.msg || errorMsg)
              return
            }
          } else {
            message.error('请检查输入')
          }
        })
      },
      getCaptcha,
      showModal,
      onPositiveClick,
      verificationImgCode,
      Img
    }
  }
})
</script>