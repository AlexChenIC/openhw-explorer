/// <reference path="./worker-configuration.d.ts" />

const origins = new Set([
  "https://openhwexplorer.com",
  "https://www.openhwexplorer.com",
  "https://openhw-explorer.vercel.app",
  "https://openhw-explorer-test.pages.dev",
]);
const formats: Record<string, string> = {
  foundations: "Foundations / 基础入门",
  "repo-overview": "Repository & core overview / 仓库与内核概览",
  "deep-dive": "Technical deep dive / 技术专题深入",
  "hands-on": "Hands-on practice / 动手实践",
};
const topics: Record<string, string> = {
  processor: "Processor cores & architecture / 处理器核与架构",
  verification: "Verification methods & UVM / 验证方法与 UVM",
  "soc-fpga": "SoCs & FPGAs / SoC 与 FPGA",
  other: "Other directions / 其他方向",
};
const maxBody = 8192;

function reply(status: number, code: string, origin: string | null, id?: string) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    Vary: "Origin",
  });
  if (origin && origins.has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
  }
  if (status === 429) headers.set("Retry-After", "60");
  return Response.json({ ok: status === 200, code, ...(id ? { id } : {}) }, { status, headers });
}

async function boundedJson(request: Request): Promise<unknown> {
  if (Number(request.headers.get("Content-Length")) > maxBody) throw new Error("oversized");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBody) {
        await reader.cancel();
        throw new Error("oversized");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }).decode(bytes));
}

export async function handleRequest(request: Request, env: FeedbackEnv): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (new URL(request.url).pathname !== "/api/learning-feedback")
    return reply(404, "not_found", origin);
  // Health check discloses no feedback, recipient, or service credentials.
  if (request.method === "GET") return reply(env.FEEDBACK_TO ? 200 : 503, "health", origin);
  if (!origin || !origins.has(origin)) return reply(403, "origin", null);
  if (request.method === "OPTIONS") return reply(200, "preflight", origin);
  if (request.method !== "POST") return reply(405, "method", origin);
  if (request.headers.get("Content-Type")?.split(";")[0].trim() !== "application/json")
    return reply(415, "content_type", origin);

  let data: unknown;
  try {
    data = await boundedJson(request);
  } catch (error) {
    return reply(
      error instanceof Error && error.message === "oversized" ? 413 : 400,
      "invalid",
      origin,
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return reply(400, "invalid", origin);
  const p = data as Record<string, unknown>;
  if (
    p.website !== "" ||
    typeof p.format !== "string" ||
    !Object.hasOwn(formats, p.format) ||
    !Array.isArray(p.topics) ||
    p.topics.length < 1 ||
    p.topics.length > 4 ||
    !p.topics.every((t) => typeof t === "string" && Object.hasOwn(topics, t)) ||
    new Set(p.topics).size !== p.topics.length ||
    typeof p.problem !== "string" ||
    p.problem.length > 1000 ||
    typeof p.email !== "string" ||
    p.email.length > 254 ||
    /[\r\n\0]/.test(p.email) ||
    (p.email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) ||
    (p.locale !== "en" && p.locale !== "zh")
  )
    return reply(400, "invalid", origin);

  try {
    if (!env.FEEDBACK_TO) return reply(503, "unavailable", origin);
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return reply(403, "client", origin);
    // Counters are local to an edge location. Allow some headroom for shared mobile networks.
    if (
      !(await env.CLIENT_LIMIT.limit({ key: ip })).success ||
      !(await env.SITE_LIMIT.limit({ key: "learning-feedback" })).success
    )
      return reply(429, "rate_limit", origin);
    const id = crypto.randomUUID();
    const text = [
      "New private OpenHW Explorer course suggestion",
      "",
      `Reference: ${id}`,
      `Received: ${new Date().toISOString()}`,
      `Language: ${p.locale}`,
      `Format: ${formats[p.format]}`,
      `Topics: ${p.topics.map((t) => topics[t as string]).join("; ")}`,
      `Problem: ${p.problem.trim() || "Not provided"}`,
      `Contact email: ${p.email || "Not provided"}`,
      "",
      "This feedback is private. No website listing or mailing-list subscription was created.",
    ].join("\n");
    const escape = (value: string) =>
      value.replace(
        /[&<>"']/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
      );
    await env.MAIL.send({
      from: { email: "hello@openhwexplorer.com", name: "OpenHW Explorer" },
      to: env.FEEDBACK_TO,
      subject: `[OpenHW Explorer] Course suggestion ${id.slice(0, 8)}`,
      text,
      html: `<pre>${escape(text)}</pre>`,
      ...(p.email ? { replyTo: p.email } : {}),
    });
    // Never log email addresses or free-text suggestions.
    console.log(JSON.stringify({ event: "feedback_accepted", id }));
    return reply(200, "accepted", origin, id);
  } catch {
    console.error(JSON.stringify({ event: "feedback_delivery_failed" }));
    return reply(503, "unavailable", origin);
  }
}

export default { fetch: handleRequest } satisfies ExportedHandler<FeedbackEnv>;
