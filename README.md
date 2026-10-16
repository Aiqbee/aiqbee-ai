# Aiqbee AI

Connect AI assistants to your [Aiqbee](https://aiqbee.com) brains via the [Model Context Protocol](https://modelcontextprotocol.io/).

Search, create, and link knowledge across your architecture, portfolio, and digital strategy - all through natural conversation with your AI assistant.

---

## Supported Clients

Aiqbee is a **remote MCP server** (Streamable HTTP) at `https://mcp.aiqbee.com/mcp` with OAuth 2.0 sign-in.

| AI Tool | Integration | Setup |
|---------|-------------|-------|
| **Claude Code** | Plugin or CLI | [See below](#claude-code) |
| **Claude Desktop / claude.ai** | Custom Connector | [See below](#claude-desktop--claudeai) |
| **ChatGPT** | Custom MCP plugin | [See below](#chatgpt) |
| **Cursor** | MCP Config / Deep link | [See below](#cursor) |
| **VS Code / GitHub Copilot** | `.vscode/mcp.json` | [See below](#vs-code--github-copilot) |
| **Gemini CLI** | Extension | [See below](#gemini-cli) |
| **OpenAI Codex CLI** | `config.toml` | [See below](#openai-codex-cli) |
| **Windsurf** | MCP Config | [See below](#windsurf) |
| **Zed** | Context server | [See below](#zed) |
| **Grok (xAI API)** | Remote MCP tool | [See below](#grok-xai-api) |
| **Any stdio client** | npx | `npx -y @aiqbee/mcp` |

---

## Quick Start

### Claude Code

Plugin (includes the `/brain` skill), from your shell:

```bash
claude plugin marketplace add AIQBee/aiqbee-ai
claude plugin install aiqbee@aiqbee-marketplace
```

Inside a Claude Code session, use `/plugin marketplace add AIQBee/aiqbee-ai` then `/plugin install aiqbee@aiqbee-marketplace`.

Or add the server directly:

```bash
claude mcp add --transport http aiqbee https://mcp.aiqbee.com/mcp
```

Then run `/mcp` inside Claude Code (or `claude mcp login aiqbee` from your shell) to sign in.

### Claude Desktop / claude.ai

Claude Desktop and claude.ai connect to remote servers through **custom connectors**, not `claude_desktop_config.json`:

1. Go to **Customize → Connectors**, click **Add**, then **Custom → Web**.
2. Name: `Aiqbee`, remote MCP server URL: `https://mcp.aiqbee.com/mcp`. Click **Continue**.
3. Keep the detected OAuth settings, click **Add**, then connect and sign in with your Aiqbee account.

On Team and Enterprise plans, an Owner adds the connector under **Organization settings → Connectors** first; members then connect individually. Connectors added here are also available in Claude Code when signed in with the same Claude account.

Alternatively, use the [npx bridge](#npx-stdio-clients) in `claude_desktop_config.json`.

### ChatGPT

ChatGPT (web) adds custom MCP servers as plugins:

1. Go to **Plugins**, select **+**, then **Add custom MCP server**.
2. Name: `Aiqbee`; under **Connection** enter `https://mcp.aiqbee.com/mcp`; authentication: **OAuth**.
3. Review the risk warning, tick **I understand and want to continue**, then **Create as a plugin**.
4. Install the plugin and sign in with your Aiqbee account.

Availability depends on your plan and workspace policies. The ChatGPT desktop app shares MCP configuration with Codex; see [OpenAI Codex CLI](#openai-codex-cli).

### Cursor

One-click install link (open in a browser): [Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=aiqbee&config=eyJ1cmwiOiJodHRwczovL21jcC5haXFiZWUuY29tL21jcCJ9)

Or add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "aiqbee": {
      "url": "https://mcp.aiqbee.com/mcp"
    }
  }
}
```

### VS Code / GitHub Copilot

Run **MCP: Add Server** from the Command Palette and choose **HTTP**, or add to `.mcp.json` at your workspace root (or `~/.copilot/mcp-config.json` for all workspaces):

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

The VS Code–specific `.vscode/mcp.json` format (top-level `servers` instead of `mcpServers`) also works.

Use the tools from Copilot Chat in **Agent** mode.

### Gemini CLI

```bash
gemini extensions install https://github.com/AIQBee/aiqbee-ai
```

Restart Gemini CLI and run `/mcp auth aiqbee` if not prompted.

Or add the server directly:

```bash
gemini mcp add --transport http aiqbee https://mcp.aiqbee.com/mcp
```

### OpenAI Codex CLI

```bash
codex mcp add aiqbee --url https://mcp.aiqbee.com/mcp
```

Or add to `~/.codex/config.toml` (shared by Codex CLI, the Codex IDE extension and the ChatGPT desktop app):

```toml
[mcp_servers.aiqbee]
url = "https://mcp.aiqbee.com/mcp"
```

Then sign in:

```bash
codex mcp login aiqbee
```

### Windsurf

For the Cascade agent, open **… → Open MCP config file** in the Cascade panel (`~/.config/devin/mcp_config.json` on macOS/Linux, `%APPDATA%\devin\mcp_config.json` on Windows; older Windsurf versions used `~/.codeium/windsurf/mcp_config.json`) and add:

```json
{
  "mcpServers": {
    "aiqbee": {
      "serverUrl": "https://mcp.aiqbee.com/mcp"
    }
  }
}
```

### Zed

In Zed, open **Settings → AI → MCP Servers → Add Server → Add Remote Server**, or add to `settings.json` (Zed prompts for OAuth sign-in):

```json
{
  "context_servers": {
    "aiqbee": {
      "url": "https://mcp.aiqbee.com/mcp"
    }
  }
}
```

### Grok (xAI API)

The xAI API supports remote MCP servers as a tool (Responses API / xAI SDK). xAI connects to the server on your behalf, so it cannot run the interactive OAuth flow; pass an Aiqbee OAuth access token in `authorization`:

```json
{
  "model": "<grok-model>",
  "input": "List all my Aiqbee brains",
  "tools": [
    {
      "type": "mcp",
      "server_url": "https://mcp.aiqbee.com/mcp",
      "server_label": "aiqbee",
      "server_description": "Aiqbee knowledge graph (brains, neurons, relationships)",
      "authorization": "<AIQBEE_ACCESS_TOKEN>"
    }
  ]
}
```

Use `allowed_tools` (`allowed_tool_names` in the xAI SDK) to limit Grok to read-only tools such as `aiqbee_search` and `aiqbee_fetch`. See [xAI Remote MCP Tools](https://docs.x.ai/developers/tools/remote-mcp).

### npx (stdio clients)

For MCP clients that only support stdio transport:

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

### Other MCP Clients

Point any MCP client that supports Streamable HTTP and OAuth at:

```
https://mcp.aiqbee.com/mcp
```

---

## Authentication

Aiqbee uses **OAuth 2.0** with secure authorization. When you first connect, your MCP client will prompt you to sign in. The server supports:

- **Public clients** (Claude, Cursor, VS Code, Codex, Gemini CLI): Standard PKCE flow
- **Confidential clients** (ChatGPT): Server-side PKCE with callback

No API keys needed - just sign in with your existing Aiqbee account.

---

## Available Tools (25)

### Brain Discovery & Management

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_list_brains` | List all brains you have access to | Read |
| `aiqbee_get_brain_info` | Get brain metadata and statistics | Read |
| `aiqbee_edit_is_allowed` | Check if MCP editing is enabled for a brain | Read |
| `aiqbee_list_brain_templates` | List available brain templates for brain creation | Read |
| `aiqbee_create_brain` | Create a new brain (optionally from a template) | — |
| `aiqbee_update_brain` | Update brain name, description, or settings | Owner |
| `aiqbee_delete_brain` | Delete a brain permanently | Owner |

### Search & Retrieval

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_search` | Search neurons in your knowledge graph | Read |
| `aiqbee_fetch` | Get full neuron content and metadata | Read |
| `aiqbee_list_neurons` | Paginated neuron listing with filtering | Read |

### Neuron Types

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_list_neuron_types` | List all neuron types in a brain | Read |
| `aiqbee_add_neuron_type` | Create a new neuron type | Owner |
| `aiqbee_edit_neuron_type` | Update a neuron type's properties | Owner |
| `aiqbee_delete_neuron_type` | Delete a neuron type (with optional neuron reassignment) | Owner |

### Neurons

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_create_neuron` | Create a new neuron in your brain | ReadWrite |
| `aiqbee_update_neuron` | Update an existing neuron | ReadWrite |
| `aiqbee_delete_neuron` | Delete a neuron | ReadWrite |

### Relationships

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_get_relationships` | Get incoming/outgoing relationships for a neuron | Read |
| `aiqbee_create_relationship` | Create a link between two neurons | ReadWrite |
| `aiqbee_update_relationship` | Update an existing relationship | ReadWrite |
| `aiqbee_delete_relationship` | Remove a relationship | ReadWrite |

### Access Control

| Tool | Description | Permission |
|------|-------------|------------|
| `aiqbee_list_users` | List users with access to a brain | Read |
| `aiqbee_grant_access` | Grant a user access to a brain | Owner |
| `aiqbee_revoke_access` | Revoke a user's access to a brain | Owner |
| `aiqbee_batch_update_access` | Replace all access permissions in one operation | Owner |

---

## Example Prompts

Once connected, try asking your AI assistant:

- *"List all my brains"*
- *"Show me the available brain templates"*
- *"Create a new brain called 'Cloud Architecture' using the Enterprise Architecture template"*
- *"Search my brain for anything related to cloud migration"*
- *"Show me all the architecture decisions we've made"*
- *"Create a new neuron about our API gateway strategy"*
- *"Link the microservices neuron to the deployment pipeline neuron"*
- *"What are the relationships for the data platform neuron?"*
- *"Who has access to this brain? Grant read access to alice@example.com"*
- *"Summarize the key concepts in my digital strategy brain"*

---

## What is Aiqbee?

[Aiqbee](https://aiqbee.com) is a web-based architecture, portfolio, and digital strategy management platform.

- **Knowledge Graphs** - Organize ideas as "neurons" connected by "synapses"
- **Architecture Management** - Document and manage enterprise architecture
- **Portfolio Management** - Track products, projects, and digital assets
- **AI-Powered Search** - Find anything across your knowledge base
- **Collaboration** - Team workspaces with role-based access
- **Microsoft 365 Integration** - Works with your existing tools

---

## Links

- **Platform**: https://app.aiqbee.com
- **Documentation**: https://app.aiqbee.com/help
- **Privacy & Trust**: https://app.aiqbee.com/trust
- **Support**: https://app.aiqbee.com/help
- **MCP Server**: https://mcp.aiqbee.com/mcp

---

## License

MIT License - see [LICENSE](LICENSE) for details.
