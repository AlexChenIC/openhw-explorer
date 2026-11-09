import { describe, expect, it } from "vitest";
import { inspectOpenhwTv, inspectOpenhwTvTab, OPENHW_TV_CHANNEL } from "../scripts/lib/openhw-tv-discovery.mjs";

const entry = { id: "844k7CObghY", title: "RISC-V System-on-Chip Design", timestamp: 9999999999 };
const result = (entries = [entry], channel = OPENHW_TV_CHANNEL) => ({ stdout: JSON.stringify({ id: channel, entries }) });

describe("repeatable OpenHW TV discovery independent of RSS", () => {
  it("uses exact official channel tabs, canonical links and no invented publication dates", async () => {
    const urls = [];
    const run = async (url) => { urls.push(url); return result(); };
    const report = await inspectOpenhwTv(new Set(["https://www.youtube.com/watch?v=844k7CObghY"]), run);
    expect(report.status).toBe("ok");
    expect(urls).toEqual(["videos", "streams"].map((tab) => `https://www.youtube.com/channel/${OPENHW_TV_CHANNEL}/${tab}`));
    expect(report.tabs[0].items[0]).toMatchObject({ publishedAt: null, needsSourceReview: true, archived: true });
  });
  it("recognizes an explicitly absent streams tab, not arbitrary network failures", async () => {
    const absent = async () => { throw { stderr: "ERROR: This channel does not have a streams tab" }; };
    expect((await inspectOpenhwTvTab("streams", new Set(), absent)).status).toBe("absent");
    expect((await inspectOpenhwTvTab("videos", new Set(), absent)).status).toBe("failed");
    const unavailable = async () => { throw new Error("network timed out"); };
    expect((await inspectOpenhwTvTab("streams", new Set(), unavailable)).status).toBe("failed");
  });
  it.each(["null", "{}", "invalid", JSON.stringify({ id: "other", entries: [entry] }),
    JSON.stringify({ id: OPENHW_TV_CHANNEL, entries: [] }),
    JSON.stringify({ id: OPENHW_TV_CHANNEL, entries: [{ id: "bad", title: "test" }] }),
  ])("fails visibly on invalid or empty output: %s", async (stdout) => {
    expect((await inspectOpenhwTvTab("videos", new Set(), async () => ({ stdout }))).status).toBe("failed");
  });
  it("flags a partial check when streams fail", async () => {
    const report = await inspectOpenhwTv(new Set(), async (url) => {
      if (url.endsWith("streams")) throw new Error("failed");
      return result();
    });
    expect(report.status).toBe("partial");
    expect(report.tabs[0].items).toHaveLength(1);
  });
  it("fails visibly when the local tool is missing", async () => {
    const report = await inspectOpenhwTv(new Set(), async () => { throw new Error("spawn yt-dlp ENOENT"); });
    expect(report.status).toBe("failed");
    expect(report.tabs.every((tab) => tab.status === "failed")).toBe(true);
  });
  it("deduplicates IDs without labelling unarchived content as new", async () => {
    const tab = await inspectOpenhwTvTab("videos", new Set(), async () => result(Array(30).fill(entry)));
    expect(tab.items).toHaveLength(1);
    expect(tab.items[0].archived).toBe(false);
    expect(tab.items[0].publishedAt).toBeNull();
  });
});
