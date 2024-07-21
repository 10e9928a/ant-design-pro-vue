// 请求地址
export const IS_PROD = true

// 接口地址
export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || 'https://api.xxx.com'
}

// 用户token
export const USER_TOKEN = 'access_token'
