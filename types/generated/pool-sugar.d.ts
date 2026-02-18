import { AxiosResponse } from 'axios'

export type PoolGetHandler = (entities: AxiosResponse) => void
export type PoolUpdateHandler = (eventType: 'created' | 'updated' | 'deleted', entity: any) => void

export interface PoolNamespaced {
  devices: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  groups: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  streams: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
    subscriptions: {
      (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
      stop(ids: string[]): void
    }
  }
  channels: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  containers: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  cdns: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  modems: {
    (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
    stop(ids: string[]): void
  }
  customer: {
    tokens: {
      (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
      stop(ids: string[]): void
    }
  }
  mqtt: {
    sessions: {
      (getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
      stop(ids: string[]): void
    }
  }
}

export interface PoolCamelCase {
  poolDevices(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolDevicesStop(ids: string[]): void
  poolGroups(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolGroupsStop(ids: string[]): void
  poolStreams(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolStreamsStop(ids: string[]): void
  poolStreamsSubscriptions(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolStreamsSubscriptionsStop(ids: string[]): void
  poolChannels(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolChannelsStop(ids: string[]): void
  poolContainers(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolContainersStop(ids: string[]): void
  poolCdns(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolCdnsStop(ids: string[]): void
  poolModems(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolModemsStop(ids: string[]): void
  poolCustomerTokens(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolCustomerTokensStop(ids: string[]): void
  poolMqttSessions(getHandler: PoolGetHandler, updateHandler: PoolUpdateHandler): Promise<string[]>
  poolMqttSessionsStop(ids: string[]): void
}
