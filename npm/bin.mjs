#!/usr/bin/env node
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Resolve mcp-remote wherever npm installed it (npx hoists dependencies).
const require = createRequire(import.meta.url);
const pkgPath = require.resolve("mcp-remote/package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
const binRel = typeof pkg.bin === "string" ? pkg.bin : pkg.bin["mcp-remote"];
const mcpRemote = join(dirname(pkgPath), binRel);

const child = spawn(process.execPath, [mcpRemote, "https://mcp.aiqbee.com/mcp", ...process.argv.slice(2)], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
