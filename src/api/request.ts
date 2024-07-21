import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { message } from 'ant-design-vue'
import type { ApiResponse } from '@/config'
import { USER_TOKEN, getApiUrl } from '@/config'

class RequestClient {
  private isShowErrorModal = false

  constructor() {
    // Set the base URL for all requests
    axios.defaults.baseURL = getApiUrl()
    console.log('baseURL', axios.defaults.baseURL)

    // Add response interceptors for handling success and error responses
    axios.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse,
    )
  }

  // Show error modal with the given text
  private showErrorModal(text: string): void {
    if (!this.isShowErrorModal) {
      this.isShowErrorModal = true
      message.error(text || '请求异常，请稍后再试！')
      setTimeout(() => {
        this.isShowErrorModal = false
      }, 1000)
    }
  }

  // Add token to request config if user token is available
  private handleAddTokenToConfig(
    config: AxiosRequestConfig = {},
  ): AxiosRequestConfig {
    const token = localStorage.getItem(USER_TOKEN)
    if (token) {
      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    }
    return config
  }

  // Handle successful responses
  private handleSuccessResponse = (
    response: AxiosResponse<ApiResponse<any>>,
  ): AxiosResponse<ApiResponse<any>> => {
    console.log('===============请求成功================')
    console.log('请求结果：', response.data)
    console.log('===============请求成功================')
    const { code = 0, message = '' } = response.data
    if (code === -1 && message)
      this.showErrorModal(message)

    return response
  }

  // Handle error responses
  private handleErrorResponse = (
    error: AxiosError<ApiResponse<any>>,
  ): Promise<never> => {
    if (error.response) {
      const { status, data } = error.response
      console.log('请求异常：', status, data)
      // Handle different error scenarios based on status code
      switch (status) {
        case 400:
          this.showErrorModal('请求错误')
          break
        case 401:
        case 403:
          this.showErrorModal('登录态失效，请重新登录')
          setTimeout(() => {
            window.location.href = `${window.location.origin}/login`
          }, 1000)
          break
        case 500:
          this.showErrorModal(data.message || '服务器异常')
          break
        default:
          this.showErrorModal('服务器异常')
      }
    }
    else if (error.request) {
      this.showErrorModal('请求异常，请稍后再试！')
    }
    else {
      this.showErrorModal('网络异常，请稍后再试！')
    }

    return Promise.reject(error)
  }

  async get<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    if (data) {
      const params = new URLSearchParams(data)
      url += `?${params.toString()}`
    }
    config = this.handleAddTokenToConfig(config)
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(
      url,
      config,
    )
    return response.data
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    config = this.handleAddTokenToConfig(config)
    const response: AxiosResponse<ApiResponse<T>> = await axios.post(
      url,
      data,
      config,
    )
    return response.data
  }

  // Perform an upload request
  async upload<T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    config = this.handleAddTokenToConfig(config)
    const response: AxiosResponse<ApiResponse<T>> = await axios.post(
      url,
      formData,
      {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
      },
    )
    return response.data
  }
}

// Export an instance of the RequestClient class
export default new RequestClient()
