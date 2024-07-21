<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons-vue'
const multiTabStore = useMultiTab()
const { list, activeKey } = storeToRefs(multiTabStore)
const { layoutSetting } = storeToRefs(useAppStore())
const tabStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (layoutSetting.value.multiTabFixed) {
    style.position = 'fixed'
    style.top = '48px'
    style.zIndex = 1
  }
  return style
})
const tabsRef = shallowRef()
const { height } = useElementSize(tabsRef)
</script>

<template>
  <div v-if="layoutSetting.multiTabFixed" :style="{ height: `${height + 10}px` }" />
  <a-tabs
    type="card"
    ref="tabsRef"
    :style="tabStyle"
    :tab-bar-gutter="5"
    :active-key="activeKey"
    class="bg-white dark:bg-#242525 w-100% pt-10px"
    @update:active-key="multiTabStore.switchTab"
  >
    <a-tab-pane v-for="item in list" :key="item.fullPath">
      <template #tab>
        {{ item.title }}
        <button v-if="activeKey === item.fullPath" class="ant-tabs-tab-remove" style="margin: 0;" @click.stop="multiTabStore.refresh(item.fullPath)">
          <ReloadOutlined :spin="item.loading" />
        </button>
        <button v-if="!item.affix && list.length > 1" class="ant-tabs-tab-remove" style="margin: 0;" @click.stop="multiTabStore.close(item.fullPath)">
          <CloseOutlined />
        </button>
      </template>
    </a-tab-pane>
    <template #leftExtra>
      <div class="w-12px" />
    </template>
    <template #rightExtra>
      <div class="w-24px" />
    </template>
  </a-tabs>
</template>
