export interface MqttConfig {
  server?: string
  port?: string | number
  token?: string
  clientId?: string
  mqttSettings?: MqttSettings
  useWorker?: string | Worker
  [key: string]: any
}

export interface MqttSettings {
  reschedulePings?: boolean
  keepalive?: number
  reconnectPeriod?: number
  connectTimeout?: number
  resubscribe?: boolean
  protocolVersion?: 4 | 5
  clean?: boolean
  [key: string]: any
}

export interface SubscribeOptions {
  filterByTimestamp?: boolean
  filterByIdentifier?: boolean
  prefix?: string
  rh?: number
  properties?: {
    subscriptionIdentifier?: number
    userProperties?: Record<string, any>
    [key: string]: any
  }
  [key: string]: any
}

export interface TopicDescriptor {
  name: string
  handler: MqttMessageHandler
  options?: SubscribeOptions
}

export type MqttMessageHandler = (message: Buffer, topic: string, packet: any) => void

export type MqttEventName = 'connect' | 'error' | 'close' | 'disconnect' | 'reconnect' | 'offline' | 'end'

export declare class MQTT {
  constructor(config: MqttConfig)
  update(type: 'token', payload: string): Promise<void>
  update(type: 'config', payload: Partial<MqttConfig>): Promise<void>
  hasClient(): boolean
  connected(): boolean
  subscribe(topic: TopicDescriptor | TopicDescriptor[]): Promise<Record<number, any>>
  unsubscribe(name: string | string[], unsubId?: number | number[], options?: any): Promise<any>
  unsubscribeAll(options?: any): Promise<void>
  publish(topic: string, message: string | Buffer, options?: any): Promise<any>
  close(force?: boolean): Promise<void>
  end(force?: boolean): Promise<void>
  on(name: MqttEventName | string, handler: (...args: any[]) => void): number
  off(name: MqttEventName | string, index?: number | number[]): void
}

export default MQTT
