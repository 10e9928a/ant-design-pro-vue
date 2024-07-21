// 接口返回类型
export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  count: number
}
