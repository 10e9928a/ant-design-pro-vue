import type { ExtractPropTypes, VNodeChild } from 'vue'
import { arrayType, booleanType, eventType, numberType, stringType } from '@v-c/utils'

export type MenuData = MenuDataItem[]

export interface MenuDataItem {
  // 标题
  title: string | (() => VNodeChild)
  // 图标
  icon?: string | (() => VNodeChild)
  // 地址
  path: string
  // 子集菜单
  children?: MenuDataItem[]
  // 同路由中的name，主要是用于保活的左右
  name?: string
  // 是否隐藏当前菜单
  hideInMenu?: boolean
  // 如果使用了隐藏，那么点击当前菜单的时候，可以使用父级的key
  parentKeys?: string[]
  // 是否套用iframe
  isIframe?: boolean
  // 如果当前是iframe的模式，需要有一个跳转的url支撑，其不能和path重复，path还是为路由
  url?: string
  // 是否存在面包屑
  hideInBreadcrumb?: boolean
  // 是否需要显示所有的子菜单
  hideChildrenInMenu?: boolean
  // 是否保活
  keepAlive?: boolean
  // 这里包含所有的父级元素
  matched?: MenuDataItem[]
  // 全连接跳转模式
  target?: '_blank' | '_self' | '_parent'
}

export interface MenuSelectEvent { item: any; key: string; selectedKeys: string[] }

const proLayoutEvents = {
  'onUpdate:openKeys': eventType<(val: string[]) => void>(),
  'onUpdate:selectedKeys': eventType<(val: string[]) => void>(),
  'onMenuSelect': eventType<(data: MenuSelectEvent) => void>(),
}

export const proLayoutProps = {
  logo: stringType(),
  title: stringType(),
  collapsed: booleanType<boolean>(false),
  collapsedWidth: numberType(48),
  menu: booleanType<boolean>(true),
  menuData: arrayType<MenuData>(),
  siderWidth: numberType(234),
  onCollapsed: eventType<(collapsed: boolean) => void>(),
  // 展开菜单
  openKeys: arrayType<string[]>(),
  // 选中菜单
  selectedKeys: arrayType<string[]>(),
  ...proLayoutEvents,
}

export type ProLayoutProps = Partial<ExtractPropTypes<typeof proLayoutProps>>
