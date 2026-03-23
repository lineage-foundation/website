# Cursor Configuration

## GitHub MCP (Pull Request Creation)

The GitHub MCP is configured **globally** at `~/.cursor/mcp.json`. Ensure:

1. **Docker** is installed and running.
2. `GITHUB_PERSONAL_ACCESS_TOKEN` is set in your environment (PAT with `repo` scope).
3. Cursor is restarted after config changes.

The agent will use `create_pull_request` when creating PRs after pushing a branch.
