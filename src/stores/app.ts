import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'
import { theme as antdTheme } from 'ant-design-vue/es'
import defaultSetting from '~@/config/default-setting'

export interface LayoutSetting {
  title?: string
  logo?: string
  collapsed: boolean
  colorPrimary?: string
  multiTab?: boolean
  multiTabFixed?: boolean
}

export const useAppStore = defineStore('app', () => {
  const layoutSetting = reactive<LayoutSetting>(defaultSetting)
  const themeConfig = reactive<ThemeConfig>({
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorBgContainer: '#fff',
      colorPrimary: layoutSetting.colorPrimary,
    },
    components: {},
  })

  const toggleColorPrimary = (color: string) => {
    layoutSetting.colorPrimary = color
    if (themeConfig.token)
      themeConfig.token.colorPrimary = color
  }

  const toggleCollapsed = (collapsed: boolean) => {
    layoutSetting.collapsed = collapsed
  }

  return {
    layoutSetting,
    theme: themeConfig,
    toggleCollapsed,
    toggleColorPrimary,
  }
})
