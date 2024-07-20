import { runEvent } from '@v-c/utils'
import type { MenuSelectEvent, ProLayoutProps } from './typing'

export interface ProLayoutProviderMethods {
  handleCollapsed?: (collapsed: boolean) => void
}

const layoutStateFunc = (props: ProLayoutProps, methods: ProLayoutProviderMethods = {}) => {
  const logo = computed(() => props.logo)
  const title = computed(() => props.title)
  const collapsedWidth = computed(() => props.collapsedWidth)
  const siderWidth = computed(() => props.siderWidth)
  const menuData = computed(() => props.menuData)
  const collapsed = computed(() => props.collapsed)
  const menu = computed(() => props.menu)

  /**
   * 菜单选中处理
   */
  const openKeys = computed(() => props.openKeys)
  const selectedKeys = computed(() => props.selectedKeys)
  const handleOpenKeys = (val: string[]) => {
    runEvent(props['onUpdate:openKeys'], val)
  }

  const handleSelectedKeys = (val: string[]) => {
    runEvent(props['onUpdate:selectedKeys'], val)
  }

  const handleMenuSelect = (data: MenuSelectEvent) => {
    runEvent(props.onMenuSelect, data)
  }

  return {
    logo,
    title,
    collapsed,
    collapsedWidth,
    menuData,
    siderWidth,
    menu,
    openKeys,
    handleOpenKeys,
    selectedKeys,
    handleSelectedKeys,
    handleMenuSelect,
    ...methods,
  }
}

const [useLayoutProvider, useLayoutInject] = createInjectionState(layoutStateFunc)

export {
  useLayoutProvider,
}

export const useLayoutState = (): ReturnType<typeof layoutStateFunc> => useLayoutInject()!
