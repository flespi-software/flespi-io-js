### AI API

> This REST API provides AI-powered tools: semantic search for API methods, documentation Q&A, PVM code generation, and MCP servers for development and support agents.

Params:
* `query`: Params in plain object for query string
* `body`: Params in plain object for request body

### Example of use

```js
connector.http.ai.tools.searchApiMethods.post(body)
// or
connector.ai.postToolsSearchApiMethods(body)
```

| Method  | Alias  | Params  | Description  |
|---|---|---|---|
| http.ai.logs.get | ai.getLogs | query | Get AI operation logs |
| http.ai.logs.calculate.post | ai.postLogsCalculate | body | Calculate intervals from AI logs |
| http.ai.mcp.develop.get | ai.getMcpDevelop | | MCP server for development agents (SSE) |
| http.ai.mcp.develop.post | ai.postMcpDevelop | body | MCP server for development agents |
| http.ai.mcp.support.get | ai.getMcpSupport | | MCP server for support agents (SSE) |
| http.ai.mcp.support.post | ai.postMcpSupport | body | MCP server for support agents |
| http.ai.tools.generatePvmCode.post | ai.postToolsGeneratePvmCode | body | AI-powered PVM code generation |
| http.ai.tools.getApiSchema.post | ai.postToolsGetApiSchema | body | Get full Swagger schema for specific API methods |
| http.ai.tools.searchApiMethods.post | ai.postToolsSearchApiMethods | body | Semantic search for REST API methods |
| http.ai.tools.searchDeviceDocumentation.post | ai.postToolsSearchDeviceDocumentation | body | Expert Q&A on device protocols |
| http.ai.tools.searchFlespiDocumentation.post | ai.postToolsSearchFlespiDocumentation | body | Expert Q&A on platform features |
