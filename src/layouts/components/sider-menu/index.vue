<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import type { CSSProperties } from 'vue'
import { useLayoutState } from '../../basic-layout/context'
import Menu from '../menu/index.vue'
const { collapsed, logo, title, collapsedWidth, siderWidth, handleCollapsed } = useLayoutState()

const siderStyle = computed<CSSProperties>(() => {
  return {
    overflow: 'hidden',
    transition: 'background-color 0.3s ease 0s, min-width 0.3s ease 0s, max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s',
  }
})
</script>

<template>
  <div
    :style="{
      width: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      maxWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      minWidth: collapsed ? `${collapsedWidth}px` : `${siderWidth}px`,
      ...siderStyle,
    }"
  />
  <a-layout-sider
    theme="dark"
    collapsible
    :trigger="null"
    :width="siderWidth"
    :style="siderStyle"
    :collapsed="collapsed"
    :collapsed-width="collapsedWidth"
    class="ant-pro-sider ant-pro-sider-fixed ant-pro-sider-layout-side"
  >
    <div class="ant-pro-sider-logo" :class="(collapsed) ? 'ant-pro-sider-collapsed' : ''">
      <a>
        <img :src="logo">
        <h1 v-if="!collapsed">{{ title }}</h1>
      </a>
    </div>
    <div class="flex-1 of-x-hidden of-y-auto">
      <Menu />
    </div>
    <div class="w-100% flex-shrink-0 ant-pro-sider-collapsed-button ant-pro-sider-collapsed-button-inverted">
      <a-menu
        theme="dark"
        mode="inline"
        :selectable="false"
        class="ant-pro-sider-menu"
        @click="handleCollapsed?.(!collapsed)"
      >
        <a-menu-item>
          <template #icon>
            <MenuFoldOutlined v-if="collapsed" />
            <MenuUnfoldOutlined v-else />
          </template>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<style lang="less">
@import "./index.less";
</style>
