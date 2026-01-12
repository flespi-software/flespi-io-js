# Tests

This directory contains tests for the flespi-io-js library.

## Running Tests

### Run All Tests

```bash
npm test
```

This runs the basic test suite that doesn't require authentication:
- Build outputs verification
- Config generation validation
- Library integration checks

### Run MQTT Integration Test

The MQTT test requires a valid Flespi token and tests real MQTT functionality:

```bash
# Set your Flespi token
export FLESPI_TOKEN=your_token_here

# Run the MQTT integration test
npm run test:mqtt
```

Or as a one-liner:

```bash
FLESPI_TOKEN=your_token npm run test:mqtt
```

## Test Files

### 1. `test-build-outputs.js`
Verifies that all 7 build targets were created correctly:
- Checks file existence and sizes
- Validates UMD format
- Validates ESM format

### 2. `test-config-generation.js`
Tests the API configuration generation system:
- Verifies configs.json structure
- Validates all 5 API namespaces
- Checks endpoint definitions

### 3. `test-library-integration.js`
Tests basic library functionality:
- Loads built library files
- Checks exports and structure
- Verifies externals are not bundled

### 4. `test-mqtt-integration.js` (requires token)
Comprehensive MQTT functionality test:
- **Connect**: Establishes connection to MQTT broker
- **Subscribe**: Subscribes to a test topic
- **Publish**: Publishes a message to the topic
- **Receive**: Verifies message is received
- **Unsubscribe**: Cleans up subscription
- **Disconnect**: Closes connection properly

This test uses:
- `dist/node.mjs` - The ES module Node.js build
- MQTT v5 protocol
- QoS 1 for reliability
- Dynamic test topics to avoid conflicts
- Proper cleanup and error handling

## Getting a Flespi Token

1. Go to https://flespi.io
2. Register or log in
3. Navigate to "Tokens" section
4. Create a new token with appropriate permissions
5. Copy the token value

## What the MQTT Test Does

1. **Loads the library** from `dist/node.mjs` (ES module)
2. **Creates a connection** with your token
3. **Connects** to `mqtt.flespi.io` using MQTT v5
4. **Subscribes** to a unique test topic: `test/flespi-io-js/{timestamp}`
5. **Publishes** a JSON message to that topic
6. **Receives** the message back (verifies pub/sub works)
7. **Unsubscribes** from the topic
8. **Disconnects** cleanly from the broker

The entire test completes in 2-5 seconds if successful.

**Note**: The Node.js build (`node.mjs`) is now an ES module rather than CommonJS, which works better with the modern Node.js ecosystem and the MQTT v5 library.

## Expected Output

```
Test 4: MQTT Integration Test
==============================

Loading flespi-io-js library...

✓ Library loaded successfully

1. Creating MQTT Connection...

✓ Connection instance created

2. Testing MQTT Connection...

  Connecting to MQTT broker...
  Client ID: test-client-1234567890
✓ Connected to MQTT broker
  Session present: false

3. Testing MQTT Subscribe...

✓ Subscribed to topic: test/flespi-io-js/1234567890
  QoS granted: 1

4. Testing MQTT Publish...

✓ Published message to topic: test/flespi-io-js/1234567890
  Message: {"timestamp":1234567890,"test":"mqtt-integration","message":"Hello from flespi-io-js test!"}

  Waiting for message to be received...

4. Testing Message Receive...

✓ Message received on topic: test/flespi-io-js/1234567890
  Message: {"timestamp":1234567890,"test":"mqtt-integration","message":"Hello from flespi-io-js test!"}
✓ Message content matches sent message

5. Testing MQTT Unsubscribe...

✓ Unsubscribed from test/flespi-io-js/1234567890

6. Testing MQTT Disconnect...

✓ Disconnected from MQTT broker

==============================
Tests passed: 10
Tests failed: 0
==============================

✓ All MQTT integration tests passed!
```

## Troubleshooting

### "FLESPI_TOKEN environment variable not set"
Set your token: `export FLESPI_TOKEN=your_token_here`

### "Error loading library"
Make sure you've built the library first: `npm run build`

### "MQTT Connection error"
- Check your token is valid
- Verify you have internet connectivity
- Ensure mqtt.flespi.io is accessible (port 8883 or WebSocket)

### "Test timed out after 30 seconds"
- Check network connectivity
- Verify Flespi service is operational
- Try again with a fresh token
