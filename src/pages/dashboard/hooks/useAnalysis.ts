import { notification } from 'ant-design-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { handleApiUserList } from '@/api/modules/user'

export const useAnalysis = () => {
  const isLoading = ref(false)
  const openNotification = () => {
    notification.info({
      message: '测试',
      description: '测试的内容',
      placement: 'topLeft',
      duration: 0,
    })
  }

  const router = useRouter()
  const onOpenFormEdit = (id: string) => {
    router.push({
      path: '/form/edit',
      query: {
        id,
      },
    })
  }

  // 请求接口
  const getUserList = async () => {
    try {
      isLoading.value = true
      const res = await handleApiUserList({})
      console.log('res', res)
    }
    catch (error) {
      console.log('error', error)
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    openNotification,
    onOpenFormEdit,
    getUserList,
  }
}
