import { describe, expect, it, vi } from "vitest";
import { handleRequest } from "../workers/learning-feedback/index.ts";

const url = "https://openhwexplorer.com/api/learning-feedback";
const payload = {
  locale: "zh",
  format: "deep-dive",
  topics: ["processor", "verification"],
  problem: "Pipeline <script>example</script>",
  email: "reader@example.com",
  website: "",
};
function request(data = payload, headers = {}) {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://openhwexplorer.com",
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    body: JSON.stringify(data),
  });
}
function env() {
  return {
    FEEDBACK_TO: "owner@example.com",
    MAIL: { send: vi.fn().mockResolvedValue({ messageId: "test" }) },
    CLIENT_LIMIT: { limit: vi.fn().mockResolvedValue({ success: true }) },
    SITE_LIMIT: { limit: vi.fn().mockResolvedValue({ success: true }) },
  };
}
describe("Private course suggestion delivery", () => {
  it("sends to the configured owner only, escapes HTML and returns no private content", async () => {
    const e = env();
    const response = await handleRequest(request({ ...payload, to: "attacker@example.com" }), e);
    expect(response.status).toBe(200);
    expect(e.MAIL.send.mock.calls[0][0]).toMatchObject({
      to: "owner@example.com",
      replyTo: "reader@example.com",
    });
    expect(e.MAIL.send.mock.calls[0][0].html).toContain("&lt;script&gt;");
    expect(await response.text()).not.toMatch(/reader@|Pipeline|owner@/);
  });
  it("does not acknowledge delivery when the mail service fails", async () => {
    const e = env();
    e.MAIL.send.mockRejectedValue(new Error("unavailable"));
    const response = await handleRequest(request(), e);
    expect(response.status).toBe(503);
    expect((await response.json()).ok).toBe(false);
  });
  it.each([
    { ...payload, format: "__proto__" },
    { ...payload, topics: [] },
    { ...payload, topics: ["processor", "processor"] },
    { ...payload, topics: ["unknown"] },
    { ...payload, email: "reader@example.com\r\nBcc: attacker@example.com" },
    { ...payload, problem: "x".repeat(1001) },
    { ...payload, website: "spam" },
    { ...payload, locale: "xx" },
    { ...payload, email: null },
  ])("rejects invalid input before email sending", async (invalid) => {
    const e = env();
    expect((await handleRequest(request(invalid), e)).status).toBe(400);
    expect(e.MAIL.send).not.toHaveBeenCalled();
  });
  it("accepts an anonymous suggestion without creating a reply address", async () => {
    const e = env();
    expect((await handleRequest(request({ ...payload, email: "" }), e)).status).toBe(200);
    expect(e.MAIL.send.mock.calls[0][0]).not.toHaveProperty("replyTo");
  });
  it("blocks untrusted or missing Origins, non-JSON submissions and arbitrary paths", async () => {
    const e = env();
    expect(
      (await handleRequest(request(payload, { Origin: "https://evil.example" }), e)).status,
    ).toBe(403);
    expect((await handleRequest(request(payload, { Origin: "" }), e)).status).toBe(403);
    expect(
      (await handleRequest(request(payload, { "Content-Type": "text/plain" }), e)).status,
    ).toBe(415);
    expect((await handleRequest(new Request(url + "/list"), e)).status).toBe(404);
    expect(e.MAIL.send).not.toHaveBeenCalled();
  });
  it("bounds streamed bodies even when Content-Length is absent", async () => {
    const e = env();
    const response = await handleRequest(request({ ...payload, problem: "x".repeat(9000) }), e);
    expect(response.status).toBe(413);
    expect(e.MAIL.send).not.toHaveBeenCalled();
  });
  it("rate limits before sending and gives a retry interval", async () => {
    const e = env();
    e.CLIENT_LIMIT.limit.mockResolvedValue({ success: false });
    const response = await handleRequest(request(), e);
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(e.MAIL.send).not.toHaveBeenCalled();
  });
  it("permits only the known mirror Origin on preflight", async () => {
    const response = await handleRequest(
      new Request(url, {
        method: "OPTIONS",
        headers: { Origin: "https://openhw-explorer.vercel.app" },
      }),
      env(),
    );
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "https://openhw-explorer.vercel.app",
    );
    expect(response.headers.get("Access-Control-Allow-Credentials")).toBeNull();
  });
});
