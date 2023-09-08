import axios, { type Method } from 'axios'

const baseURL = 'https://test-h5-api.ixook.com'
const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => Promise.reject(err)
)
type Data<T> = {
  code: number
  message: string
  data: T
}
// 4. 请求工具函数
const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
//  导出baseURL的目的是其他模块可能需要使用
export { baseURL, instance, request }
