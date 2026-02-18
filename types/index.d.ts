import { HTTP, HttpConfig } from './http'
import { MQTT, MqttConfig, MqttMessageHandler, SubscribeOptions } from './socket'
import { PlatformHttpSugar, GwHttpSugar, StorageHttpSugar, MqttHttpSugar, AuthHttpSugar } from './generated/http-sugar'
import { MqttSugarNamespaced, MqttSugarCamelCase } from './generated/mqtt-sugar'
import { PoolNamespaced, PoolCamelCase } from './generated/pool-sugar'

export { HTTP, HttpConfig } from './http'
export { MQTT, MqttConfig, MqttSettings, MqttMessageHandler, SubscribeOptions, TopicDescriptor, MqttEventName } from './socket'
export { PlatformHttpSugar, GwHttpSugar, StorageHttpSugar, MqttHttpSugar, AuthHttpSugar } from './generated/http-sugar'
export { MqttSugarNamespaced, MqttSugarCamelCase } from './generated/mqtt-sugar'
export { PoolNamespaced, PoolCamelCase, PoolGetHandler, PoolUpdateHandler } from './generated/pool-sugar'

export interface ConnectionConfig {
  httpConfig?: HttpConfig
  socketConfig?: MqttConfig
  token?: string
}

export interface Region {
  'mqtt-ws': string
  rest: string
  [key: string]: string
}

declare class Connection {
  constructor(config?: ConnectionConfig)
  config: ConnectionConfig
  http: HTTP
  socket: MQTT & MqttSugarNamespaced
  pool: PoolNamespaced
  token: string
  httpConfig: HttpConfig
  socketConfig: MqttConfig
  setRegion(region: Region): void

  platform: PlatformHttpSugar
  gw: GwHttpSugar
  storage: StorageHttpSugar
  mqtt: MqttHttpSugar
  auth: AuthHttpSugar
}

interface Connection extends MqttSugarCamelCase, PoolCamelCase {}

export default Connection
