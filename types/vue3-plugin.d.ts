import { ConnectionConfig } from './index'

export interface Vue3PluginConfig extends ConnectionConfig {
  connectorName?: string
}

declare const ConnectionPlugin: {
  install(app: any, config: Vue3PluginConfig | Vue3PluginConfig[]): void
}

export default ConnectionPlugin
