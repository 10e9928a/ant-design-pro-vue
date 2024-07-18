<script setup lang="ts">
import { useLayoutState } from '../../basic-layout/context'
const { layout, theme } = useLayoutState()
const prefixCls = shallowRef('ant-pro-global-header')
const cls = computed(() => ({
  [prefixCls.value]: true,
  [`${prefixCls.value}-layout-${layout.value}`]: !!layout.value,
  [`${prefixCls.value}-inverted`]: theme.value === 'inverted' && layout.value === 'top',
}))
</script>

<template>
  <div :class="cls">
    <div class="flex-1">
      <slot name="headerContent" />
    </div>
    <a-space align="center" flex-shrink-0>
      <slot name="headerActions" />
    </a-space>
  </div>
</template>

<style lang="less">
@import "./index.less";
</style>
