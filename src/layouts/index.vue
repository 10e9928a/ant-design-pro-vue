<script setup lang="ts">
import BasicLayout from './basic-layout/index.vue'
import MultiTab from './multi-tab/index.vue'
const appStore = useAppStore()
const userStore = useUserStore()
const layoutMenu = useLayoutMenu()
const { layoutSetting } = storeToRefs(appStore)
const { selectedKeys, openKeys } = storeToRefs(layoutMenu)
const layoutProps = appStore.layoutSetting
</script>

<template>
  <BasicLayout
    v-bind="layoutProps"
    :collapsed="layoutSetting.collapsed"
    :menu-data="userStore.menuData"
    :selected-keys="selectedKeys"
    :open-keys="openKeys"
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
