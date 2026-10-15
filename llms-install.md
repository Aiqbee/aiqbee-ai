# Installing Aiqbee Brain MCP Server

Aiqbee Brain is a **remote MCP server**. No local installation, dependencies, or build steps are required. You only need to add the server URL to the client's MCP configuration.

## MCP Server URL

```
https://mcp.aiqbee.com/mcp
```

## Setup by Client

### Cline / Cursor

Add to `.cursor/mcp.json` (or the equivalent Cline MCP config file):

```json
{
  "mcpServers": {
    "aiqbee": {
      "url": "https://mcp.aiqbee.com/mcp"
    }
  }
}
```

### Claude Desktop

Customize → Connectors → Add → Custom → Web, URL `https://mcp.aiqbee.com/mcp`. Alternatively use the stdio bridge in `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aiqbee": {
      "command": "npx",
      "args": ["-y", "@aiqbee/mcp"]
    }
  }
}
```

### Claude Code

```bash
claude mcp add --transport http aiqbee https://mcp.aiqbee.com/mcp
claude mcp login aiqbee
```

### OpenAI Codex CLI

`~/.codex/config.toml`:

```toml
[mcp_servers.aiqbee]
url = "https://mcp.aiqbee.com/mcp"
```

### Windsurf

`~/.config/devin/mcp_config.json` (Cascade; older versions: `~/.codeium/windsurf/mcp_config.json`): `{"mcpServers":{"aiqbee":{"serverUrl":"https://mcp.aiqbee.com/mcp"}}}`

### VS Code / Copilot

Add to `.mcp.json` at the workspace root (or use `.vscode/mcp.json` with a top-level `servers` key):

```json
{
  "mcpServers": {
    "aiqbee": {
      "type": "http",
      "url": "https://mcp.aiqbee.com/mcp"
    }
  }
}
```

### Any Other MCP Client

Point the client at `https://mcp.aiqbee.com/mcp` using streamable HTTP transport.

## Authentication

On first connection the client will open a browser window for OAuth 2.0 sign-in. No API keys or environment variables are needed. Sign in with your existing Aiqbee account.

## Verification

After setup, ask the AI assistant: "Search my brain for anything related to architecture". If the connection is working, it will call the `aiqbee_search` tool and return results from your knowledge graph.
