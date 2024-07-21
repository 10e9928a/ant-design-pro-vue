<script setup lang="ts">
import { useLayoutState } from '../../basic-layout/context'
import SubMenu from './sub-menu.vue'

const { collapsed, menuData, selectedKeys, openKeys, handleOpenKeys, handleSelectedKeys } = useLayoutState()
</script>

<template>
  <a-menu
    theme="dark"
    mode="inline"
    :open-keys="openKeys"
    :collapsed="collapsed"
    :selected-keys="selectedKeys"
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
