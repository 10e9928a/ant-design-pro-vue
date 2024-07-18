<script setup lang="ts">
import { pick } from '@v-c/utils'
import BasicLayout from './basic-layout/index.vue'
import MultiTab from './multi-tab/index.vue'
const appStore = useAppStore()
const { layoutSetting } = storeToRefs(appStore)
const userStore = useUserStore()
const layoutMenu = useLayoutMenu()
const { selectedKeys, openKeys } = storeToRefs(layoutMenu)

const layoutProps = computed(() => pick(appStore.layoutSetting, ['fixedHeader', 'fixedSider', 'splitMenus', 'menuHeader', 'header', 'menu', 'layout', 'footer', 'contentWidth']))
</script>

<template>
  <BasicLayout
    v-bind="layoutProps"
    :collapsed="layoutSetting.collapsed"
    :theme="layoutSetting.theme"
    :menu-data="userStore.menuData"
    :selected-keys="selectedKeys"
    :open-keys="layoutSetting.layout === 'top' ? [] : openKeys"
    :copyright="layoutSetting.copyright"
    :logo="layoutSetting.logo"
    :title="layoutSetting.title"
    @update:open-keys="layoutMenu.handleOpenKeys"
    @update:selected-keys="layoutMenu.handleSelectedKeys"
    @update:collapsed="appStore.toggleCollapsed"
  >
    <template #headerActions>
      <UserAvatar />
    </template>

    <template #contentPrefix>
      <MultiTab v-if="layoutSetting.multiTab" />
    </template>

    <RouterView>
      <template #default="{ Component }">
        <component :is="Component" />
      </template>
    </RouterView>

  </BasicLayout>
</template>
