import { mkdirSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function atomicJson(path, value) {
  if (path instanceof URL) path = fileURLToPath(path);
  mkdirSync(dirname(path), { recursive: true });
  const temporary = `${path}.${process.pid}.tmp`;
  try {
    writeFileSync(temporary, JSON.stringify(value, null, 2) + "\n");
    renameSync(temporary, path);
  } finally {
    try { unlinkSync(temporary); } catch (error) { if (error.code !== "ENOENT") throw error; }
  }
}

export function collectionDecision(sources, candidateCount) {
  const successful = sources.filter((source) => source.status === "ok").length;
  const failed = sources.length - successful;
  return {
    successful, failed,
    status: !successful ? "failed" : failed ? "degraded" : "ok",
    publishCandidates: successful > 0 && !(failed > 0 && candidateCount === 0),
  };
}
