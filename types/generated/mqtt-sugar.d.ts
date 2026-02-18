import { MqttMessageHandler, SubscribeOptions } from '../socket'

export interface MqttSugarNamespaced {
  messages: {
    channels: {
      subscribe(channel_id: string | number, ident: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
      unsubscribe(channel_id: string | number, ident: string | number, subscriptionId: number, options?: any): Promise<any>
    }
    devices: {
      subscribe(device_id: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
      unsubscribe(device_id: string | number, subscriptionId: number, options?: any): Promise<any>
    }
    sms: {
      subscribe(modem_id: string | number, phone: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
      unsubscribe(modem_id: string | number, phone: string | number, subscriptionId: number, options?: any): Promise<any>
    }
  }
  logs: {
    subscribe(api: string | number, origin: string | number, event_type: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
    unsubscribe(api: string | number, origin: string | number, event_type: string | number, subscriptionId: number, options?: any): Promise<any>
  }
  state: {
    subscribe(api: string | number, origin: string | number, id: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
    unsubscribe(api: string | number, origin: string | number, id: string | number, subscriptionId: number, options?: any): Promise<any>
    properties: {
      subscribe(api: string | number, origin: string | number, id: string | number, property: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
      unsubscribe(api: string | number, origin: string | number, id: string | number, property: string | number, subscriptionId: number, options?: any): Promise<any>
    }
    devices: {
      telemetry: {
        subscribe(id: string | number, parameter: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
        unsubscribe(id: string | number, parameter: string | number, subscriptionId: number, options?: any): Promise<any>
      }
      settings: {
        subscribe(id: string | number, name: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
        unsubscribe(id: string | number, name: string | number, subscriptionId: number, options?: any): Promise<any>
      }
    }
  }
  intervals: {
    subscribe(calc_id: string | number, device_id: string | number, event: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
    unsubscribe(calc_id: string | number, device_id: string | number, event: string | number, subscriptionId: number, options?: any): Promise<any>
  }
}

export interface MqttSugarCamelCase {
  subscribeMessagesChannels(channel_id: string | number, ident: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeMessagesChannels(channel_id: string | number, ident: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeMessagesDevices(device_id: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeMessagesDevices(device_id: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeMessagesSms(modem_id: string | number, phone: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeMessagesSms(modem_id: string | number, phone: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeLogs(api: string | number, origin: string | number, event_type: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeLogs(api: string | number, origin: string | number, event_type: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeState(api: string | number, origin: string | number, id: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeState(api: string | number, origin: string | number, id: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeStateProperties(api: string | number, origin: string | number, id: string | number, property: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeStateProperties(api: string | number, origin: string | number, id: string | number, property: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeStateDevicesTelemetry(id: string | number, parameter: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeStateDevicesTelemetry(id: string | number, parameter: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeStateDevicesSettings(id: string | number, name: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeStateDevicesSettings(id: string | number, name: string | number, subscriptionId: number, options?: any): Promise<any>
  subscribeIntervals(calc_id: string | number, device_id: string | number, event: string | number, handler: MqttMessageHandler, options?: SubscribeOptions): Promise<Record<number, any>>
  unsubscribeIntervals(calc_id: string | number, device_id: string | number, event: string | number, subscriptionId: number, options?: any): Promise<any>
}
