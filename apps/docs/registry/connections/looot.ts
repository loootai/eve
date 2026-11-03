import { defineMcpClientConnection } from "eve/connections";

const APPROVAL_REQUIRED = new Set(["run", "discover_smart", "media_link"]);

export default defineMcpClientConnection({
  url: "https://api.looot.ai/mcp",
  description:
    "looot: search, price and run pay-per-call data endpoints (email find and verify, company enrichment, SEO and SERP, social profiles, web scraping) through one MCP server and one prepaid balance.",
  headers: () => ({
    Authorization: `Bearer ${process.env.LOOOT_TOKEN!}`,
  }),
  approval: ({ toolName }) =>
    APPROVAL_REQUIRED.has(toolName.split("__").pop() ?? toolName)
      ? "user-approval"
      : "not-applicable",
});
