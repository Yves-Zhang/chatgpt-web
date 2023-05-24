<template>
  <div class="container mx-auto p-8" v-if="termsList">
    <h1 class="text-xl font-bold mb-8">{{ termsList.title }}</h1>
    <div>
      <p class="mb-2">{{ termsList.constent }}</p>
      <div class="mt-2" v-for="item, index in termsList.term" :key="index">
        <p class="font-semibold">
          {{ item.title }}
        </p>
        <p class="indent-8">
          {{ item.content }}
        </p>
      </div>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <button @click="goBack"
        class="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm mt-2d leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        返回
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import terms from '@/assast/terms.json'
import { ref } from 'vue'
export default {
  name: 'TermsOfUse',
  setup() {
    const termsList = ref(terms)
    const goBack = () => {
      history.back();
    }
    return {
      termsList,
      goBack
    }
  }
}
</script>