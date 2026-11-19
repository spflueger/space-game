import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  // Support general LLM_PROXY_* variables, falling back to LITELLM_* for backwards compatibility
  const baseUrl = process.env.LLM_PROXY_BASE_URL;

  const apiKey = process.env.LLM_PROXY_API_KEY ?? "proxy-no-key-required";

  // If neither LLM_PROXY_BASE_URL nor LITELLM_BASE_URL nor explicit proxy API key is provided, don't register
  if (!baseUrl && !process.env.LLM_PROXY_API_KEY) {
    return;
  }

  const effectiveBaseUrl = baseUrl ?? "http://localhost:4000/v1";
  const apiType = (process.env.LLM_PROXY_API_TYPE as any) ?? "anthropic-messages";
  const providerName = process.env.LLM_PROXY_NAME ?? "LLM Proxy";

  // Parse comma-separated custom models if specified, otherwise use default catalog
  const customModelsEnv = process.env.LLM_PROXY_MODELS;
  const defaultModelIds = [
    { id: "eu/claude-sonnet-5.5", name: "Claude Sonnet 5.5 (Proxy)" },
    { id: "eu/gemini-3.8-flash", name: "Gemini 3.8 Flash (Proxy)" },
  ];

  const modelEntries = customModelsEnv
    ? customModelsEnv.split(",").map((m) => {
        const trimmed = m.trim();
        return { id: trimmed, name: `${trimmed} (Proxy)` };
      })
    : defaultModelIds;

  const models = modelEntries.map((m) => ({
    id: m.id,
    name: m.name,
    reasoning: true,
    input: ["text", "image"] as ("text" | "image")[],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 1000000,
    maxTokens: 32000,
  }));

  const providerConfig = {
    name: providerName,
    baseUrl: effectiveBaseUrl,
    apiKey,
    api: apiType,
    models,
  };

  // Register as generic "llmproxy" provider
  pi.registerProvider("llmproxy", providerConfig);

}
