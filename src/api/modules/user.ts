import request from '../request'

// 获取用户列表
export function handleApiUserList(data: Record<string, any>) {
  return request.post('/user/list', data)
}
