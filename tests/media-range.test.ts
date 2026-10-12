import { describe, expect, it } from "vitest";
import { applyMediaRange } from "../src/lib/media-range";

const asset = () =>
  new Response("0123456789", {
    headers: { "content-length": "10", "content-type": "audio/mpeg", etag: '"clip-v1"' },
  });
const request = (range: string, extra: Record<string, string> = {}) =>
  new Request("https://example.com/clip.mp3", { headers: { range, ...extra } });

describe("course audio range fallback", () => {
  it.each([
    ["bytes=0-3", "0123", "bytes 0-3/10"],
    ["bytes=7-", "789", "bytes 7-9/10"],
    ["bytes=-2", "89", "bytes 8-9/10"],
    ["bytes=8-50", "89", "bytes 8-9/10"],
  ])("supports seeking with %s", async (range, body, contentRange) => {
    const response = await applyMediaRange(request(range), asset());
    expect(response.status).toBe(206);
    expect(response.headers.get("content-range")).toBe(contentRange);
    expect(await response.text()).toBe(body);
  });
  it("returns 416 for an unsatisfiable range", async () => {
    const response = await applyMediaRange(request("bytes=10-"), asset());
    expect(response.status).toBe(416);
    expect(response.headers.get("content-range")).toBe("bytes */10");
  });
  it("returns the whole updated clip when If-Range no longer matches", async () => {
    const response = await applyMediaRange(request("bytes=0-3", { "if-range": '"old"' }), asset());
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("0123456789");
  });
  it("does not buffer an asset without a known length", async () => {
    const response = new Response("stream");
    expect(await applyMediaRange(request("bytes=0-3"), response)).toBe(response);
    expect(response.bodyUsed).toBe(false);
  });
  it("uses the build manifest when the asset binding omits Content-Length", async () => {
    const response = await applyMediaRange(request("bytes=1-3"), new Response("0123456789"), 10);
    expect(response.status).toBe(206);
    expect(await response.text()).toBe("123");
  });
});
