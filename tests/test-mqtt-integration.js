#!/usr/bin/env node
/**
 * Test 4: MQTT Integration Test
 * Tests connect, subscribe, publish, and disconnect functionality
 *
 * Usage:
 *   FLESPI_TOKEN=your_token_here node tests/test-mqtt-integration.js
 */

import path from 'path'
import { fileURLToPath } from 'url'
import WebSocket from 'ws'

// Set up browser globals shim for Node.js before loading the library
if (typeof globalThis.navigator === 'undefined') {
  globalThis.navigator = { userAgent: 'node.js', language: 'en-US' }
}
if (typeof globalThis.window === 'undefined') {
  globalThis.window = globalThis
}
if (typeof globalThis.document === 'undefined') {
  globalThis.document = {}
}
if (typeof globalThis.location === 'undefined') {
  globalThis.location = { href: 'http://localhost/' }
}
// Add WebSocket support for Node.js
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = WebSocket
}
// Add Worker shim (MQTT library tries to use worker-timers)
if (typeof globalThis.Worker === 'undefined') {
  globalThis.Worker = class Worker {
    constructor() {
      this.listeners = {}
    }
    postMessage() {}
    terminate() {}
    addEventListener(event, handler) {
      if (!this.listeners[event]) {
        this.listeners[event] = []
      }
      this.listeners[event].push(handler)
    }
    removeEventListener(event, handler) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(h => h !== handler)
      }
    }
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('Test 4: MQTT Integration Test')
console.log('==============================\n')

// Check for token
const token = process.env.FLESPI_TOKEN

if (!token) {
  console.log('⚠ FLESPI_TOKEN environment variable not set')
  console.log('  Usage: FLESPI_TOKEN=your_token node tests/test-mqtt-integration.js')
  console.log('  Skipping MQTT integration test\n')
  process.exit(0)
}

let passed = 0
let failed = 0
let connectionInstance = null

// Load the library
console.log('Loading flespi-io-js library...\n')
try {
  const nodePath = path.resolve(__dirname, '../dist/node.mjs')
  const module = await import(nodePath)
  const Connection = module.default

  if (!Connection) {
    throw new Error('Library did not export a default Connection class')
  }

  console.log('✓ Library loaded successfully')
  passed++

  // Create connection instance
  console.log('\n1. Creating MQTT Connection...\n')
  connectionInstance = new Connection({
    token: token,
    socketConfig: {
      clientId: `test-client-${Date.now()}`,
      mqttSettings: {
        protocolVersion: 5,
        clean: true,
        keepalive: 60,
        reconnectPeriod: 5000
      }
    }
  })

  if (connectionInstance) {
    console.log('✓ Connection instance created')
    passed++
  }

  // Test connection
  console.log('\n2. Testing MQTT Connection...\n')

  let testTimeout = setTimeout(() => {
    console.log('✗ Test timed out after 30 seconds')
    failed++
    cleanup()
  }, 30000)

  let messageReceived = false
  const testTopic = `test/flespi-io-js/${Date.now()}`
  const testMessage = JSON.stringify({
    timestamp: Date.now(),
    test: 'mqtt-integration',
    message: 'Hello from flespi-io-js test!'
  })

  // Setup connection event handlers
  connectionInstance.socket.on('connect', async (connack) => {
    try {
      console.log('✓ Connected to MQTT broker')
      console.log(`  Session present: ${connack.sessionPresent}`)
      passed++

      // Test 3: Subscribe
      console.log('\n3. Testing MQTT Subscribe...\n')

      const subscribeResult = await connectionInstance.socket.subscribe({
        name: testTopic,
        handler: (message, topic, packet) => {
          console.log('\n4. Testing Message Receive...\n')
          console.log(`✓ Message received on topic: ${topic}`)
          console.log(`  Message: ${message.toString()}`)

          const receivedMsg = message.toString()
          if (receivedMsg === testMessage) {
            console.log('✓ Message content matches sent message')
            passed++
            messageReceived = true
          } else {
            console.log('✗ Message content does not match')
            failed++
          }

          // Wait a bit then unsubscribe and disconnect
          setTimeout(async () => {
            try {
              console.log('\n5. Testing MQTT Unsubscribe...\n')
              await connectionInstance.socket.unsubscribe(testTopic)
              console.log(`✓ Unsubscribed from ${testTopic}`)
              passed++

              console.log('\n6. Testing MQTT Disconnect...\n')
              await connectionInstance.socket.close()
              console.log('✓ Disconnected from MQTT broker')
              passed++

              clearTimeout(testTimeout)
              printSummary()
            } catch (err) {
              console.log('✗ Error during cleanup:', err.message)
              failed++
              clearTimeout(testTimeout)
              printSummary()
            }
          }, 1000)
        },
        options: { qos: 1 }
      })

      // Check subscribe result - it might be an array or object
      if (subscribeResult) {
        console.log(`✓ Subscribed to topic: ${testTopic}`)
        if (Array.isArray(subscribeResult) && subscribeResult.length > 0) {
          console.log(`  QoS granted: ${subscribeResult[0].qos}`)
        }
        passed++
      } else {
        console.log('✗ Subscribe failed - returned null/undefined')
        console.log('  Result:', subscribeResult)
        failed++
        cleanup()
        return
      }

      // Test 4: Publish
      console.log('\n4. Testing MQTT Publish...\n')

      // Wait a moment for subscription to be fully established
      await new Promise(resolve => setTimeout(resolve, 500))

      const published = await connectionInstance.socket.publish(testTopic, testMessage, { qos: 1 })

      if (published) {
        console.log(`✓ Published message to topic: ${testTopic}`)
        console.log(`  Message: ${testMessage}`)
        passed++
      } else {
        console.log('✗ Publish failed')
        failed++
        cleanup()
      }

      // Wait for message to be received (handler will continue the test)
      console.log('\n  Waiting for message to be received...')

    } catch (err) {
      console.log('✗ Error during MQTT operations:', err.message)
      console.log('  Stack:', err.stack)
      failed++
      clearTimeout(testTimeout)
      cleanup()
    }
  })

  connectionInstance.socket.on('error', (error) => {
    console.log('✗ MQTT Connection error:', error.message)
    console.log('  Code:', error.code)
    failed++
    clearTimeout(testTimeout)
    cleanup()
  })

  connectionInstance.socket.on('close', () => {
    // Connection closed event
  })

  connectionInstance.socket.on('offline', () => {
    console.log('⚠ MQTT client went offline')
  })

  // Start connection
  console.log(`  Connecting to MQTT broker...`)
  console.log(`  Client ID: ${connectionInstance.socket._config.clientId}`)

} catch (err) {
  console.log('✗ Error loading library:', err.message)
  console.log('  Stack:', err.stack)
  failed++
  printSummary()
}

function cleanup() {
  if (connectionInstance && connectionInstance.socket) {
    try {
      connectionInstance.socket.close(true)
    } catch (err) {
      // Ignore cleanup errors
    }
  }
  setTimeout(() => {
    printSummary()
  }, 500)
}

function printSummary() {
  console.log('\n==============================')
  console.log('Tests passed:', passed)
  console.log('Tests failed:', failed)
  console.log('==============================\n')

  if (failed > 0) {
    console.log('⚠ Some MQTT integration tests failed\n')
    process.exit(1)
  } else {
    console.log('✓ All MQTT integration tests passed!\n')
    process.exit(0)
  }
}
