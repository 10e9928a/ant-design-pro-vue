import { usePost } from '@/utils/request'

// 获取用户列表
export function handleApiUserList(data: Record<string, any>) {
  return usePost('/user/list', data)
}
