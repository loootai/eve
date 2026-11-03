# eve + looot proof transcript

Recorded 2026-11-03 with eve v1.0.0-rc.1 built from loootai/eve@d415eaa, model gpt-6-luna. The registry item was served from the local `apps/docs/public` build output.

## Full session (final screen)

```text
looot-proof $ # eve + looot proof: install, free search, one approved paid run, balance
looot-proof $ # 1. Install connection/looot from the local registry build
looot-proof $ eve add http://127.0.0.1:8811/r/connection/looot.json --non-interactive
✔ Checking registry.
✔ Added the following variables to .env.local:
  + LOOOT_TOKEN
✔ Created 1 file:
  - agent/connections/looot.ts
{"version":1,"type":"completed","item":"http://127.0.0.1:8811/r/connection/looot.json","completedItems":["http://127.0.0.1:8811/r/connection/looot.json"]}
looot-proof $ cat agent/connections/looot.ts
import { defineMcpClientConnection } from "eve/connections";
const READ_ONLY_TOOLS = new Set([
  "balance",
  "catalog_overview",
  "discover",
  "inspect",
  "my_tools",
  "runs_evidence",
  "runs_get",
  "runs_list",
  "search",
  "search_catalog",
  "skills",
]);
export default defineMcpClientConnection({
  url: "https://api.looot.ai/mcp",
  description:
    "looot: search, price and run pay-per-call data endpoints (email find and verify, company enrichment, SEO and SERP, social profiles, web scraping) through
one MCP server and one prepaid balance.",
  headers: () => ({
    Authorization: `Bearer ${process.env.LOOOT_TOKEN!}`,
  }),
  approval: ({ toolName }) =>
    READ_ONLY_TOOLS.has(toolName.split("__").pop() ?? toolName)
      ? "not-applicable"
      : "user-approval",
});
looot-proof $ # 2. Set LOOOT_TOKEN (agent token, value never shown)
looot-proof $ set-token
LOOOT_TOKEN set (70 chars, value hidden)
looot-proof $ # 3. Start the agent and ask for a lookup
looot-proof $ eve dev --no-default-extensions --port 2612
☰eve v1.0.0-rc.1 · looot-proof · Run /help for commands
│ Use looot to find the endpoint that enriches a company from its domain, run it for vercel.com, and after the run tell me my looot balance.
  ▪ Searched tools for “looot__”, found 18
   → results=[18] remaining=0 searched=18
  ▪ Looot: Search
   → tool="search" data={…}
  ▪ Looot: Inspect
   → tool="inspect" data={…}
  ▪ Looot: Run
   → tool="run" data={…}
  ▪ Looot: Balance
   → tool="balance" data={…}
▲ Found and ran TheCompaniesAPI / Enrich a company from its domain for vercel.com. The run completed successfully and cost $0.0019.
  The result identifies Vercel, Inc. as a privately held software company, founded in 2015, with an estimated 200–500 employees. Its reported industry is
  software development.
  Your looot balance after the run is $90.93 available (with $0 reserved).
Done in 21s (↑ 69.4K ↓ 320)
❯
gpt-6-luna · ↯ · chatgpt-sub⌝
```

## Approval prompt (captured before pressing `y`)

```text
  ? Looot: Run
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  Approve Looot: Run?
     Yes
     No
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
  y yes · n no · Ctrl-C cancel
```

## Balance check outside the agent

- Before the recorded run: $90.935361
- After the recorded run: $90.933461 (difference $0.0019, the cost the agent reported)
