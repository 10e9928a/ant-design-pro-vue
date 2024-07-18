<script setup lang="ts">
import Header from '../components/header/index.vue'
import SiderMenu from '../components/sider-menu/index.vue'
import Menu from '../components/menu/index.vue'
import { proLayoutProps } from './typing'
import { useLayoutProvider } from './context'
const props = defineProps(proLayoutProps)
const emit = defineEmits(['update:collapsed'])

/**
 * 处理展开收起的事件参数
 * @param collapsed 展开收起的事件参数
 */
const handleCollapsed = (collapsed: boolean) => {
  emit('update:collapsed', collapsed)
  props?.onCollapsed?.(collapsed)
}

// 依赖注入所有的配置项，对属性进行控制，减少传值
useLayoutProvider(props, {
  handleCollapsed,
})

// 自定义容器的宽高
const contentCls = computed(() => {
  const cls: string[] = [
    'h-full flex flex-col flex-1',
  ]
  if (props.contentWidth === 'Fluid')
    cls.push('w-full')

  else if (props.contentWidth === 'Fixed')
    cls.push(...['max-w-1200px', 'mx-auto'])

  return cls
})
</script>

<template>
  <div class="ant-pro-basicLayout" :data-theme="theme">
    <a-layout>
      <template v-if="menu">
        <SiderMenu v-if="layout !== 'top'" />
      </template>
      <a-layout>
        <template v-if="header">
          <Header>
            <template v-if="$slots.headerActions" #headerActions>
              <slot name="headerActions" />
            </template>
          </Header>
        </template>
        <slot name="contentPrefix" />
        <a-layout-content ref="layoutRef" class="ant-pro-basicLayout-content" flex flex-col>
          <div :class="contentCls">
            <slot />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="less">
@import './index.less';
</style>
