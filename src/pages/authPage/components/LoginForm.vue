<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="user" label="用户账号（手机号）">
      <Vinput placeholder="请输入手机号" v-model:value="model.age" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item ref="password" first path="password" label="密码">
      <div class="flex items-center justify-between">
        <div class="text-sm absolute top-[-28px] right-0 cursor-pointer">
          <RouterLink to="/reset">
            <span class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码</span>
          </RouterLink>
        </div>
      </div>
      <Vinput placeholder="请输入手机验证码" v-model:value="model.reenteredPassword" @keydown.enter.prevent />
    </n-form-item>
    <n-form-item path="rCaptcha" label="验证码">
      <VgraphicCaptchaVue placeholder="请输入图片中的验证码" v-model:value="model.password" type="password"
        @input="handlePasswordInput" @keydown.enter.prevent />
    </n-form-item>

    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <button :disabled="model.age === null" round @click="handleValidateButtonClick"
            class="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ btnText }}
          </button>
        </div>
      </n-col>
    </n-row>
  </n-form>
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
  NRow
} from 'naive-ui'
import { RouterLink } from 'vue-router'

interface ModelType {
  age: string | null
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
    VgraphicCaptchaVue
  },
  setup(props: VformProps) {
    const { btnText } = toRefs(props)
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      age: null,
      password: null,
      reenteredPassword: null
    })
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
      age: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error('需要年龄')
            } else if (!/^\d*$/.test(value)) {
              return new Error('年龄应该为整数')
            } else if (Number(value) < 18) {
              return new Error('年龄应该超过十八岁')
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
      ]
    }
    return {
      btnText,
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
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('验证成功')
          } else {
            console.log(errors)
            message.error('验证失败')
          }
        })
      }
    }
  }
})
</script>