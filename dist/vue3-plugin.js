import axios from "axios";
import merge from "lodash-es/merge";
import mqtt$2 from "mqtt";
import uniqueId from "lodash-es/uniqueId";
const getBaseURl = (config2) => {
  let baseURL = "";
  if (config2.server) {
    baseURL = config2.server;
  }
  if (config2.port) {
    baseURL += `:${config2.port}`;
  }
  return baseURL;
};
class HTTP {
  /* Main function of http connection. It setting up private variables, global headers and return promise of the request */
  constructor(options) {
    const config2 = merge(
      {},
      {
        baseURL: getBaseURl(options),
        headers: {
          Authorization: options.token
        }
      },
      options
    );
    if (options.flespiApp) {
      config2.headers["x-flespi-app"] = options.flespiApp;
    }
    this.config = config2;
  }
  /* Updating function of the http connection. Thats update private params of the connection and rebuild client */
  update(type, payload) {
    switch (type) {
      case "token": {
        this.config.token = payload;
        this.config.headers.Authorization = payload;
        break;
      }
      case "config": {
        if (this.config.token !== payload.token && payload.token) {
          this.config.headers.Authorization = payload.token;
        }
        if (this.config.flespiApp !== payload.flespiApp) {
          if (payload.flespiApp) {
            this.config.headers["x-flespi-app"] = payload.flespiApp;
          } else {
            delete this.config.headers["x-flespi-app"];
          }
        }
        const config2 = merge({}, this.config, payload);
        config2.baseURL = getBaseURl(config2);
        this.config = config2;
        break;
      }
    }
  }
  request(options) {
    return axios(merge({}, this.config, options));
  }
  get(url, options) {
    return axios(merge({}, this.config, options, { url, method: "get" }));
  }
  delete(url, options) {
    return axios(merge({}, this.config, options, { url, method: "delete" }));
  }
  post(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "post", data }));
  }
  patch(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "patch", data }));
  }
  put(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "put", data }));
  }
}
HTTP.prototype.external = axios;
class AsyncClient {
  constructor(client) {
    this._client = client;
  }
  set handleMessage(newHandler) {
    this._client.handleMessage = newHandler;
  }
  get handleMessage() {
    return this._client.handleMessage;
  }
  get connected() {
    return this._client.connected;
  }
  get reconnecting() {
    return this._client.reconnecting;
  }
  publish(...args) {
    return new Promise((resolve, reject) => {
      this._client.publish(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  subscribe(...args) {
    return new Promise((resolve, reject) => {
      this._client.subscribe(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  unsubscribe(...args) {
    return new Promise((resolve, reject) => {
      this._client.unsubscribe(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  end(...args) {
    return new Promise((resolve, reject) => {
      this._client.end(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  addListener(...args) {
    return this._client.addListener(...args);
  }
  emit(...args) {
    return this._client.emit(...args);
  }
  eventNames(...args) {
    return this._client.eventNames(...args);
  }
  getLastMessageId(...args) {
    return this._client.getLastMessageId(...args);
  }
  getMaxListeners(...args) {
    return this._client.getMaxListeners(...args);
  }
  listenerCount(...args) {
    return this._client.listenerCount(...args);
  }
  listeners(...args) {
    return this._client.listeners(...args);
  }
  off(...args) {
    return this._client.off(...args);
  }
  on(...args) {
    return this._client.on(...args);
  }
  once(...args) {
    return this._client.once(...args);
  }
  prependListener(...args) {
    return this._client.prependListener(...args);
  }
  prependOnceListener(...args) {
    return this._client.prependOnceListener(...args);
  }
  rawListeners(...args) {
    return this._client.rawListeners(...args);
  }
  removeAllListeners(...args) {
    return this._client.removeAllListeners(...args);
  }
  removeListener(...args) {
    return this._client.removeListener(...args);
  }
  removeOutgoingMessage(...args) {
    return this._client.removeOutgoingMessage(...args);
  }
  setMaxListeners(...args) {
    return this._client.setMaxListeners(...args);
  }
}
const mqtt$1 = {
  connect(brokerURL, opts) {
    const client = mqtt$2.connect(brokerURL, opts);
    const asyncClient = new AsyncClient(client);
    return asyncClient;
  },
  connectAsync(brokerURL, opts, allowRetries = true) {
    const client = mqtt$2.connect(brokerURL, opts);
    const asyncClient = new AsyncClient(client);
    return new Promise((resolve, reject) => {
      const promiseResolutionListeners = {
        connect: (connack) => {
          removePromiseResolutionListeners();
          resolve(asyncClient);
        },
        end: () => {
          removePromiseResolutionListeners();
          resolve(asyncClient);
        },
        error: (err) => {
          removePromiseResolutionListeners();
          client.end();
          reject(err);
        }
      };
      if (allowRetries === false) {
        promiseResolutionListeners.close = () => {
          promiseResolutionListeners.error("Couldn't connect to server");
        };
      }
      const removePromiseResolutionListeners = () => {
        Object.keys(promiseResolutionListeners).forEach((eventName) => {
          client.removeListener(eventName, promiseResolutionListeners[eventName]);
        });
      };
      Object.keys(promiseResolutionListeners).forEach((eventName) => {
        client.on(eventName, promiseResolutionListeners[eventName]);
      });
    });
  },
  AsyncClient
};
class MQTT {
  constructor(config2) {
    this._client = null, /* client of mqtt connection */
    this._topics = {}, /* topics which subscribed by mqtt {'uniqueId': {name: String, handler: Function},...} */
    this._config = config2, /* config of mqtt connection {server, port(optional), token} */
    this._timestampsByTopic = {}, /* flespi feature by filtering by timestamp */
    this._currentClientVersion = 0;
    this._events = {};
    this._createClient();
  }
  _generateTimestampFilteringWrapper(name, handler) {
    const that = this;
    return function(message, topic, packet) {
      const timestamp = packet.properties && packet.properties.userProperties && packet.properties.userProperties.timestamp ? parseFloat(packet.properties.userProperties.timestamp) : 0;
      if (!that._timestampsByTopic[name]) {
        that._timestampsByTopic[name] = {};
      }
      if (!that._timestampsByTopic[name][topic]) {
        that._timestampsByTopic[name][topic] = { timestamp: 0 };
      }
      if (timestamp > that._timestampsByTopic[name][topic].timestamp) {
        handler(message, topic, packet);
        that._timestampsByTopic[name][topic] = { timestamp };
      }
    };
  }
  _generateIdentifierFilteringWrapper(id, handler) {
    return function(message, topic, packet) {
      const identifier = packet.properties && packet.properties.subscriptionIdentifier;
      if (Array.isArray(identifier) && identifier.indexOf(id) || !Array.isArray(identifier) && identifier === id) {
        handler(message, topic, packet);
      }
    };
  }
  _generateCidFilteringWrapper(cid, handler) {
    return function(message, topic, packet) {
      const pcid = packet.properties && packet.properties.userProperties && packet.properties.userProperties.cid;
      if (pcid == cid) {
        handler(message, topic, packet);
      }
    };
  }
  /* Private method for creating, setting and subscribing for events of client of mqtt connection */
  async _createClient() {
    if (this._client) {
      await this.close(true);
    }
    if (!this._config.token || !this._config.server) {
      return false;
    }
    let baseURL = this._config.server;
    if (this._config.port) {
      baseURL += `:${this._config.port}`;
    }
    const defaultMqttConfig = {
      reschedulePings: true,
      keepalive: 60,
      reconnectPeriod: 5e3,
      connectTimeout: 3e4,
      resubscribe: true
    }, mqttConfig = Object.assign(defaultMqttConfig, this._config.mqttSettings);
    mqttConfig.username = this._config.token;
    mqttConfig.clientId = this._config.clientId || `flespi-io-js_${Math.random().toString(16).substr(2, 8)}`;
    this._client = mqtt$1.connect(baseURL, mqttConfig);
    this._client.on("connect", (connack) => {
      if (!connack.sessionPresent && !mqttConfig.resubscribe) {
        this._topics = {};
      }
      this._currentClientVersion = this._config.mqttSettings && this._config.mqttSettings.protocolVersion ? this._config.mqttSettings.protocolVersion : 4;
      if (this._events.connect) {
        this._events.connect.forEach((handler) => {
          typeof handler === "function" && handler(connack);
        });
      }
    });
    this._client.on("error", (error) => {
      if (error.code === 2) {
        this.close(true);
      }
      if (this._events.error) {
        this._events.error.forEach((handler) => {
          typeof handler === "function" && handler(error);
        });
      }
    });
    this._client.on("close", () => {
      if (!this._config.mqttSettings || this._config.mqttSettings && (this._config.mqttSettings.clean === void 0 || this._config.mqttSettings.clean === true)) {
        this._timestampsByTopic = {};
      }
      if (this._events.close) {
        this._events.close.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("disconnect", (packet) => {
      if (packet)
        console.log(this._client, packet);
      if (this._events.disconnect) {
        this._events.disconnect.forEach((handler) => {
          typeof handler === "function" && handler(packet);
        });
      }
    });
    const fallbackMessageProcessing = (topic, message, packet) => {
      const topicPath = topic.split("/"), activeTopicsId = Object.keys(this._topics).filter((checkedTopicId) => {
        const currentTopicPath = this._topics[checkedTopicId].name.split("/");
        if (currentTopicPath[0] === "$share") {
          currentTopicPath.splice(0, 2);
        }
        if (currentTopicPath.length === topicPath.length || currentTopicPath[currentTopicPath.length - 1] === "#") {
          return currentTopicPath.reduce((result, currentPath, index) => {
            if (currentPath === "#" || currentPath === "+") {
              return result && true;
            }
            return result && currentPath === topicPath[index];
          }, true);
        } else {
          return false;
        }
      });
      activeTopicsId.forEach((topicId) => {
        try {
          this._topics[topicId].handler(message, topic, packet);
        } catch (e) {
          console.log(e);
        }
      });
    }, messageProcessing = (topic, message, packet) => {
      if (this._currentClientVersion !== 5) {
        return fallbackMessageProcessing(topic, message, packet);
      }
      let activeTopicsId = packet.properties && packet.properties.subscriptionIdentifier;
      if (typeof activeTopicsId === "number") {
        activeTopicsId = [activeTopicsId];
      }
      activeTopicsId && activeTopicsId.forEach((topicId) => {
        try {
          this._topics[topicId] && this._topics[topicId].handler(message, topic, packet);
        } catch (e) {
          console.log(e);
        }
      });
    };
    this._client.on("message", messageProcessing);
    this._client.on("reconnect", () => {
      if (this._events.reconnect) {
        this._events.reconnect.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("offline", () => {
      if (this._events.offline) {
        this._events.offline.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("end", () => {
      if (this._events.end) {
        this._events.end.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
  }
  /* Updating function of the mqtt connection. Thats update private params of the connection and rebuild client */
  async update(type, payload) {
    switch (type) {
      case "token": {
        this._config.token = payload;
        if (this._client) {
          if (payload) {
            await this._createClient();
          } else {
            await this.close(true);
          }
        } else {
          await this._createClient();
        }
        break;
      }
      case "config": {
        this._config = Object.assign(this._config, payload);
        if (this._client) {
          await this._createClient();
        } else {
          await this._createClient();
        }
        break;
      }
    }
  }
  /* Check has client */
  hasClient() {
    return !!this._client;
  }
  /* Check connection status */
  connected() {
    return !!this._client && this._client.connected;
  }
  /* Subscription method for client of mqtt */
  async subscribe(topic) {
    const isProtocolNew = this._config.mqttSettings && this._config.mqttSettings.protocolVersion === 5;
    if (!Array.isArray(topic)) {
      topic = [topic];
    }
    return topic.reduce(async (result, topic2) => {
      const id = Number(uniqueId());
      if (isProtocolNew && topic2.options && topic2.options.filterByTimestamp) {
        topic2.handler = this._generateTimestampFilteringWrapper(topic2.name, topic2.handler);
      }
      if (isProtocolNew) {
        if (!topic2.options) {
          topic2.options = {};
        }
        topic2.options = merge(topic2.options, { properties: { subscriptionIdentifier: id } });
      }
      if (isProtocolNew && topic2.options && topic2.options.properties && topic2.options.properties.userProperties && topic2.options.properties.userProperties.cid) {
        topic2.handler = this._generateCidFilteringWrapper(topic2.options.properties.userProperties.cid, topic2.handler);
      }
      if (isProtocolNew && topic2.options && topic2.options.filterByIdentifier) {
        topic2.handler = this._generateIdentifierFilteringWrapper(topic2.options && topic2.options.subscriptionIdentifier || id, topic2.handler);
      }
      this._topics[id] = topic2;
      if (this._client) {
        try {
          let options = { ...topic2.options };
          delete options.filterByIdentifier;
          delete options.filterByTimestamp;
          const granted = await this._client.subscribe(topic2.name, options);
          result[id] = granted;
        } catch (e) {
          result[id] = e;
        }
      } else {
        result[id] = new Error("Client don`t created");
      }
      return result;
    }, {});
  }
  /* Unsubscription method for client of mqtt by topic name or topic names. */
  async unsubscribe(name, unsubId, options) {
    const removableTopicsIndexes = Object.keys(this._topics).reduce((result, topicId, index) => {
      if (typeof name === "string" && this._topics[topicId].name === name || name instanceof Array && name.includes(this._topics[topicId].name)) {
        result.push(topicId);
      }
      return result;
    }, []);
    let filteredRemovableTopicsIndexes = removableTopicsIndexes;
    if (unsubId) {
      filteredRemovableTopicsIndexes = removableTopicsIndexes.filter((topicId) => {
        return topicId === unsubId || unsubId instanceof Array && unsubId.includes(topicId);
      });
    }
    const needUnsubscribe = filteredRemovableTopicsIndexes.length === removableTopicsIndexes.length;
    filteredRemovableTopicsIndexes.forEach((index) => {
      const topic = this._topics[index];
      if (topic.options && topic.options.filterByTimestamp && this._timestampsByTopic[topic.name]) {
        delete this._timestampsByTopic[topic.name];
      }
      delete this._topics[index];
    });
    if (needUnsubscribe && !this._client._client.disconnecting) {
      const state2 = await this._client.unsubscribe(name, options);
      return state2;
    } else {
      return false;
    }
  }
  /* Unsubscription method for client of mqtt from all topics */
  async unsubscribeAll(options) {
    this._timestampsByTopic = {};
    for (const topicId of Object.keys(this._topics)) {
      await this._client.unsubscribe(this._topics[topicId].name, options);
    }
  }
  /* Publishing method for client of mqtt. publish(topic, message, [options]). Message must be a String or Buffer */
  async publish() {
    if (this._client) {
      const state2 = await this._client.publish(...arguments);
      return state2;
    } else {
      throw new Error("Client is empty");
    }
  }
  /* Closing method for client of mqtt. Closing session by client and clear private variable this._client */
  async close() {
    if (this._client) {
      this._topics = {};
      return this._client.end(...arguments).then(() => {
        this._client = null;
      });
    }
  }
  async end() {
    return await this.close(...arguments);
  }
  /* method attach event to mqtt client
  * @param {String} name   name of event
  * @param {Function} handler   handler of event which need add
  * */
  on(name, handler) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(handler);
    return this._events[name].length - 1;
  }
  /* clear event or remove current handler from event
  * @param {String} name   name of event
  * @param {Number/Array} index   index or array of indexes of current event`s handler
  * */
  off(name, index) {
    if (index !== void 0) {
      const currentHandlerIndex = Array.isArray(index) ? index : [index];
      currentHandlerIndex.forEach((index2) => {
        this._events[name][index2] = void 0;
      });
    } else {
      if (this._events[name]) {
        this._events[name] = void 0;
      }
    }
  }
}
const CONFIGS = [
  {
    basePath: "/platform",
    paths: {
      "/billing": {
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/billing/invoices/{invoices-selector}": {
        get: {
          parameters: [
            {
              name: "invoices-selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/billing/invoices/{invoices-selector}/charge": {
        post: {
          parameters: [
            {
              name: "invoices-selector",
              "in": "path"
            }
          ]
        }
      },
      "/billing/payment_portal": {
        get: {}
      },
      "/customer": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat-file": {
        post: {
          parameters: [
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        }
      },
      "/customer/chat/ai-assistant": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat/knowledge": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/generate-pvm-code": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/logs": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/statistics": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/unsubscribe": {
        get: {
          parameters: [
            {
              name: "email",
              "in": "query"
            },
            {
              name: "checksum",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}": {
        parameters: [
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/logs": {
        parameters: [
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/restore": {
        parameters: [
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        post: {}
      },
      "/grantors/{grants-selector}": {
        parameters: [
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/grants": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/grants/{grants-selector}": {
        parameters: [
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/grants/{grants-selector}/logs": {
        parameters: [
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/grants/{grants-selector}/subaccounts/{grant-subaccounts-selector}": {
        parameters: [
          {
            name: "grants-selector",
            "in": "path"
          },
          {
            name: "grant-subaccounts-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/identity-providers": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/identity-providers/{identity-provider-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/identity-providers/{identity-provider-selector}/logs": {
        get: {
          parameters: [
            {
              name: "identity-provider-selector",
              "in": "path"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/limits": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/limits/{limits-selector}": {
        parameters: [
          {
            name: "limits-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/limits/{limits-selector}/logs": {
        parameters: [
          {
            name: "limits-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/oauth/{oauth-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "oauth-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/realms": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/identity-providers/{realm-identity-provider-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/logs": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/roles": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/roles/{role-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "role-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/confirmation/password": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/identity-providers/{user-identity-provider-selector}": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          },
          {
            name: "user-identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/identity-providers/{user-identity-provider-selector}/confirmation": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          },
          {
            name: "user-identity-provider-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/login": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        post: {}
      },
      "/realms/{realm-selector}/users/{user-selector}/logout": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/password": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/subaccounts": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/subaccounts/{subaccounts-selector}": {
        parameters: [
          {
            name: "subaccounts-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/subaccounts/{subaccounts-selector}/logs": {
        parameters: [
          {
            name: "subaccounts-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/tokens": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tokens/{tokens-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "tokens-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tokens/{tokens-selector}/logs": {
        get: {
          parameters: [
            {
              name: "tokens-selector",
              "in": "path"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/webhooks": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}": {
        parameters: [
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}/logs": {
        parameters: [
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}/packets": {
        parameters: [
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/gw",
    paths: {
      "/assets": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}": {
        "delete": {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}/intervals": {
        parameters: [
          {
            name: "assets.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}/logs": {
        get: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/calcs": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/assets/{calc.assets.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.assets.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/calculate": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/{calc.device.intervals.selector.put}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          },
          {
            name: "calc.device.intervals.selector.put",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/{calc.device.intervals.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          },
          {
            name: "calc.device.intervals.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/recalculate": {
        post: {
          parameters: [
            {
              name: "calcs.selector",
              "in": "path"
            },
            {
              name: "calc.devices.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{dev-selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/geofences/{calc.geofences.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/groups/{calc.groups.selector}": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/logs": {
        parameters: [
          {
            name: "calcs.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          },
          {
            name: "devtypes.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}/assistance": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          },
          {
            name: "devtypes.selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}/knowledge": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          },
          {
            name: "devtypes.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channels": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}/cid": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}/connections/{conn-selector}": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "conn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/idents/{ch-ident-selector}/packets": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "ch-ident-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/idents/{channel.ident.selector}": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "channel.ident.selector",
            "in": "path"
          },
          {
            name: "fields",
            "in": "query"
          }
        ],
        get: {}
      },
      "/channels/{ch-selector}/logs": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/messages": {
        parameters: [
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/calculate": {
        post: {
          parameters: [
            {
              name: "dev-selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/cid": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-queue": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-queue/{devices.commands-queue.selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "devices.commands-queue.selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-result": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-result/{command-id-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "command-id-selector",
            "in": "path"
          }
        ],
        get: {}
      },
      "/devices/{dev-selector}/connections/{conn-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "conn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/geofences/{dev-geofences-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "dev-geofences-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/logs": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/media": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/messages": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/packets": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/settings/{sett-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "sett-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/sms": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/telemetry/{telemetry-selector}": {
        parameters: [
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "telemetry-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {}
      },
      "/geofences": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}": {
        "delete": {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}/hittest": {
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}/logs": {
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/groups": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/groups/{groups.selector}": {
        "delete": {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/groups/{groups.selector}/assets/{group.assets.selector}": {
        parameters: [
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.assets.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/devices/{group.devices.selector}": {
        parameters: [
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/geofences/{group.geofences.selector}": {
        parameters: [
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/logs": {
        get: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/message-parameters/{message-parameter.selector}": {
        parameters: [
          {
            name: "message-parameter.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/modems": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/modems/{modem-selector}": {
        parameters: [
          {
            name: "modem-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/modems/{modem-selector}/logs": {
        parameters: [
          {
            name: "modem-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/plugin-types/{plugin-types.selector}": {
        parameters: [
          {
            name: "plugin-types.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/plugins": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}": {
        "delete": {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/devices/{plugin.devices.selector}": {
        parameters: [
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/geofences/{plugin.geofences.selector}": {
        parameters: [
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/groups/{plugin.groups.selector}": {
        parameters: [
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/logs": {
        get: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/packets": {
        parameters: [
          {
            name: "plugin.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/stream-protocols/{stream-protocols.selector}": {
        parameters: [
          {
            name: "stream-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/streams": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/channels/{stream.channels.selector}": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.channels.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        "x-flespi-extra-parameters": {}
      },
      "/streams/{stream.selector}/devices/{stream.devices.selector}": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/geofences/{stream.geofences.selector}": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/groups/{stream.groups.selector}": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/logs": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/messages": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        "delete": {},
        post: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/packets": {
        parameters: [
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/storage",
    paths: {
      "/cdns": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}": {
        parameters: [
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/files": {
        parameters: [
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/logs": {
        parameters: [
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/containers": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}": {
        parameters: [
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/calculate": {
        post: {
          parameters: [
            {
              name: "container-selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/logs": {
        parameters: [
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/containers/{container-selector}/messages": {
        parameters: [
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/expressions/functions": {
        get: {}
      },
      "/expressions/test": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/mqtt",
    paths: {
      "/logs": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/messages": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/messages/{messages-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "messages-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/sessions": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "sessions-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}/subscriptions": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "sessions-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}/subscriptions/{subscriptions-selector}": {
        parameters: [
          {
            name: "sessions-selector",
            "in": "path"
          },
          {
            name: "subscriptions-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/auth",
    paths: {
      "/account/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/account/register": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/callback": {
        get: {}
      },
      "/callback/proxy": {
        get: {
          parameters: [
            {
              name: "state",
              "in": "query"
            },
            {
              name: "code",
              "in": "query"
            },
            {
              name: "error",
              "in": "query"
            },
            {
              name: "error_description",
              "in": "query"
            }
          ]
        }
      },
      "/email/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/email/revert": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/email/update": {
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/info": {
        get: {}
      },
      "/login/credentials": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/login/passwordless": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/login/passwordless/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/oauth/link": {
        get: {
          parameters: [
            {
              name: "provider",
              "in": "query"
            }
          ]
        }
      },
      "/oauth/login": {
        get: {
          parameters: [
            {
              name: "provider",
              "in": "query"
            }
          ]
        }
      },
      "/oauth/providers": {
        get: {}
      },
      "/password": {
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/regions": {
        get: {}
      }
    }
  }
];
const FData = typeof FormData !== "undefined" ? FormData : require("form-data");
function generate$3(http, config2) {
  const base = config2.basePath, baseName = base.slice(1);
  http[baseName] = {};
  function refResolver(ref) {
    const parts = ref.split("/").slice(1);
    const result = parts.reduce((result2, part) => {
      return result2[part];
    }, config2);
    if (result.$ref) {
      refResolver(result.$ref);
    } else {
      return result;
    }
  }
  return Object.keys(config2.paths).reduce((result, path, index) => {
    const methods = Object.keys(config2.paths[path]).filter((method) => method !== "parameters");
    const parsedPath = path.split("/").reduce((result2, part) => {
      if (part.match(/{([\w.-]+)}/g)) {
        result2.params.push(part);
      } else if (part) {
        result2.parts.push(part.replace(/[.-]\w/g, (match) => {
          return match[1].toUpperCase();
        }));
      }
      return result2;
    }, { params: [], parts: [] });
    methods.forEach((method) => {
      const paramsByMethod = config2.paths[path][method].parameters ? config2.paths[path][method].parameters.reduce((result2, param) => {
        if (param.$ref) {
          const resolved = refResolver(param.$ref);
          result2[resolved.name] = resolved.in;
        } else {
          result2[param.name] = param.in;
        }
        return result2;
      }, {}) : {};
      parsedPath.parts.reduce((obj, name) => {
        if (!obj[name]) {
          obj[name] = {};
        }
        return obj[name];
      }, http[baseName]);
      parsedPath.parts.reduce((obj, name, index2, array) => {
        if (index2 === array.length - 1) {
          obj[name][method] = function() {
            let queryString = `${base}${path}`, options = {};
            const localParams = [...parsedPath.params];
            if (Object.values(paramsByMethod).includes("query")) {
              localParams.push("query");
            }
            if (Object.values(paramsByMethod).includes("body")) {
              localParams.push("body");
            }
            if (Object.values(paramsByMethod).includes("formData")) {
              const formDataParams = Object.keys(paramsByMethod).filter((name2) => paramsByMethod[name2] === "formData");
              formDataParams.forEach((name2) => {
                localParams.push(`formData_${name2}`);
              });
            }
            localParams.forEach((param, index3) => {
              if (queryString.indexOf(param) !== -1) {
                queryString = queryString.replace(param, arguments[index3]);
              }
              if (param === "query" && arguments[index3]) {
                options.params = arguments[index3];
              }
              if (param === "body" && arguments[index3]) {
                options.data = arguments[index3];
              }
              if (param.indexOf("formData_") === 0 && arguments[index3]) {
                if (!options.data) {
                  options.data = new FData();
                }
                const name2 = param.split("_")[1];
                options.data.append(name2, arguments[index3]);
                if (name2 === "file") {
                  if (!options.headers) {
                    options.headers = {};
                  }
                  options.headers["Content-Type"] = `multipart/form-data; boundary=${options.data._boundary}`;
                }
              }
            });
            arguments[localParams.length] ? options = Object.assign(arguments[localParams.length], { url: queryString, method }, options) : options = Object.assign({ url: queryString, method }, options);
            return http.request(options);
          };
        }
        return obj[name];
      }, http[baseName]);
      const nameOfMethod = parsedPath.parts.reduce((result2, part) => {
        result2 += part[0].toUpperCase() + part.slice(1).replace(/-\w/g, (match) => {
          return match[1].toUpperCase();
        });
        return result2;
      }, `${method}`);
      result[nameOfMethod] = function() {
        let queryString = `${base}${path}`, options = {};
        const localParams = [...parsedPath.params];
        if (Object.values(paramsByMethod).includes("query")) {
          localParams.push("query");
        }
        if (Object.values(paramsByMethod).includes("body")) {
          localParams.push("body");
        }
        if (Object.values(paramsByMethod).includes("formData")) {
          const formDataParams = Object.keys(paramsByMethod).filter((name) => paramsByMethod[name] === "formData");
          formDataParams.forEach((name) => {
            localParams.push(`formData_${name}`);
          });
        }
        localParams.forEach((param, index2) => {
          if (queryString.indexOf(param) !== -1) {
            queryString = queryString.replace(param, arguments[index2]);
          }
          if (param === "query" && arguments[index2]) {
            options.params = arguments[index2];
          }
          if (param === "body" && arguments[index2]) {
            options.data = arguments[index2];
          }
          if (param.indexOf("formData_") === 0 && arguments[index2]) {
            if (!options.data) {
              options.data = new FData();
            }
            const name = param.split("_")[1];
            options.data.append(name, arguments[index2]);
            if (name === "file") {
              if (!options.headers) {
                options.headers = {};
              }
              options.headers["Content-Type"] = `multipart/form-data; boundary=${options.data._boundary}`;
            }
          }
        });
        arguments[localParams.length] ? options = Object.assign(arguments[localParams.length], { url: queryString, method }, options) : options = Object.assign({ url: queryString, method }, options);
        return http.request(options);
      };
    });
    return result;
  }, {});
}
const httpExtender = (http) => {
  return CONFIGS.reduce((result, config2) => {
    result[config2.basePath.slice(1)] = generate$3(http, config2);
    return result;
  }, {});
};
const messages = {
  base: "flespi/message/",
  children: {
    channels: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/channels/{channel_id}/{ident}",
          params: [
            "channel_id",
            "ident"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/channels/{channel_id}/{ident}",
          params: [
            "channel_id",
            "ident"
          ]
        }
      ]
    },
    devices: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/devices/{device_id}",
          params: [
            "device_id"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/devices/{device_id}",
          params: [
            "device_id"
          ]
        }
      ]
    },
    sms: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/modems/{modem_id}/{phone}",
          params: [
            "modem_id",
            "phone"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/modems/{modem_id}/{phone}",
          params: [
            "modem_id",
            "phone"
          ]
        }
      ]
    }
  }
};
const logs = {
  base: "flespi/log/",
  methods: [
    {
      name: "subscribe",
      pattern: "{api}/{origin}/{event_type}",
      params: [
        "api",
        "origin",
        "event_type"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "{api}/{origin}/{event_type}",
      params: [
        "api",
        "origin",
        "event_type"
      ]
    }
  ]
};
const state = {
  base: "flespi/state/",
  methods: [
    {
      name: "subscribe",
      pattern: "{api}/{origin}/{id}",
      params: [
        "api",
        "origin",
        "id"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "{api}/{origin}/{id}",
      params: [
        "api",
        "origin",
        "id"
      ]
    }
  ],
  children: {
    properties: {
      methods: [
        {
          name: "subscribe",
          pattern: "{api}/{origin}/{id}/{property}",
          params: [
            "api",
            "origin",
            "id",
            "property"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "{api}/{origin}/{id}/{property}",
          params: [
            "api",
            "origin",
            "id",
            "property"
          ]
        }
      ]
    },
    devices: {
      children: {
        telemetry: {
          methods: [
            {
              name: "subscribe",
              pattern: "gw/devices/{id}/telemetry/{parameter}",
              params: [
                "id",
                "parameter"
              ]
            },
            {
              name: "unsubscribe",
              pattern: "gw/devices/{id}/telemetry/{parameter}",
              params: [
                "id",
                "parameter"
              ]
            }
          ]
        },
        settings: {
          methods: [
            {
              name: "subscribe",
              pattern: "gw/devices/{id}/settings/{name}",
              params: [
                "id",
                "name"
              ]
            },
            {
              name: "unsubscribe",
              pattern: "gw/devices/{id}/settings/{name}",
              params: [
                "id",
                "name"
              ]
            }
          ]
        }
      }
    }
  }
};
const intervals = {
  base: "flespi/interval/",
  methods: [
    {
      name: "subscribe",
      pattern: "gw/calcs/{calc_id}/devices/{device_id}/{event}",
      params: [
        "calc_id",
        "device_id",
        "event"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "gw/calcs/{calc_id}/devices/{device_id}/{event}",
      params: [
        "calc_id",
        "device_id",
        "event"
      ]
    }
  ]
};
const config$1 = {
  messages,
  logs,
  state,
  intervals
};
function generate$2() {
  let _mqtt, _base = "", _partNameOFMethod = "";
  function generate2(mqtt2, config2) {
    if (!_mqtt) {
      _mqtt = mqtt2;
    }
    const entities = Object.keys(config2), result = {};
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      let base = "";
      if (localConfig.base) {
        _base = localConfig.base;
      }
      base = _base;
      if (localConfig.methods && localConfig.methods.length) {
        localConfig.methods.forEach((method, index2) => {
          result[`${method.name}${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}`] = function() {
            let topicString = `${base}${method.pattern}`;
            if (method.params && method.params.length) {
              method.params.forEach((param, index3, array2) => {
                if (topicString.indexOf(param) !== -1) {
                  topicString = topicString.replace(`{${param}}`, arguments[index3]);
                }
              });
            }
            if (!_mqtt.hasClient()) {
              _mqtt([]);
            }
            const options = arguments[method.params.length + 1];
            if (options && options.prefix) {
              topicString = `${options.prefix}/${topicString}`;
            }
            switch (method.name) {
              case "subscribe": {
                return _mqtt.subscribe({ name: topicString, handler: arguments[method.params.length], options });
              }
              case "unsubscribe": {
                return _mqtt.unsubscribe(topicString, arguments[method.params.length], options);
              }
            }
          };
        });
      }
      if (localConfig.children) {
        const currentPartNameOfMethod = entity[0].toUpperCase() + entity.slice(1);
        _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`;
        Object.assign(result, generate2(mqtt2, localConfig.children));
        _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, "");
      }
    });
    return result;
  }
  return generate2;
}
const camel = (mqtt2) => {
  return generate$2()(mqtt2, config$1);
};
function generate$1() {
  let _mqtt, _base = "";
  return function(ext, config2) {
    if (!_mqtt) {
      _mqtt = ext;
    }
    const entities = Object.keys(config2);
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      let base = "";
      if (localConfig.base) {
        _base = localConfig.base;
      }
      base = _base;
      if (!ext[entity]) {
        ext[entity] = {};
      }
      if (localConfig.methods && localConfig.methods.length) {
        localConfig.methods.forEach((method, index2) => {
          ext[entity][method.name] = function() {
            let topicString = `${base}${method.pattern}`;
            if (method.params && method.params.length) {
              method.params.forEach((param, index3, array2) => {
                if (topicString.indexOf(param) !== -1) {
                  topicString = topicString.replace(`{${param}}`, arguments[index3]);
                }
              });
            }
            if (!_mqtt.hasClient()) {
              _mqtt([]);
            }
            const options = arguments[method.params.length + 1];
            if (options && options.prefix) {
              topicString = `${options.prefix}/${topicString}`;
            }
            switch (method.name) {
              case "subscribe": {
                return _mqtt.subscribe({ name: topicString, handler: arguments[method.params.length], options });
              }
              case "unsubscribe": {
                return _mqtt.unsubscribe(topicString, arguments[method.params.length], options);
              }
            }
          };
        });
      }
      if (localConfig.children) {
        ext[entity] = generate$1(ext[entity], localConfig.children);
      }
    });
    return ext;
  };
}
const socketExtender = (mqtt2) => {
  return {
    socket: generate$1()(mqtt2, config$1),
    ...camel(mqtt2)
  };
};
const devices = {
  api: "gw",
  origin: "devices/+"
};
const groups = {
  api: "gw",
  origin: "groups/+"
};
const streams = {
  api: "gw",
  origin: "streams/+",
  children: {
    subscriptions: {
      api: "gw",
      origin: "streams/+/subscriptions/+"
    }
  }
};
const channels = {
  api: "gw",
  origin: "channels/+"
};
const containers = {
  api: "storage",
  origin: "containers/+"
};
const cdns = {
  api: "storage",
  origin: "cdns/+"
};
const modems = {
  api: "gw",
  origin: "modems/+"
};
const customer = {
  children: {
    tokens: {
      api: "platform",
      origin: "tokens/+"
    }
  }
};
const mqtt = {
  children: {
    sessions: {
      api: "mqtt",
      origin: "sessions/+"
    }
  }
};
const config = {
  devices,
  groups,
  streams,
  channels,
  containers,
  cdns,
  modems,
  customer,
  mqtt
};
function poolExtender(http, mqtt2) {
  const pool = {}, eventTypes = ["created", "updated", "deleted"];
  function generate2(ext, config2) {
    Object.keys(config2).forEach((name) => {
      if (config2[name].origin) {
        ext[name] = async function(getHandler, updateHandler) {
          const entities = await http.get(`${config2[name].api}/${config2[name].origin.replace(/\+/g, "all")}`, {});
          getHandler(entities);
          const ids = [];
          for (const eventType of eventTypes) {
            try {
              const grants = await mqtt2.logs.subscribe(config2[name].api, config2[name].origin, eventType, (message) => {
                const messageJson = JSON.parse(message);
                updateHandler(eventType, typeof messageJson.new === "object" ? messageJson.new : messageJson.old);
              }, { rh: 2 });
              if (grants) {
                ids.push(Object.keys(grants)[0]);
              }
            } catch (e) {
              console.log(e.message);
            }
          }
          return ids;
        };
        ext[name].stop = function(ids) {
          ids.forEach(async (id, index) => {
            await mqtt2.logs.unsubscribe(config2[name].api, config2[name].origin, eventTypes[index], id);
          });
        };
      } else {
        ext[name] = {};
      }
      if (config2[name].children) {
        generate2(ext[name], config2[name].children);
      }
    });
  }
  generate2(pool, config);
  return pool;
}
function generate() {
  let _partNameOFMethod = "";
  const eventTypes = ["created", "updated", "deleted"];
  return function(http, mqtt2, config2) {
    const entities = Object.keys(config2), result = {};
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      if (localConfig.origin) {
        result[`pool${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}`] = async function(getHandler, updateHandler) {
          const entities2 = await http.get(`${localConfig.api}/${localConfig.origin.replace(/\+/g, "all")}`, {});
          getHandler(entities2);
          const ids = [];
          for (const eventType of eventTypes) {
            try {
              const grants = await mqtt2.logs.subscribe(localConfig.api, localConfig.origin, eventType, (message) => {
                const messageJson = JSON.parse(message);
                updateHandler(eventType, typeof messageJson.new === "object" ? messageJson.new : messageJson.old);
              }, { rh: 0 });
              if (grants) {
                ids.push(Object.keys(grants)[0]);
              }
            } catch (e) {
              console.log(e);
            }
          }
          return ids;
        };
        result[`pool${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}Stop`] = function(ids) {
          ids.forEach(async (id, index2) => {
            await mqtt2.logs.unsubscribe(localConfig.api, localConfig.origin, eventTypes[index2], id);
          });
        };
      }
      if (localConfig.children) {
        const currentPartNameOfMethod = entity[0].toUpperCase() + entity.slice(1);
        _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`;
        Object.assign(result, generate(http, mqtt2, localConfig.children));
        _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, "");
      }
    });
    return result;
  };
}
const poolCamelCaseExtender = (http, mqtt2) => {
  return generate()(http, mqtt2, config);
};
const isBrowser = typeof window !== "undefined";
class Connection {
  constructor(config2) {
    const defaultConfig = { httpConfig: { server: "https://flespi.io" }, socketConfig: { server: isBrowser ? "wss://mqtt.flespi.io" : "mqtt://mqtt.flespi.io:8883" }, token: "" };
    this.config = merge(defaultConfig, config2);
    if (this.config.token && this.config.token.indexOf("FlespiToken") === -1) {
      this.config.token = `FlespiToken ${this.config.token}`;
    }
    this.socket = new MQTT(merge({}, this.socketConfig, { token: this.config.token }));
    this.http = new HTTP(merge({}, this.httpConfig, { token: this.config.token }));
    const httpSugar = httpExtender(this.http);
    Object.assign(this, httpSugar);
    const mqttSugar = socketExtender(this.socket);
    Object.assign(this, mqttSugar);
    this.pool = poolExtender(this.http, this.socket);
    Object.assign(this, poolCamelCaseExtender(this.http, this.socket));
  }
  get token() {
    return this.config.token;
  }
  set token(token) {
    if (typeof token === "string") {
      this.config.token = token;
    } else {
      this.config.token = "";
    }
    this.socket.update("token", this.token);
    this.http.update("token", this.token);
  }
  /* httpConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for http */
  get httpConfig() {
    return this.config.httpConfig;
  }
  set httpConfig(config2) {
    this.config.httpConfig = config2;
    this.http.update("config", config2);
  }
  /* socketConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
  get socketConfig() {
    return this.config.socketConfig;
  }
  set socketConfig(config2) {
    this.config.socketConfig = config2;
    this.socket.update("config", config2);
  }
  /* flespi region */
  setRegion(region) {
    let { "mqtt-ws": mqttHost, rest: restHost } = region;
    mqttHost = `wss://${mqttHost}`;
    this.socketConfig = Object.assign(this.socketConfig, { server: mqttHost, port: void 0 });
    this.httpConfig = Object.assign(this.httpConfig, { server: restHost, port: "" });
  }
}
const connectionInit = (app, config2) => {
  const connector = new Connection(config2);
  if (config2.connectorName) {
    app.config.globalProperties[`$${config2.connectorName}`] = connector;
  } else {
    app.config.globalProperties.$connector = connector;
  }
};
const ConnectionPlugin = {};
ConnectionPlugin.install = function(app, config2) {
  if (Array.isArray(config2)) {
    config2.forEach((con) => {
      connectionInit(app, con);
    });
  } else {
    connectionInit(app, config2);
  }
};
export {
  ConnectionPlugin as default
};
