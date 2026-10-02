import { cp, mkdtemp, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const action = process.argv[2];
if (!["dev", "deploy"].includes(action)) throw new Error("Expected dev or deploy");
// Wrangler Pages discovers configuration from its working directory. Run outside
// this repository so Vinext's generated Worker config cannot affect Pages.
const cwd = await mkdtemp(join(tmpdir(), "openhw-pages-"));
try {
  await cp(join(root, "out"), join(cwd, "public"), { recursive: true });
  if (action === "dev") {
    // Wrangler's built-in no-op shim lives under this repository's node_modules
    // and can discover the unrelated Worker config. A temporary equivalent keeps
    // local asset routing in this isolated directory. It is never deployed.
    await writeFile(
      join(cwd, "public/_worker.js"),
      "export default { fetch(request, env) { return env.ASSETS.fetch(request); } };\n",
    );
  }
  await writeFile(
    join(cwd, "wrangler.jsonc"),
    JSON.stringify({
      name: "openhw-explorer-test",
      pages_build_output_dir: "./public",
      compatibility_date: "2026-10-02",
    }),
  );
  const args =
    action === "dev"
      ? ["pages", "dev", "public", "--port", "3103"]
      : [
          "pages",
          "deploy",
          "public",
          "--project-name",
          "openhw-explorer-test",
          "--branch",
          "pages-preview",
          "--force",
        ];
  // --force selects actual Pages hosting instead of Wrangler's new-project
  // delegation to Workers. This deployment specifically tests pages.dev access.
  const result = spawnSync(
    process.execPath,
    [join(root, "node_modules/wrangler/bin/wrangler.js"), ...args],
    {
      cwd,
      stdio: "inherit",
      env: process.env,
    },
  );
  process.exitCode = result.status ?? 1;
} finally {
  await rm(cwd, { recursive: true, force: true });
}
