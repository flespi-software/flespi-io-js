import { ConnectionConfig } from './index'

export interface VuePluginConfig extends ConnectionConfig {
  connectorName?: string
}

declare const ConnectionPlugin: {
  install(Vue: any, config: VuePluginConfig | VuePluginConfig[]): void
}

export default ConnectionPlugin
