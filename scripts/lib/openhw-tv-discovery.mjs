import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const OPENHW_TV_CHANNEL = "UCquHKALPMdykrseUb6gtx4g";
const execute = promisify(execFile);

async function runListing(url) {
  return execute("yt-dlp", [
    "--ignore-config", "--no-update", "--flat-playlist", "--playlist-end", "20",
    "--socket-timeout", "15", "--retries", "1", "-J", url,
  ], { timeout: 60000, maxBuffer: 4 * 1024 * 1024 });
}

export async function inspectOpenhwTvTab(tab, archivedUrls = new Set(), run = runListing) {
  if (!["videos", "streams"].includes(tab)) throw new Error("Unsupported OpenHW TV tab");
  const url = `https://www.youtube.com/channel/${OPENHW_TV_CHANNEL}/${tab}`;
  try {
    const { stdout } = await run(url);
    const data = JSON.parse(stdout);
    if (!data || (data.channel_id || data.id) !== OPENHW_TV_CHANNEL || !Array.isArray(data.entries)) {
      throw new Error("Channel listing is malformed or belongs to another channel");
    }
    const entries = data.entries.slice(0, 20);
    if (tab === "videos" && !entries.length) throw new Error("Unexpected empty videos listing; manual confirmation required");
    if (entries.some((item) => !item || !/^[\w-]{11}$/.test(item.id) || typeof item.title !== "string" || !item.title.trim())) {
      throw new Error("Channel entries are incomplete; do not treat this as no new videos");
    }
    const items = [...new Map(entries.map((item) => [item.id, {
      id: item.id, title: item.title.trim(), url: `https://www.youtube.com/watch?v=${item.id}`,
      // Flat playlists do not establish original publication dates or technical claims.
      publishedAt: null, needsSourceReview: true,
      archived: archivedUrls.has(`https://www.youtube.com/watch?v=${item.id}`),
    }])).values()];
    return { tab, url, status: "ok", items };
  } catch (error) {
    const message = String(error.stderr || error.message || error).slice(0, 1500);
    if (tab === "streams" && /This channel does not have a streams tab/.test(message)) {
      return { tab, url, status: "absent", items: [], note: "YouTube reports that this channel has no streams tab." };
    }
    return { tab, url, status: "failed", items: [], error: message };
  }
}

export async function inspectOpenhwTv(archivedUrls = new Set(), run = runListing) {
  const tabs = [];
  for (const tab of ["videos", "streams"]) tabs.push(await inspectOpenhwTvTab(tab, archivedUrls, run));
  const successful = tabs.some((tab) => tab.status === "ok");
  const failed = tabs.some((tab) => tab.status === "failed");
  return {
    checkedAt: new Date().toISOString(), channelId: OPENHW_TV_CHANNEL,
    status: !successful ? "failed" : failed ? "partial" : "ok",
    coverage: "At most 20 public entries per videos/streams tab; not a complete channel archive or a content review.",
    tabs,
  };
}
