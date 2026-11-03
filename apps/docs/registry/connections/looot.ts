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
    "looot: search, price and run pay-per-call data endpoints (email find and verify, company enrichment, SEO and SERP, social profiles, web scraping) through one MCP server and one prepaid balance.",
  headers: () => ({
    Authorization: `Bearer ${process.env.LOOOT_TOKEN!}`,
  }),
  approval: ({ toolName }) =>
    READ_ONLY_TOOLS.has(toolName.split("__").pop() ?? toolName)
      ? "not-applicable"
      : "user-approval",
});
