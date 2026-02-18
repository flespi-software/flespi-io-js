import { MQTT, MqttConfig } from './socket'
import { MqttSugarNamespaced, MqttSugarCamelCase } from './generated/mqtt-sugar'

export interface Region {
  'mqtt-ws': string
  [key: string]: string
}

declare class MqttConnection extends MQTT {
  constructor(config?: MqttConfig)
  token: string
  config: MqttConfig
  socket: MqttSugarNamespaced
  setRegion(region: Region): void
}

interface MqttConnection extends MqttSugarCamelCase {}

export default MqttConnection
