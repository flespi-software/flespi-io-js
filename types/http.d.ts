import { AxiosResponse, AxiosRequestConfig, AxiosStatic } from 'axios'

export interface HttpConfig {
  server?: string
  port?: string | number
  token?: string
  flespiApp?: string
  [key: string]: any
}

export declare class HTTP {
  constructor(options: HttpConfig)
  config: HttpConfig & { baseURL: string; headers: Record<string, string> }
  update(type: 'token', payload: string): void
  update(type: 'config', payload: Partial<HttpConfig>): void
  request(options: AxiosRequestConfig): Promise<AxiosResponse>
  get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>
  delete(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>
  post(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  patch(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  put(url: string, data?: any, options?: AxiosRequestConfig): Promise<AxiosResponse>
  external: AxiosStatic
}

export default HTTP
