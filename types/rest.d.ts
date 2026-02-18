import { HTTP, HttpConfig } from './http'
import { PlatformHttpSugar, GwHttpSugar, StorageHttpSugar, MqttHttpSugar, AuthHttpSugar } from './generated/http-sugar'

export interface Region {
  rest: string
  [key: string]: string
}

declare class RestConnection {
  constructor(config?: HttpConfig)
  http: HTTP
  config: HttpConfig
  token: string
  setRegion(region: Region): void

  platform: PlatformHttpSugar
  gw: GwHttpSugar
  storage: StorageHttpSugar
  mqtt: MqttHttpSugar
  auth: AuthHttpSugar
}

export default RestConnection
