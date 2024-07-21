<script setup lang="ts">
import { useAnalysis } from './hooks/useAnalysis'

const {
  isLoading,
  openNotification,
  onOpenLik,
  getUserList,
} = useAnalysis()
</script>

<template>
  <div p-2>
    <a-button @click="openNotification">
      通知
    </a-button>
    <a-button class="ml-2" :loading="isLoading" @click="getUserList">
      接口请求
    </a-button>
    <a-button class="ml-2" @click="onOpenLik('111')">
      按钮1
    </a-button>
  </div>
</template>
