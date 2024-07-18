<script setup lang="ts">
import { useLayoutState } from '../../basic-layout/context'
import SubMenu from './sub-menu.vue'

const { theme, collapsed, layout, menuData, selectedKeys, openKeys, handleOpenKeys, handleSelectedKeys } = useLayoutState()
const menuTheme = computed(() => {
  if (theme.value === 'inverted')
    return 'dark'
  return theme.value
})
</script>

<template>
  <a-menu
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
    :mode="(layout === 'top') ? 'horizontal' : 'inline'"
    :theme="menuTheme"
    :collapsed="collapsed"
    class="ant-pro-sider-menu"
    @update:openKeys="handleOpenKeys"
    @update:selectedKeys="handleSelectedKeys"

  >
    <template v-for="item in menuData" :key="item.path">
      <template v-if="!item.hideInMenu">
        <SubMenu :item="item" />
      </template>
    </template>
  </a-menu>
</template>
