import { useRouter } from 'vue-router'

export const useError = () => {
  const router = useRouter()
  const handleBack = () => {
    router.replace({
      path: '/',
    })
  }

  return {
    handleBack,
  }
}
