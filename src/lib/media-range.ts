/** Preserve seeking when the asset service returns a whole clip for a Range request. */
export async function applyMediaRange(
  request: Request,
  response: Response,
  knownSize?: number,
): Promise<Response> {
  const range = request.headers.get("range");
  const size = knownSize ?? Number(response.headers.get("content-length"));
  // Course clips are below 1 MiB. Never buffer an unknown or large asset.
  if (
    request.method !== "GET" ||
    response.status !== 200 ||
    !range ||
    !Number.isSafeInteger(size) ||
    size <= 0 ||
    size > 2 * 1024 * 1024 ||
    response.headers.has("content-encoding")
  )
    return response;
  const ifRange = request.headers.get("if-range");
  if (
    ifRange &&
    (ifRange.startsWith("W/") ||
      (ifRange !== response.headers.get("etag") &&
        ifRange !== response.headers.get("last-modified")))
  )
    return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  // HTTP permits ignoring malformed or multipart ranges.
  if (!match || (!match[1] && !match[2])) return response;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  const headers = new Headers(response.headers);
  headers.set("accept-ranges", "bytes");
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= size) {
    await response.body?.cancel();
    headers.delete("content-length");
    headers.set("content-range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }
  const bytes = await response.arrayBuffer();
  headers.set("content-range", `bytes ${start}-${end}/${size}`);
  headers.set("content-length", String(end - start + 1));
  return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}
