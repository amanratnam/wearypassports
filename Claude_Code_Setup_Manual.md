# Claude Code — Setup Manual

---

## Prerequisites

Before installing, make sure you have:

- **Node.js v18 or higher** — check with `node --version`
  - If not installed, download the LTS version from [nodejs.org](https://nodejs.org)
  - After installing, close and reopen your terminal
- **A Claude account** — Claude Max subscription ($100/month) or Anthropic Console with API credits
- **Git** — required for Windows native installs (not needed for WSL)

---

## Step 1 — Install Claude Code

### macOS (Recommended: Native Installer)
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### macOS (Homebrew — Stable)
```bash
brew install claude-code
# To update later:
brew upgrade claude-code
```

### macOS / Linux (npm)
```bash
npm install -g @anthropic-ai/claude-code
# If "command not found" error, fix PATH:
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Windows (PowerShell — Native Installer)
```powershell
irm https://claude.ai/install.ps1 | iex
```

### Windows (WSL — Recommended for Windows users)
```bash
# First enable WSL (PowerShell as Admin):
wsl --install -d Ubuntu
# Then inside Ubuntu terminal:
curl -fsSL https://claude.ai/install.sh | bash
```

### Verify Installation
```bash
claude --version
```

---

## Step 2 — Login & Authentication

```bash
claude
# On first launch, you'll be prompted to log in
# Or explicitly:
/login
```

You'll be redirected to authenticate via:
- **Claude Max subscription** (recommended — best value)
- **Anthropic Console** (API key / pre-paid credits)
- **Enterprise providers** — Amazon Bedrock, Google Vertex AI, Microsoft Foundry

Your credentials are stored locally. You won't need to log in again.

---

## Step 3 — Start Your First Session

Navigate to your project folder and launch Claude Code:

```bash
cd /path/to/your/project
claude
```

### Useful First Commands
| Command | What it does |
|---|---|
| `claude` | Start an interactive session |
| `/help` | Show all available commands |
| `/clear` | Clear context, start fresh |
| `/compact` | Compress context window manually |
| `/login` | Re-authenticate |
| `claude init` | Scan repo and auto-generate CLAUDE.md |

---

## Step 4 — Project Configuration

Claude Code uses a folder called `.claude/` at your project root for all config.

```
your-project/
├── CLAUDE.md              ← Main instructions file (committed to git)
├── .claude/
│   ├── settings.json      ← Tool permissions, model preferences
│   └── commands/          ← Custom slash commands (e.g. /run-tests)
```

### settings.json — Example
```json
{
  "model": "sonnet",
  "allowedTools": ["Edit", "Bash(git commit:*)"],
  "mcpServers": {
    "puppeteer": {
      "url": "http://localhost:3000"
    }
  }
}
```

> **Tip:** Start with `Edit` and basic `Bash` tools. Add more only when you need them.

---

## Step 5 — Custom Slash Commands

Create reusable commands by adding `.md` files inside `.claude/commands/`:

```bash
mkdir -p .claude/commands
```

Example — `.claude/commands/review.md`:
```
Review the code in $ARGUMENTS. Focus only on bugs and security issues. Be concise.
```

Trigger it in session:
```
/review src/components/Header.jsx
```

---

## Step 6 — MCP Servers (Optional, Advanced)

MCP (Model Context Protocol) servers let Claude connect to external tools — browsers, databases, APIs, etc.

Add them to `.claude/settings.json`:
```json
{
  "mcpServers": {
    "puppeteer": { "url": "http://localhost:3000" },
    "sentry": { "url": "http://localhost:3001" }
  }
}
```

> **Recommendation:** Skip MCP on your first project. Set it up once you're comfortable with the core workflow.

---

## Context Window Tips

Claude Code has a **~200,000 token context window**. It fills faster than you'd expect.

- Use `/compact` proactively — don't wait for auto-compaction
- Guide compaction: `/compact remember all decisions about the routing logic`
- Start fresh sessions for unrelated tasks — use `/clear`
- For long projects, have Claude write a `progress.md` mid-session, then load it in a new session

---

## Updating Claude Code

| Method | Update Command |
|---|---|
| Native Installer | Auto-updates in background |
| Homebrew | `brew upgrade claude-code` |
| npm | `npm update -g @anthropic-ai/claude-code` |
| WinGet | `winget upgrade Anthropic.ClaudeCode` |

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `command not found` after install | Fix PATH (see npm install section above) |
| PowerShell error about `&&` | Use CMD instead of PowerShell |
| `irm` not recognized | You're in CMD — switch to PowerShell |
| Node version too low | Install Node 18+ from nodejs.org |
| Permissions error on npm install | Set up user-level npm directory (Linux) |

**Full reset if something is broken:**
```bash
npm uninstall -g @anthropic-ai/claude-code
rm -rf ~/.claude ~/.npm/_cacache
npm cache clean --force
npm install -g @anthropic-ai/claude-code
```

---

## Official Resources

- Docs: [docs.claude.com](https://docs.claude.com)
- Quickstart: [code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)
- Console (API credits): [console.anthropic.com](https://console.anthropic.com)
